"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthModal() {
  const {
    authModalOpen,
    closeAuth,
    authModalTab,
    openSignIn,
    openSignUp,
    signIn,
    signUp,
    startOAuth,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setPending(true);
    try {
      if (authModalTab === "signin") {
        await signIn(email, password);
      } else {
        const r = await signUp(email, password, fullName || undefined);
        if (r === "confirm_email") {
          setInfo(
            "Check your email for a confirmation link before signing in."
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  };

  const oauth = async (provider: "google" | "linkedin_oidc") => {
    setError(null);
    setPending(true);
    try {
      await startOAuth(provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth failed");
      setPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !pending && closeAuth()}
        aria-hidden
      />
      <div
        className="relative w-full max-w-md rounded-xl bg-dark border border-white/10 shadow-2xl p-6 md:p-8"
        role="dialog"
        aria-modal
        aria-labelledby="auth-title"
      >
        <button
          type="button"
          onClick={() => closeAuth()}
          className="absolute top-4 right-4 text-text-light/70 hover:text-white p-1"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2
          id="auth-title"
          className="text-xl font-bold text-white mb-1 pr-8"
        >
          {authModalTab === "signin" ? "Sign in" : "Create account"}
        </h2>
        <p className="text-sm text-text-light/60 mb-6">
          {authModalTab === "signin"
            ? "Welcome back — access your training and profile."
            : "Join DG-online for dangerous goods training and support."}
        </p>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={openSignIn}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
              authModalTab === "signin"
                ? "bg-brand text-white"
                : "bg-white/5 text-text-light/80 hover:bg-white/10"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={openSignUp}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
              authModalTab === "signup"
                ? "bg-brand text-white"
                : "bg-white/5 text-text-light/80 hover:bg-white/10"
            }`}
          >
            Sign up
          </button>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <button
            type="button"
            disabled={pending}
            onClick={() => oauth("google")}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white text-text-dark text-sm font-bold hover:bg-white/90 disabled:opacity-50"
          >
            Continue with Google
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => oauth("linkedin_oidc")}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#0a66c2] text-white text-sm font-bold hover:bg-[#095195] disabled:opacity-50"
          >
            Continue with LinkedIn
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wide">
            <span className="bg-dark px-2 text-text-light/50">or email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalTab === "signup" && (
            <div>
              <label className="block text-xs font-bold text-text-light/70 mb-1">
                Full name
              </label>
              <input
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-text-light/40 focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Jane Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-text-light/70 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-text-light/40 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-light/70 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete={
                authModalTab === "signin" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-text-light/40 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-green-300 bg-green-950/40 border border-green-900/50 rounded-lg px-3 py-2">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            {pending
              ? "Please wait…"
              : authModalTab === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
