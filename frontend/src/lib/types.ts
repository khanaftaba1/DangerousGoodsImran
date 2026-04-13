export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  course_content: string[] | null;
  price: number | null;
  price_incl_vat: number | null;
  currency: string;
  level: string;
  study_time: string;
  has_exam: boolean;
  exam_type: string;
  has_certificate: boolean;
  author: string;
  image_url: string;
  layout_variant: "meta_bar" | "sidebar";
  show_lesson_series_badge: boolean;
  learning_objectives: string[] | null;
  faq: { question: string; answer: string }[] | null;
  trainer_bio: string;
  published: boolean;
  sort_order: number;
}

export interface Plan {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  billing_period: string;
  features: string[];
  typical_use_cases: string[] | null;
  faq: { question: string; answer: string }[] | null;
}

export interface Profile {
  id: string;
  full_name: string;
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
  status: string;
  progress: number;
  completed_at: string | null;
  certificate_url: string | null;
}
