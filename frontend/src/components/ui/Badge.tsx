import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "brand" | "dark";
  className?: string;
}

const variants = {
  default: "bg-light-bg text-text-dark",
  brand: "bg-brand/10 text-brand-dark",
  dark: "bg-dark text-text-light",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
