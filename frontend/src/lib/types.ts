export interface CourseListItem {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  level: string;
  badge: string | null;
}

export interface CourseDetail {
  slug: string;
  title: string;
  pageTitle: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  price: string;
  priceNumeric: number;
  priceVat: string;
  netPrice: string;
  level: string;
  studyTime: string;
  exams: string;
  author: string;
  certificate: string;
  overview: string;
  certNote: string;
  layout: "sidebar" | "meta_bar";
  faq: { question: string; answer: string }[];
  objectives: string[];
  contentBullets: string[] | null;
}

export interface ProgramListItem {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  courseCount: number;
  price: string;
  originalPrice: string | null;
  buttonLabel: string;
  badge: string | null;
  courses: { slug: string; title: string; thumbnail: string }[];
}

export interface ProgramDetail {
  slug: string;
  title: string;
  pageTitle: string;
  description: string;
  extendedDescription: string | null;
  price: string;
  priceNumeric: number;
  originalPrice: string | null;
  period: string | null;
  buttonLabel: string;
  badge: string | null;
  heroImage: string;
  useCases: string[];
  faq: { question: string; answer: string }[];
  courses: { slug: string; title: string; thumbnail: string }[];
}

export interface PlanItem {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  billing: string;
  features: string[];
  highlighted: boolean;
  programSlug: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  country: string | null;
  birthday: string | null;
  company_name: string | null;
  company_size: string | null;
  profession: string | null;
  website: string | null;
  university: string | null;
  graduation_year: string | null;
  marketing_opt_in: boolean;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
}
