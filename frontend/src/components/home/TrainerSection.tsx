import Image from "next/image";

export default function TrainerSection() {
  return (
    <section className="bg-dark py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/trainer/trainer.png"
                alt="DG-online trainer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>

          <div>
            <p className="text-brand-light text-sm font-bold uppercase tracking-wider mb-3">
              Boost your knowledge to increase
            </p>
            <h2 className="text-3xl md:text-[38px] font-bold text-white leading-[1.25]">
              The safe transport of dangerous goods
            </h2>
            <p className="mt-6 text-text-light/70 leading-relaxed">
              We offer online dangerous goods training. Always updated to comply
              with the latest regulations. Our courses are developed by
              knowledgeable trainers with more than 30 years of experience in
              training and handling dangerous goods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
