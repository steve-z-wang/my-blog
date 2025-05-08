// components/Container.tsx
import React from "react";
import PageTransition from "./PageTransition";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

// Page component controls the width of the page

const Page = ({ children, className = "" }: PageProps) => {
  return (
    <PageTransition>
      <div className={`max-w-3xl mx-auto ${className}`}>{children}</div>
    </PageTransition>
  );
};

export default Page;
