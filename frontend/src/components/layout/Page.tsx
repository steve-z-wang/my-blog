import React, { useEffect, useState } from "react";
import PageTransition from "./PageTransition";
import { FiChevronUp } from "react-icons/fi";
import ErrorBoundary from "./ErrorBoundary";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

// Page component controls the width of the page and includes ScrollToTopButton
const Page = ({ children, className = "" }: PageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ErrorBoundary>
      <PageTransition>
        <div className={`max-w-3xl mx-auto ${className}`}>{children}</div>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 text-surface bg-muted p-3 rounded-full shadow-lg transition"
          >
            <FiChevronUp size={24} />
          </button>
        )}
      </PageTransition>
    </ErrorBoundary>
  );
};

export default Page;
