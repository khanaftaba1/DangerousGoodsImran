"use client";

import { Accordion } from "@/components/ui";

interface ProgramFAQProps {
  items: { question: string; answer: string }[];
}

export default function ProgramFAQ({ items }: ProgramFAQProps) {
  return <Accordion items={items} />;
}
