// components/Container.tsx
import React from "react";
import PageTransition from "./PageTransition";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page = ({ children, className = "" }: PageProps) => {
  return (
    <PageTransition>
      <div className={`max-w-3xl mx-auto ${className}`}>{children}</div>
    </PageTransition>
  );
};

export default Page;
