"use client";

import { Accordion } from "@/components/ui";
import { FAQ_ITEMS } from "@/lib/data";

export default function FAQSection() {
  return (
    <section className="bg-light-bg py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[38px] font-bold text-text-dark leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            We&apos;ve gathered some of the most common questions to help you
            get started with confidence.
          </p>
        </div>

        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
