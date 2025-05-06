import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  error,
  className = '',
  ...props
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={`space-y-4 ${className}`}
      {...props}
    >
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      {children}
    </form>
  );
};

export default Form; 