import React from "react";

interface LoadingProps {
  message?: string;
  className?: string;
}

/**
 * Loading component to display a consistent loading state across the application
 */
const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <p className="text-muted">{message}</p>
    </div>
  );
};

export default Loading;