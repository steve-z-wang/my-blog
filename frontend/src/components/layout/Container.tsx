// components/Container.tsx
import React from "react";
import PageTransition from "./PageTransition";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <PageTransition>
      <div className={`max-w-7xl mx-auto py-6 px-4 ${className}`}>
        {children}
      </div>
    </PageTransition>
  );
};

export default Container;
