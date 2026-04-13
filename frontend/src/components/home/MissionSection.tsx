import { Smartphone, User, Award } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Responsive",
    description:
      "All our online purchasable courses are fully responsive. You can follow them on any device.",
  },
  {
    icon: User,
    title: "Users",
    description:
      "Also accessible for individual users. You can personally pay for/and undertake the training.",
  },
  {
    icon: Award,
    title: "Certificate",
    description:
      "After successful completion, you will receive a certificate which is valid for 2 years unless mentioned otherwise.",
  },
];

export default function MissionSection() {
  return (
    <section className="bg-body-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-[38px] font-bold text-text-dark leading-tight">
            Our Mission
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-muted leading-relaxed">
            Our mission is to make dangerous goods training affordable and
            accessible to everyone, no matter your level of expertise.
          </p>
          <p className="mt-3 max-w-2xl mx-auto text-text-muted leading-relaxed">
            We believe that our clear, practical approach will give you the
            knowledge and skills you need to handle dangerous goods safely and
            with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-5">
                <f.icon size={30} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
