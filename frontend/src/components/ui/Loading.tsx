import React from "react";
import Page from "../layout/Page";
import Section from "../layout/Section";

interface LoadingProps {
  message?: string;
  className?: string;
}

/**
 * Loading component to display a consistent loading state across the application
 * Always renders as a full page to provide a seamless user experience
 */
const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading...", 
}) => {
  return (
    <Page>
      <Section className="flex items-center justify-center">
          <p className="text-muted">{message}</p>
      </Section>
    </Page>
  );
};

export default Loading;