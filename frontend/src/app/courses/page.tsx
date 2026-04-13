import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CourseSearch from "./CourseSearch";
import { LEARNING_PROGRAMS } from "@/lib/programDetails";

export const metadata: Metadata = {
  title: "Online IATA DGR Dangerous Goods Training Courses | From €25",
  description:
    "Online dangerous goods training for shipping and logistics companies. Modular courses aligned with IATA regulations.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25]">
              Online Dangerous Goods Training
            </h1>
            <p className="mt-6 text-text-light/80 leading-relaxed">
              Online dangerous goods training for shipping and logistics
              companies.
            </p>
            <p className="mt-3 text-text-light/70 leading-relaxed text-sm">
              Our modular courses are aligned with IATA regulations and support
              safe, compliant handling and transport of dangerous goods. Based on
              the type of dangerous goods you ship and the specific
              responsibilities of each role, both individual professionals and
              company teams can easily select the appropriate dangerous goods
              training course online. Upon successful completion, participants
              receive a dangerous goods certificate.
            </p>
            <Link
              href="#courses"
              className="mt-8 inline-flex items-center justify-center rounded-[10px] bg-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors"
            >
              Start Learning Now
            </Link>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section id="courses" className="bg-body-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight">
              Online Dangerous Goods Training Courses
            </h2>
            <p className="mt-4 max-w-3xl text-text-muted leading-relaxed">
              Our online dangerous goods training courses include both
              class-specific modules and role-based understanding training.
              Courses are designed for shippers, freight forwarders and logistics
              professionals involved in air cargo operations, allowing individual
              participants and company teams to select training based on their
              responsibilities.
            </p>
          </div>

          <CourseSearch />
        </div>
      </section>

      {/* Why Training Section */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h3 className="text-xl md:text-[23px] font-bold text-text-dark leading-tight">
              Why Dangerous Goods Training Is Required
            </h3>
            <p className="mt-4 text-text-muted leading-relaxed">
              Dangerous goods training is essential for anyone involved in the
              preparation, handling or transport of dangerous goods. It ensures
              that individuals have the knowledge and skills required to perform
              their tasks safely and in compliance with applicable regulations.
            </p>
            <p className="mt-3 text-text-muted leading-relaxed">
              All persons involved in dangerous goods activities must be trained
              for the functions for which they are responsible. The
              competency-based training approach allows organisations to
              determine the appropriate training based on job roles and
              operational responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Programs */}
      <section className="bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-[38px] font-bold text-white leading-tight">
              Learning Programs (Advanced &amp; Custom)
            </h2>
            <p className="mt-4 text-text-light/70 leading-relaxed">
              Our advanced and custom learning programs are designed for
              organisations that require more than standard online dangerous
              goods training. These programs provide structured access to
              selected training courses, combined with ongoing knowledge support
              via email and scheduled 1:1 online sessions, helping subscribed
              professionals correctly interpret and apply complex dangerous goods
              regulations, with knowledge that can be applied within their
              organisation and teams.
            </p>
          </div>

          <p className="text-center text-sm font-bold text-text-light/60 mb-8">
            All learning programs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNING_PROGRAMS.map((program) => (
              <Link
                key={program.slug}
                href={`/program/${program.slug}`}
                className="group block"
              >
                <div className="bg-[#1a1a2e] rounded-xl overflow-hidden border border-white/10 hover:border-brand/40 transition-colors h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark/30">
                    <Image
                      src={program.heroImage}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-brand-dark/80 text-text-light text-xs font-bold px-2.5 py-1 rounded">
                      {program.courseCount} Courses
                    </span>
                    {program.badge && (
                      <span className="absolute top-3 right-3 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded rotate-12 origin-center">
                        {program.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-light/60 flex-1">
                      {program.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white group-hover:bg-brand-dark transition-colors">
                        {program.buttonLabel}
                      </span>
                      <div className="text-right">
                        {program.originalPrice && (
                          <span className="block text-xs text-text-light/40 line-through">
                            {program.originalPrice}
                          </span>
                        )}
                        <span className="text-base font-bold text-white">
                          {program.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
