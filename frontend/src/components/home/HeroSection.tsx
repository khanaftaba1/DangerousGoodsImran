import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-dark overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-home.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-[50px] font-bold text-white leading-[1.25]">
            Online Dangerous Goods Training &amp; Certification
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-light/80 leading-relaxed">
            Online dangerous goods training and certification for professionals
            involved in air cargo, logistics, and regulated shipments, fully
            aligned with IATA Dangerous Goods Regulations (DGR) and ICAO
            Technical Instructions.
          </p>
          <p className="mt-4 text-base text-text-light/70 leading-relaxed">
            Our online dangerous goods training is designed for professionals
            responsible for the preparation, handling, and shipment of regulated
            goods by air.
          </p>
          <p className="mt-4 text-base text-text-light/70 leading-relaxed">
            Courses are role-based and aligned with IATA Dangerous Goods
            Regulations (DGR) and ICAO Technical Instructions, ensuring
            compliance for individuals and organisations operating in regulated
            environments.
          </p>
          <p className="mt-4 text-base text-text-light/70 leading-relaxed">
            Training is available as individual courses or through
            subscription-based learning programs that combine structured
            training with ongoing knowledge support.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-[10px] bg-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand-dark transition-colors"
            >
              View Courses
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-[10px] border border-brand px-8 py-4 text-[15px] font-bold text-white hover:bg-brand/10 transition-colors"
            >
              Support Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
