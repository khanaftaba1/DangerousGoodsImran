"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getApiBase } from "@/lib/auth-api";
import { getAuthFetchInit } from "@/lib/auth-storage";
import type { Profile } from "@/lib/types";

type FormState = {
  full_name: string;
  phone: string;
  company_name: string;
  country: string;
  profession: string;
  marketing_opt_in: boolean;
};

function profileToForm(p: Profile | null): FormState {
  return {
    full_name: p?.full_name ?? "",
    phone: p?.phone ?? "",
    company_name: p?.company_name ?? "",
    country: p?.country ?? "",
    profession: p?.profession ?? "",
    marketing_opt_in: p?.marketing_opt_in ?? false,
  };
}

export default function AccountPage() {
  const { user, profile, loading, openSignIn, refreshUser } = useAuth();
  const [form, setForm] = useState<FormState>(() => profileToForm(null));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(profileToForm(profile));
  }, [profile]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-text-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-dark">Your account</h1>
        <p className="mt-3 text-text-muted">
          Sign in to view and edit your profile.
        </p>
        <button
          type="button"
          onClick={() => openSignIn()}
          className="mt-8 rounded-[10px] bg-brand px-8 py-3 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors"
        >
          Sign in
        </button>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setSaving(true);
    try {
      const api = getApiBase();
      const res = await fetch(
        `${api}/profile`,
        getAuthFetchInit({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: form.full_name || null,
            phone: form.phone || null,
            company_name: form.company_name || null,
            country: form.country || null,
            profession: form.profession || null,
            marketing_opt_in: form.marketing_opt_in,
          }),
        })
      );
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!json.success) {
        setError(json.error || "Could not save");
        return;
      }
      setMessage("Profile saved.");
      await refreshUser();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-body-bg py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-text-muted mb-2">
          <Link href="/" className="text-link hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          Account
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-text-dark">
          Profile
        </h1>
        <p className="mt-2 text-text-muted text-sm">
          Signed in as <span className="text-text-dark">{user.email}</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm"
        >
          <div>
            <label className="block text-sm font-bold text-text-dark mb-1">
              Full name
            </label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-dark mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-dark mb-1">
              Company
            </label>
            <input
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-dark mb-1">
              Country
            </label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-dark mb-1">
              Profession
            </label>
            <input
              name="profession"
              value={form.profession}
              onChange={handleChange}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="marketing_opt_in"
              checked={form.marketing_opt_in}
              onChange={handleChange}
              className="rounded border-border"
            />
            <span className="text-sm text-text-muted">
              Email me product updates and training tips
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-[10px] bg-brand px-8 py-3 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
