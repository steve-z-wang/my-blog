import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageTitle component for consistent heading styles across the application
 */
export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h1 className={`mx-4 lg:mx-0 mt-4 text-4xl font-bold ${className}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
