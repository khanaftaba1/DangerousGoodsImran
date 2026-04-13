import Link from "next/link";
import { Mail } from "lucide-react";
import { FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark text-text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-md">
            <a
              href={`mailto:${FOOTER.email}`}
              className="inline-flex items-center gap-2 text-brand-light hover:text-brand transition-colors text-sm"
            >
              <Mail size={16} />
              {FOOTER.email}
            </a>
            <p className="mt-4 text-sm text-text-light/70 leading-relaxed">
              {FOOTER.description}
            </p>
            <p className="mt-1 text-sm text-text-light/70">
              {FOOTER.siteName} ({FOOTER.siteUrl})
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/terms"
              className="text-text-light/70 hover:text-brand-light transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-text-light/70 hover:text-brand-light transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact-us"
              className="text-text-light/70 hover:text-brand-light transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-text-light/50">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
