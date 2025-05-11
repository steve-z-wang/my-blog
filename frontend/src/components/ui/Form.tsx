import React, { useEffect, useRef } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  className?: string;
  autoFocus?: boolean;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  error,
  className = "",
  autoFocus = true,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (autoFocus && formRef.current) {
      // Focus the first input, textarea or select in the form
      const firstInput = formRef.current.querySelector(
        "input, textarea, select"
      ) as HTMLElement;
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [autoFocus]);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={`space-y-4 ${className}`}
      {...props}
    >
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {children}
    </form>
  );
};

export default Form;
