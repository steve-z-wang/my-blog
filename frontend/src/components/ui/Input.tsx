import React from "react";

interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

interface InputProps extends BaseInputProps {
  type?: "text" | "email" | "password" | "number";
  multiline?: false;
}

interface TextAreaProps extends BaseInputProps {
  multiline: true;
  rows?: number;
}

type CombinedInputProps = InputProps | TextAreaProps;

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CombinedInputProps
>((props, ref) => {
  const { label, error, className = "", multiline = false, ...rest } = props;

  const baseInputStyles =
    "w-full px-3 py-2 border border-gray-200 rounded-md text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition-colors duration-200";

  const inputClasses = [
    baseInputStyles,
    error ? "border-red-500" : "",
    className,
  ].join(" ");

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          rows={(props as TextAreaProps).rows || 3}
          className={inputClasses}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          className={inputClasses}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
