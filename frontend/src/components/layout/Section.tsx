// components/Card.tsx
import React from "react";
import clsx from "clsx";
import ErrorBoundary from "./ErrorBoundary";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  hasHorizontalPadding?: boolean;
}

/**
 * Section component controls:
 * 1. The x distance between content and the edge of the screen
 * 2. The y distance between each section
 */

const Section = ({
  children,
  className = "",
  hasHorizontalPadding = true,
}: SectionProps) => {
  return (
    <section
      className={clsx(
        "py-8",
        hasHorizontalPadding ? "px-4 lg:px-0" : "",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
