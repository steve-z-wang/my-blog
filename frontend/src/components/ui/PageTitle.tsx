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
    <h1 className={`ml-4 lg:ml-0 mt-4 text-4xl font-bold ${className}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
