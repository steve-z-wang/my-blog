import React, { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import ErrorBoundary from "./ErrorBoundary";
import { useLocation } from "react-router-dom";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

// Page component controls the width of the page, includes transitions, and ScrollToTopButton
const Page = ({ children, className = "" }: PageProps) => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const location = useLocation();
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Scroll button visibility effect
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Page transition effect
  useEffect(() => {
    // Hide content
    setIsPageVisible(false);

    // Show content after a brief delay
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`transition-opacity duration-300 ${
        isPageVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`max-w-3xl mx-auto ${className}`}>{children}</div>
      {isScrollButtonVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-accent p-3 rounded-full shadow-lg transition"
        >
          <FiChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Page;
