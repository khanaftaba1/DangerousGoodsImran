"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { NAV_LINKS, NAV_LINKS_LOGGED_IN } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/contexts/AuthContext";

function BrandLogoMark() {
  return (
    <Link href="/" className="flex items-center gap-1.5 flex-shrink-0 group">
      <span
        className="inline-flex items-center justify-center size-10 rounded-lg bg-brand text-white text-sm font-bold tracking-tight shadow-sm"
        aria-hidden
      >
        DG
      </span>
      <span className="text-white text-lg font-bold tracking-tight group-hover:text-text-light/95 transition-colors">
        -online
      </span>
    </Link>
  );
}

function MeMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[15px] font-bold text-white hover:text-text-light/90 transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Me
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div
          className="absolute right-0 top-full mt-2 min-w-[220px] rounded-lg border border-white/15 bg-dark-bg py-1.5 shadow-xl z-50"
          role="menu"
        >
          <Link
            href="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm font-bold text-text-light hover:bg-white/10 transition-colors"
          >
            Account
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, openSignIn, openSignUp, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black shadow-[0_0_15px_0_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {user ? (
            <BrandLogoMark />
          ) : (
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="DG-online logo"
                width={150}
                height={62}
                className="h-10 w-auto"
                priority
              />
            </Link>
          )}

          <div className="hidden md:flex flex-1 items-center justify-end gap-6">
            {loading ? (
              <span className="text-xs text-text-light/50">…</span>
            ) : user ? (
              <>
                {NAV_LINKS_LOGGED_IN.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-text-light/90 text-[15px] font-bold transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
                <MeMenu />
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="shrink-0 px-5 py-2 text-sm font-bold text-white border border-white rounded-md bg-transparent hover:bg-white/10 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <nav className="flex items-center gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-text-light/90 hover:text-white text-[15px] font-bold transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => openSignIn()}
                    className="px-5 py-2 text-sm font-bold text-text-light border border-brand rounded-md hover:bg-brand/10 transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => openSignUp()}
                    className="px-5 py-2 text-sm font-bold text-white bg-brand rounded-md hover:bg-brand-dark transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-text-light p-2 shrink-0"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSignIn={() => openSignIn()}
        onSignUp={() => openSignUp()}
        onSignOut={() => void signOut()}
      />
    </header>
  );
}
