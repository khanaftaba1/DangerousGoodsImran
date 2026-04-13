"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
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
          {NAV_LINKS.map((link) => (
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
          <button className="w-full px-5 py-3 text-sm font-bold text-text-light border border-brand rounded-md hover:bg-brand/10 transition-colors">
            Sign in
          </button>
          <button className="w-full px-5 py-3 text-sm font-bold text-white bg-brand rounded-md hover:bg-brand-dark transition-colors">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
