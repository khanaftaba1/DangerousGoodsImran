import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/data";
import { LEARNING_PROGRAMS } from "@/lib/programDetails";
import PricingFAQ from "./PricingFAQ";

export const metadata: Metadata = {
  title: "Dangerous Goods Training & Knowledge Support | DG-online",
  description:
    "Dangerous goods support plans combining online training with expert email support and 1:1 sessions for shippers and freight forwarders.",
};

const PRICING_FAQ = [
  {
    question: "Is this a monthly subscription?",
    answer:
      "Yes. Subscriptions are billed monthly and can be cancelled at any time. Access remains active until the end of the current billing period.",
  },
  {
    question: "What is included in the advisory support?",
    answer:
      "Knowledge support includes unlimited email-based DG questions within a defined response time. Essentials includes one 1:1 advisory session per quarter; Premium includes one 1:1 session per month.",
  },
  {
    question: "Are new trainings included?",
    answer:
      "Yes. New training content is added periodically and included in active subscriptions at no additional cost.",
  },
  {
    question: "Is this suitable for medical Dangerous Goods?",
    answer:
      "Yes. Medical-related Dangerous Goods training is available within the relevant training plans included in the subscriptions.",
  },
  {
    question: "Who can access the training content?",
    answer:
      "Training access is provided to the registered account holder only and may not be shared with other employees or third parties.",
  },
  {
    question: "Can additional employees access the training?",
    answer:
      "Additional employees require their own training access. Premium subscribers may be eligible for preferential pricing for additional staff training. Please contact us for details.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25]">
              Dangerous Goods Support Plans for Shippers &amp; Freight
              Forwarders
            </h1>
            <p className="mt-6 text-text-light/80 leading-relaxed">
              Our dangerous goods support plans combine access to online
              dangerous goods training with ongoing expert email support and
              scheduled 1:1 sessions.
            </p>
            <p className="mt-3 text-text-light/70 leading-relaxed text-sm">
              These subscription plans are designed for shippers, freight
              forwarders and logistics professionals who require continuous
              support to maintain compliance with IATA Dangerous Goods
              Regulations.
            </p>
          </div>
        </div>
      </section>

      {/* What is included */}
      <section className="bg-body-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight">
              What is included in a Dangerous Goods Support Plan?
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              Our dangerous goods support plans provide organisations with
              continuous access to training resources and expert support.
              Subscribers can ask operational and regulatory questions via email
              and schedule 1:1 support sessions to clarify responsibilities,
              documentation requirements and classification or handling questions
              related to air cargo shipments.
            </p>
          </div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
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
                      plan.highlighted
                        ? "text-text-light/60"
                        : "text-text-muted"
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
                <button
                  className={`w-full rounded-[10px] px-6 py-4 text-[15px] font-bold transition-colors ${
                    plan.highlighted
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "border border-brand text-brand-dark hover:bg-brand/10"
                  }`}
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Programs */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight text-center mb-12">
            Learning programs
          </h2>

          <div className="space-y-8">
            {LEARNING_PROGRAMS.map((program) => (
              <div
                key={program.title}
                className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div>
                    <Link
                      href={`/program/${program.slug}`}
                      className="text-lg font-bold text-text-dark hover:text-brand transition-colors"
                    >
                      {program.title}
                    </Link>
                    <p className="text-sm text-text-muted mt-0.5">
                      {program.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      {program.originalPrice && (
                        <span className="block text-sm text-text-muted line-through">
                          {program.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-text-dark">
                        {program.price}
                      </span>
                    </div>
                    <Link
                      href={`/program/${program.slug}`}
                      className="rounded-[10px] bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
                    >
                      {program.buttonLabel}
                    </Link>
                  </div>
                </div>

                {/* Course count badge */}
                <span className="inline-block bg-brand-dark/80 text-white text-xs font-bold px-2.5 py-1 rounded mb-4">
                  {program.courses.length} Courses
                </span>

                {/* Course thumbnails grid */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {program.courses.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/course/${course.slug}`}
                      className="flex-shrink-0 w-[140px] group"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-light-bg ring-1 ring-transparent group-hover:ring-brand/40 transition-all">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="140px"
                        />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-text-dark leading-tight line-clamp-3 group-hover:text-brand transition-colors">
                        {course.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-body-bg py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight mb-8">
            Frequently asked questions
          </h2>
          <PricingFAQ items={PRICING_FAQ} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-[38px] font-bold text-white leading-tight">
            Ready to get started?
          </h2>
          <p className="mt-4 text-text-light/70 max-w-xl mx-auto">
            Choose the plan that fits your needs or browse our individual
            courses.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-[10px] border border-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand/10 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-[10px] bg-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
