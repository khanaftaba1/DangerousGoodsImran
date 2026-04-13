import Link from "next/link";
import { CourseCard } from "@/components/ui";
import { FEATURED_COURSES } from "@/lib/data";

export default function CoursesSection() {
  return (
    <section className="bg-body-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-text-dark leading-tight">
            Online Dangerous Goods Training Courses
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted leading-relaxed">
            Independent Dangerous Goods Training – Practical Knowledge You Can
            Trust
          </p>
          <p className="mt-2 text-sm text-text-muted">
            For team access or multiple user accounts, please{" "}
            <Link href="/contact-us" className="text-link underline">
              contact us
            </Link>{" "}
            to discuss the appropriate setup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_COURSES.map((course) => (
            <CourseCard key={course.slug} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
