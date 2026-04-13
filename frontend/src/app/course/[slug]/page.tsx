import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, GraduationCap, FileCheck, User, Award, Check } from "lucide-react";
import { COURSE_DETAILS, TRAINER } from "@/lib/courseDetails";
import CourseDetailFAQ from "./CourseDetailFAQ";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSE_DETAILS[slug];
  if (!course) return { title: "Course Not Found" };
  return {
    title: course.pageTitle,
    description: course.overview.slice(0, 160),
  };
}

export function generateStaticParams() {
  return Object.keys(COURSE_DETAILS).map((slug) => ({ slug }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = COURSE_DETAILS[slug];
  if (!course) notFound();

  const meta = [
    { icon: GraduationCap, label: "Level", value: course.level },
    { icon: Clock, label: "Study time", value: course.studyTime },
    { icon: FileCheck, label: "Exams", value: course.exams },
    { icon: User, label: "Author", value: course.author },
    { icon: Award, label: "Certificate", value: course.certificate },
  ];

  if (course.layout === "meta_bar") {
    return <MetaBarLayout course={course} meta={meta} />;
  }

  return <SidebarLayout course={course} meta={meta} />;
}

function SidebarLayout({
  course,
  meta,
}: {
  course: (typeof COURSE_DETAILS)[string];
  meta: { icon: typeof Clock; label: string; value: string }[];
}) {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25] max-w-3xl">
            {course.title}
          </h1>
          <p className="mt-4 text-lg text-text-light/80 max-w-3xl leading-relaxed">
            {course.subtitle}
          </p>
        </div>
      </section>

      {/* Main content + Sidebar */}
      <section className="bg-body-bg py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-xl font-bold text-text-dark mb-4">
                  Course overview
                </h2>
                <p className="text-text-muted leading-relaxed">
                  {course.overview}
                </p>
                <div className="mt-6 flex flex-wrap items-baseline gap-3">
                  <span className="text-lg font-bold text-text-dark">
                    Price: {course.priceVat}
                  </span>
                  {course.netPrice !== "Free" && (
                    <span className="text-sm text-text-muted">
                      Net Price: {course.netPrice}
                    </span>
                  )}
                </div>
                {course.certNote && (
                  <div className="mt-6 p-4 bg-light-bg rounded-lg border border-border">
                    <p className="text-sm font-bold text-text-dark">
                      Certification included
                    </p>
                    <p className="text-sm text-text-muted mt-1">
                      {course.certNote}
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ */}
              {course.faq.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-text-dark mb-4">
                    Frequently asked questions
                  </h2>
                  <CourseDetailFAQ items={course.faq} />
                </div>
              )}

              {/* Trainer */}
              <div>
                <h2 className="text-xl font-bold text-text-dark mb-4">
                  About the Trainer
                </h2>
                <div className="flex gap-5 items-start">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={TRAINER.image}
                      alt={TRAINER.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                    {TRAINER.bioLong}
                  </div>
                </div>
              </div>

              {/* Objectives */}
              {course.objectives.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-text-dark mb-4">
                    Learning Objectives
                  </h2>
                  <ul className="space-y-3">
                    {course.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          size={18}
                          className="mt-0.5 flex-shrink-0 text-brand"
                        />
                        <span className="text-text-muted leading-relaxed">
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Meta card */}
                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-4">
                    Lesson series
                  </h3>
                  <ul className="space-y-4">
                    {meta.map((m) => (
                      <li key={m.label} className="flex items-center gap-3">
                        <m.icon size={18} className="text-brand flex-shrink-0" />
                        <div>
                          <p className="text-xs text-text-muted">{m.label}</p>
                          <p className="text-sm font-bold text-text-dark">
                            {m.value}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="w-full rounded-[10px] bg-brand px-6 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors">
                  {course.price === "Free" ? "Start Free" : `Enroll — ${course.price}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MetaBarLayout({
  course,
  meta,
}: {
  course: (typeof COURSE_DETAILS)[string];
  meta: { icon: typeof Clock; label: string; value: string }[];
}) {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25] max-w-3xl">
            {course.title}
          </h1>
          <p className="mt-4 text-lg text-text-light/80 max-w-3xl leading-relaxed">
            {course.subtitle}
          </p>
          <p className="mt-2 text-text-light/60 max-w-3xl">{course.description}</p>
        </div>
      </section>

      {/* Content bullets + meta bar */}
      <section className="bg-body-bg py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Course content */}
          {course.contentBullets && course.contentBullets.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-2">
                Course Content
              </h2>
              <p className="text-sm text-text-muted mb-4">
                What you will learn:
              </p>
              <ul className="space-y-3">
                {course.contentBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-brand"
                    />
                    <span className="text-text-muted">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta bar */}
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text-dark mb-4">
              Course at a Glance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {meta.map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <m.icon size={16} className="text-brand flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-muted">{m.label}</p>
                    <p className="text-sm font-bold text-text-dark">
                      {m.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xl font-bold text-text-dark">
              Price: {course.priceVat}
            </span>
            <button className="rounded-[10px] bg-brand px-8 py-3 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors">
              {course.price === "Free" ? "Start Free" : `Enroll — ${course.price}`}
            </button>
          </div>

          {/* Trainer */}
          <div>
            <h2 className="text-xl font-bold text-text-dark mb-4">
              About the Trainer
            </h2>
            <div className="flex gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={TRAINER.image}
                  alt={TRAINER.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                {TRAINER.bioShort}
              </p>
            </div>
          </div>

          {/* FAQ */}
          {course.faq.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-4">
                Frequently asked questions
              </h2>
              <CourseDetailFAQ items={course.faq} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
