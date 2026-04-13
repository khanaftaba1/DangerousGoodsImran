"use client";

import Link from "next/link";
import { X, User } from "lucide-react";
import { NAV_LINKS, NAV_LINKS_LOGGED_IN } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
}

export default function MobileMenu({
  open,
  onClose,
  onSignIn,
  onSignUp,
  onSignOut,
}: MobileMenuProps) {
  const { user, loading } = useAuth();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed top-0 right-0 w-72 h-full bg-dark p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-light"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="mt-12 flex flex-col gap-4">
          {(user ? NAV_LINKS_LOGGED_IN : NAV_LINKS).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-text-light text-lg font-bold hover:text-brand-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          {loading ? null : user ? (
            <>
              <Link
                href="/account"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-text-light border border-white/20 rounded-md hover:bg-white/10 transition-colors"
              >
                <User size={18} />
                Me — Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="w-full px-5 py-3 text-sm font-bold text-white border border-white rounded-md bg-transparent hover:bg-white/10 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  onSignIn();
                  onClose();
                }}
                className="w-full px-5 py-3 text-sm font-bold text-text-light border border-brand rounded-md hover:bg-brand/10 transition-colors"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  onSignUp();
                  onClose();
                }}
                className="w-full px-5 py-3 text-sm font-bold text-white bg-brand rounded-md hover:bg-brand-dark transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
