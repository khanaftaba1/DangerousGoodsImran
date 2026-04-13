import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/data";

export default function SubscriptionSection() {
  return (
    <section className="bg-light-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-text-dark leading-tight">
            Ongoing Dangerous Goods Support
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted leading-relaxed">
            Need more than just individual training courses? Our subscription is
            for companies who want expert guidance on dangerous goods compliance
            — answering questions, reviewing documentation, advising on complex
            shipments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-dark text-text-light ring-2 ring-brand shadow-xl"
                  : "bg-white border border-border shadow-sm"
              }`}
            >
              <h3
                className={`text-2xl font-bold ${
                  plan.highlighted ? "text-white" : "text-text-dark"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-2 text-sm ${
                  plan.highlighted ? "text-text-light/70" : "text-text-muted"
                }`}
              >
                {plan.tagline}
              </p>

              <div className="mt-6 mb-2">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? "text-white" : "text-text-dark"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1 ${
                    plan.highlighted ? "text-text-light/60" : "text-text-muted"
                  }`}
                >
                  / {plan.period}
                </span>
              </div>
              <p
                className={`text-xs mb-6 ${
                  plan.highlighted ? "text-text-light/50" : "text-text-muted"
                }`}
              >
                {plan.billing}
              </p>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? "text-brand-light" : "text-brand"
                      }`}
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        plan.highlighted
                          ? "text-text-light/80"
                          : "text-text-muted"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand transition-colors"
          >
            View subscription plans overview
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
