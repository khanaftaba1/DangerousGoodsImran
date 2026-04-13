import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Dangerous Goods Online Training | DG-online",
  description:
    "Have questions about dangerous goods training, course selection, or team access? Contact us for support.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-[46px] font-bold text-white leading-[1.25]">
              Contact Dangerous Goods Training Support
            </h1>
            <p className="mt-6 text-text-light/80 leading-relaxed">
              Have questions about dangerous goods training, course selection, or
              access for teams?
            </p>
            <p className="mt-3 text-text-light/70 text-sm leading-relaxed">
              Use the form below to get in touch. We&apos;re happy to help you
              determine the most appropriate training or access option based on
              your operational needs and responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Info sections */}
      <section className="bg-body-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-3">
                Training for Individuals and Teams
              </h2>
              <p className="text-text-muted leading-relaxed text-sm">
                We offer online dangerous goods training for individual
                professionals as well as organisations. For teams, group
                enrolment options are available, including consolidated invoicing
                and access management for multiple participants. If you are
                looking to train several employees, please contact us to discuss
                the most suitable setup.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-3">
                Competency-Based and Flexible Training Options
              </h2>
              <p className="text-text-muted leading-relaxed text-sm">
                Our training is designed to provide learners with the knowledge
                relevant to their specific role and responsibilities. Courses are
                modular and competency-based, allowing participants to focus on
                what they need to know for safe and compliant operations. For
                organisations with specific requirements, tailored training
                solutions and structured learning programs can be discussed.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-3">
                Integration and Access Options
              </h2>
              <p className="text-text-muted leading-relaxed text-sm">
                Selected courses can be made available via SCORM for integration
                into your internal learning management system.
                Subscription-based access and ongoing knowledge support options
                are also available for organisations requiring continuous access
                to training and regulatory interpretation support.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-3">
                Get in Touch
              </h2>
              <p className="text-text-muted leading-relaxed text-sm">
                If you have questions about course selection, team access,
                subscriptions, or technical options such as SCORM integration,
                please contact us using the form below.
              </p>
              <p className="mt-2 text-text-muted leading-relaxed text-sm">
                Please note: operational or regulatory questions are addressed as
                part of training courses or subscription plans.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-[38px] font-bold text-text-dark leading-tight mb-8">
              Contact form
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
