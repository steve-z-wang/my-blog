// components/Card.tsx
import React from "react";
import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => {
  return <section className={clsx("px-4 py-8", className)}>{children}</section>;
};

export default Section;
