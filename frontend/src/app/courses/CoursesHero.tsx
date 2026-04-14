import Link from "next/link";

export default function CoursesHero() {
  return (
    <section className="bg-dark py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25]">
            Online Dangerous Goods Training
          </h1>
          <p className="mt-6 text-text-light/80 leading-relaxed">
            Online dangerous goods training for shipping and logistics companies.
          </p>
          <p className="mt-3 text-text-light/70 leading-relaxed text-sm">
            Our modular courses are aligned with IATA regulations and support safe,
            compliant handling and transport of dangerous goods. Based on the type
            of dangerous goods you ship and the specific responsibilities of each
            role, both individual professionals and company teams can easily
            select the appropriate dangerous goods training course online. Upon
            successful completion, participants receive a dangerous goods
            certificate.
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
  );
}
