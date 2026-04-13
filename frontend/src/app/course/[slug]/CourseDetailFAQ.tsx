"use client";

import { Accordion } from "@/components/ui";

interface CourseDetailFAQProps {
  items: { question: string; answer: string }[];
}

export default function CourseDetailFAQ({ items }: CourseDetailFAQProps) {
  return <Accordion items={items} />;
}
