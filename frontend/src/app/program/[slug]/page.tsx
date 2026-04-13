import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { CatalogSourceHint } from "@/components/dev/CatalogSourceHint";
import { getProgramDetail } from "@/lib/catalog";
import ProgramFAQ from "./ProgramFAQ";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: program } = await getProgramDetail(slug);
  if (!program) return {};
  return {
    title: `${program.pageTitle} | DG-online`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: program, source } = await getProgramDetail(slug);
  if (!program) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <CatalogSourceHint label="Program detail" source={source} />
            <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25] mt-2">
              {program.pageTitle}
            </h1>
            <p className="mt-6 text-text-light/80 leading-relaxed">
              {program.description}
            </p>
            {program.extendedDescription && (
              <p className="mt-3 text-text-light/70 text-sm leading-relaxed">
                {program.extendedDescription}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-[10px] bg-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors">
                {program.buttonLabel}
              </button>
              <div>
                {program.originalPrice && (
                  <span className="block text-sm text-text-light/40 line-through">
                    {program.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-white">
                  {program.price}
                  {program.period && (
                    <span className="text-sm font-normal text-text-light/60">
                      {" "}
                      / {program.period}
                    </span>
                  )}
                </span>
              </div>
              {program.badge && (
                <span className="bg-brand text-white text-xs font-bold px-3 py-1.5 rounded">
                  {program.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Typical use cases */}
      <section className="bg-body-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight mb-8">
            Typical use cases
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {program.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className="mt-0.5 flex-shrink-0 text-brand"
                />
                <span className="text-text-muted leading-relaxed text-[15px]">
                  {uc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Included courses */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight mb-3">
            Included courses
          </h2>
          <span className="inline-block bg-brand-dark/80 text-white text-xs font-bold px-2.5 py-1 rounded mb-8">
            {program.courses.length} Courses
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {program.courses.map((course) => (
              <Link
                key={course.slug}
                href={`/course/${course.slug}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-white ring-1 ring-border group-hover:ring-brand/40 transition-all">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-text-dark leading-tight line-clamp-3 group-hover:text-brand transition-colors">
                  {course.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {program.faq.length > 0 && (
        <section className="bg-body-bg py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight mb-8">
              Frequently asked questions – {program.title}
            </h2>
            <ProgramFAQ items={program.faq} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-[32px] font-bold text-white leading-tight">
            Ready to get started?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="rounded-[10px] bg-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors">
              {program.buttonLabel} – {program.price}
              {program.period ? `/${program.period}` : ""}
            </button>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-[10px] border border-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand/10 transition-colors"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
