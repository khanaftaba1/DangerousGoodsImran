export interface ProgramCourse {
  slug: string;
  title: string;
  thumbnail: string;
}

export interface ProgramDetail {
  slug: string;
  title: string;
  pageTitle: string;
  description: string;
  extendedDescription?: string;
  price: string;
  priceLabel: string;
  originalPrice?: string;
  period?: string;
  buttonLabel: string;
  badge?: string;
  heroImage: string;
  useCases: string[];
  courses: ProgramCourse[];
  faq: { question: string; answer: string }[];
}

export const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  "biologicals-dry-ice": {
    slug: "biologicals-dry-ice",
    title: "Biologicals - Dry Ice",
    pageTitle: "Biologicals - Dry Ice Bundle",
    description:
      "Bundle offer – Biologicals and Dry Ice by air transport. Get both courses at a reduced price.",
    price: "€101.25",
    priceLabel: "€101.25",
    originalPrice: "€112.50",
    buttonLabel: "Enroll",
    badge: "special offer",
    heroImage: "/images/programs/biologicals-dry-ice.jpg",
    useCases: [
      "Shipping infectious substances (Category A and B) and biologicals by air",
      "Shipping dry ice (UN 1845) as a refrigerant or standalone cargo by air",
      "Understanding IATA DGR packing, marking and documentation requirements for both shipment types",
      "Professionals who handle both biologicals and dry ice shipments and want a combined training package",
    ],
    courses: [
      {
        slug: "biologicals",
        title:
          "Shipping Infectious Substances and Biologicals by Air Transport (IATA DGR)",
        thumbnail: "/images/courses/biologicals.jpg",
      },
      {
        slug: "dry-ice-air-transport-iata",
        title: "Shipping Dry Ice (UN 1845) by Air – IATA Training",
        thumbnail: "/images/courses/dry-ice-air-transport-iata.jpg",
      },
    ],
    faq: [
      {
        question: "What is included in this bundle?",
        answer:
          "This bundle includes two complete online training courses: Shipping Infectious Substances and Biologicals by Air Transport, and Shipping Dry Ice (UN 1845) by Air. Both courses are based on the IATA Dangerous Goods Regulations.",
      },
      {
        question: "How much do I save with the bundle?",
        answer:
          "The bundle is offered at €101.25 instead of €112.50 when purchasing both courses individually, saving you €11.25.",
      },
      {
        question: "How long do I have access?",
        answer:
          "Once enrolled, you have access to both courses for the standard access period as defined at the time of purchase.",
      },
    ],
  },

  "dg-essentials-subscription": {
    slug: "dg-essentials-subscription",
    title: "DG Essentials",
    pageTitle: "DG Essentials Subscription",
    description:
      "DG Essentials helps shippers and DG professionals stay compliant in daily operations.",
    extendedDescription:
      "You get practical understanding-level Dangerous Goods training plus direct access to expert advisory support, so you can interpret IATA and ICAO requirements correctly and with confidence.",
    price: "€75",
    priceLabel: "€75/month",
    period: "month",
    buttonLabel: "Subscribe",
    heroImage: "/images/programs/dg-essentials.png",
    useCases: [
      "Verifying whether a shipment is correctly classified, packed and documented",
      "Interpreting IATA DGR requirements for day-to-day shipping decisions",
      "Clarifying regulatory questions before tendering or booking air cargo",
      "Supporting internal discussions with operations, QA or management",
    ],
    courses: [
      {
        slug: "understanding-the-basics-of-dangerous-goods",
        title: "Understanding the Basics of Dangerous Goods (IATA DGR)",
        thumbnail:
          "/images/courses/understanding-the-basics-of-dangerous-goods.jpg",
      },
      {
        slug: "understanding-overpack",
        title: "Understanding Overpack Requirements (IATA DGR)",
        thumbnail: "/images/courses/understanding-overpack.jpg",
      },
      {
        slug: "identification",
        title: "Understanding Identification",
        thumbnail: "/images/courses/identification.jpg",
      },
    ],
    faq: [
      {
        question: "What is included in the DG Essentials subscription?",
        answer:
          "DG Essentials includes access to selected understanding-level Dangerous Goods training, unlimited email-based advisory support with a defined response time, and one scheduled 1-to-1 online advisory session per quarter.",
      },
      {
        question: "What level of training is included in DG Essentials?",
        answer:
          "DG Essentials provides understanding-level Dangerous Goods training focused on correct interpretation of IATA Dangerous Goods Regulations and ICAO Technical Instructions for air transport operations.",
      },
      {
        question: "How does the advisory support work?",
        answer:
          "Subscribers can submit DG-related questions by email and receive expert guidance within the defined response time, supporting correct regulatory interpretation in daily operations.",
      },
      {
        question: "How often can I schedule a 1-to-1 session?",
        answer:
          "DG Essentials includes one scheduled 1-to-1 online advisory session per quarter, conducted via Teams, Zoom, or a comparable platform.",
      },
    ],
  },

  "dg-premium-subscription": {
    slug: "dg-premium-subscription",
    title: "DG Premium",
    pageTitle: "DG Premium Subscription",
    description:
      "DG Premium provides full access to all Dangerous Goods training, including advanced and role-specific courses, combined with priority expert advisory support.",
    extendedDescription:
      "Training is aligned with applicable IATA Dangerous Goods Regulations and ICAO Technical Instructions for air transport. Subscribers receive unlimited priority email-based expert guidance and regular 1-to-1 advisory sessions, supporting DG responsible persons and management in interpreting and applying complex regulatory requirements within their operational environment.",
    price: "€149",
    priceLabel: "€149/month",
    period: "month",
    buttonLabel: "Subscribe",
    heroImage: "/images/programs/dg-premium.jpg",
    useCases: [
      "Supporting internal DG responsible persons with regulatory interpretation questions",
      "Discussing non-routine or complex DG cases during scheduled monthly 1-to-1 advisory sessions",
      "Clarifying IATA and ICAO requirements to support internal decision-making",
      "Providing expert input to operational or compliance discussions without assuming responsibility",
      "Assisting professionals who require faster access to DG expertise",
    ],
    courses: [
      {
        slug: "identification",
        title: "Understanding Identification",
        thumbnail: "/images/courses/identification.jpg",
      },
      {
        slug: "lithium-battery",
        title: "Shipping Lithium Batteries by Air (IATA DGR)",
        thumbnail: "/images/courses/lithium-battery.jpg",
      },
      {
        slug: "shipping-excepted-quantities",
        title: "Shipping Excepted Quantities (IATA DGR)",
        thumbnail: "/images/courses/shipping-excepted-quantities.jpg",
      },
      {
        slug: "understanding-the-basics-of-dangerous-goods",
        title: "Understanding the Basics of Dangerous Goods (IATA DGR)",
        thumbnail:
          "/images/courses/understanding-the-basics-of-dangerous-goods.jpg",
      },
      {
        slug: "understanding-overpack",
        title: "Understanding Overpack Requirements (IATA DGR)",
        thumbnail: "/images/courses/understanding-overpack.jpg",
      },
      {
        slug: "biologicals",
        title:
          "Shipping Infectious Substances and Biologicals (IATA DGR)",
        thumbnail: "/images/courses/biologicals.jpg",
      },
      {
        slug: "dry-ice-air-transport-iata",
        title: "Shipping Dry Ice (UN 1845) by Air (IATA DGR)",
        thumbnail: "/images/courses/dry-ice-air-transport-iata.jpg",
      },
    ],
    faq: [
      {
        question: "What is included in the DG Premium subscription?",
        answer:
          "DG Premium includes full access to all Dangerous Goods training courses, unlimited priority email-based advisory support with faster response times, and one scheduled 1-to-1 online advisory session per month.",
      },
      {
        question: "How does DG Premium differ from DG Essentials?",
        answer:
          "DG Premium includes full access to all Dangerous Goods training courses, unlimited priority email-based advisory support with faster response times, and one scheduled 1-to-1 online advisory session per month. Essentials includes selected courses and quarterly 1-to-1 sessions.",
      },
      {
        question: "What level of training is included in DG Premium?",
        answer:
          "DG Premium includes understanding, advanced, and role-specific Dangerous Goods training aligned with IATA and ICAO requirements for air transport.",
      },
      {
        question:
          "Can DG Premium replace an internal DG responsible person?",
        answer:
          "No. DG Premium provides advisory support and expert input but does not replace or assume the role or legal responsibility of an internal DG responsible person.",
      },
      {
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes. The subscription can be cancelled at any time, with access remaining active until the end of the current billing period.",
      },
    ],
  },
};

export const LEARNING_PROGRAMS = Object.values(PROGRAM_DETAILS).map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  heroImage: p.heroImage,
  courseCount: p.courses.length,
  price: p.priceLabel,
  originalPrice: p.originalPrice,
  buttonLabel: p.buttonLabel,
  badge: p.badge,
  courses: p.courses,
}));
