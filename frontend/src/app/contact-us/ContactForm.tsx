"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-light-bg rounded-xl p-10 text-center">
        <p className="text-2xl font-bold text-text-dark">Thank you!</p>
        <p className="mt-2 text-text-muted">
          Your message has been sent. We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-text-dark mb-1.5">
            First Name
          </label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full rounded-[10px] border border-border px-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-dark mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full rounded-[10px] border border-border px-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-text-dark mb-1.5">
          E-mail address
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-[10px] border border-border px-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-text-dark mb-1.5">
          Your message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-[10px] border border-border px-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/40 resize-y"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-[10px] bg-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors"
      >
        <Send size={16} />
        Send your message
      </button>
    </form>
  );
}
