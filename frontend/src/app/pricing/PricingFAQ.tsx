"use client";

import { Accordion } from "@/components/ui";

interface PricingFAQProps {
  items: { question: string; answer: string }[];
}

export default function PricingFAQ({ items }: PricingFAQProps) {
  return <Accordion items={items} />;
}
