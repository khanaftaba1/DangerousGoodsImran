"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { useAuth } from "@/contexts/AuthContext";
import { getApiBase } from "@/lib/auth-api";
import { setSessionTokens } from "@/lib/auth-storage";

/** After server callback, Supabase session is in cookies; sync to Express API. */
export default function AuthCompletePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    async function run() {
      try {
        const supabase = createSupabaseBrowser();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/?error=auth");
          return;
        }

        const api = getApiBase();
        const sync = await fetch(`${api}/auth/sync`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          }),
        });

        const json = (await sync.json()) as {
          success?: boolean;
          data?: { session?: { access_token: string; refresh_token: string } };
        };

        if (!json.success) {
          await supabase.auth.signOut();
          router.replace("/?error=auth");
          return;
        }

        if (json.data?.session) {
          setSessionTokens(
            json.data.session.access_token,
            json.data.session.refresh_token
          );
        } else {
          setSessionTokens(session.access_token, session.refresh_token);
        }

        await refreshUser();

        await supabase.auth.signOut();
        router.replace("/");
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error("[auth/complete]", e);
        }
        router.replace("/?error=auth");
      }
    }

    void run();
  }, [router, refreshUser]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center px-4">
      <p className="text-text-muted">Finishing sign-in…</p>
    </div>
  );
}
