"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Profile } from "@/lib/types";
import { getApiBase } from "@/lib/auth-api";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import {
  clearSessionTokens,
  getAuthFetchInit,
  getRefreshToken,
  setSessionTokens,
} from "@/lib/auth-storage";

type User = { id: string; email: string | null };

type SessionPayload = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type SignUpResult = "ok" | "confirm_email";

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  closeAuth: () => void;
  authModalOpen: boolean;
  authModalTab: "signin" | "signup";
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  startOAuth: (provider: "google" | "linkedin_oidc") => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">(
    "signin"
  );

  const api = getApiBase();

  const tryRefreshSession = useCallback(async (): Promise<boolean> => {
    const refresh = getRefreshToken();
    if (!refresh) return false;
    const res = await fetch(`${api}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    const json = (await res.json()) as {
      success?: boolean;
      data?: { session?: SessionPayload };
    };
    if (!json.success || !json.data?.session) {
      clearSessionTokens();
      return false;
    }
    setSessionTokens(
      json.data.session.access_token,
      json.data.session.refresh_token
    );
    return true;
  }, [api]);

  const refreshUser = useCallback(async () => {
    try {
      let res = await fetch(`${api}/auth/me`, getAuthFetchInit());
      let json = (await res.json()) as {
        success?: boolean;
        data?: { user: User | null; profile: Profile | null };
      };

      if (json.success && json.data?.user) {
        setUser(json.data.user);
        setProfile(json.data.profile ?? null);
        return;
      }

      if (await tryRefreshSession()) {
        res = await fetch(`${api}/auth/me`, getAuthFetchInit());
        json = (await res.json()) as typeof json;
        if (json.success && json.data?.user) {
          setUser(json.data.user);
          setProfile(json.data.profile ?? null);
          return;
        }
      }

      setUser(null);
      setProfile(null);
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [api, tryRefreshSession]);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const signIn = async (email: string, password: string) => {
    const res = await fetch(`${api}/auth/signin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let json: {
      success?: boolean;
      error?: string;
      data?: { user: User; session?: SessionPayload };
    } = {};
    try {
      json = (await res.json()) as typeof json;
    } catch {
      throw new Error(`Sign in failed (HTTP ${res.status})`);
    }
    if (!res.ok || !json.success || !json.data?.user) {
      throw new Error(json.error || `Sign in failed (${res.status})`);
    }
    if (json.data.session) {
      setSessionTokens(
        json.data.session.access_token,
        json.data.session.refresh_token
      );
    }
    setUser(json.data.user);
    await refreshUser();
    setAuthModalOpen(false);
  };

  const signUp = async (
    email: string,
    password: string,
    fullName?: string
  ): Promise<SignUpResult> => {
    const res = await fetch(`${api}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });
    const json = (await res.json()) as {
      success?: boolean;
      error?: string;
      data?: {
        user: User | null;
        needsEmailConfirmation?: boolean;
        session?: SessionPayload;
      };
    };
    if (!json.success) {
      throw new Error(json.error || "Sign up failed");
    }
    if (json.data?.needsEmailConfirmation) {
      return "confirm_email";
    }
    if (json.data?.user) {
      if (json.data.session) {
        setSessionTokens(
          json.data.session.access_token,
          json.data.session.refresh_token
        );
      }
      setUser(json.data.user);
      await refreshUser();
    }
    setAuthModalOpen(false);
    return "ok";
  };

  const signOut = async () => {
    clearSessionTokens();
    await fetch(`${api}/auth/signout`, getAuthFetchInit({ method: "POST" }));
    setUser(null);
    setProfile(null);
  };

  /**
   * Must use the browser Supabase client (not the Express OAuth URL) so PKCE
   * `code_verifier` lives in this tab — otherwise `/auth/callback` fails with
   * `exchangeCodeForSession`.
   */
  const startOAuth = async (provider: "google" | "linkedin_oidc") => {
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      throw new Error(error.message);
    }
  };

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    openSignIn: () => {
      setAuthModalTab("signin");
      setAuthModalOpen(true);
    },
    openSignUp: () => {
      setAuthModalTab("signup");
      setAuthModalOpen(true);
    },
    closeAuth: () => setAuthModalOpen(false),
    authModalOpen,
    authModalTab,
    signIn,
    signUp,
    signOut,
    refreshUser,
    startOAuth,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
