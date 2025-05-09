import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  bgColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ width, bgColor, children, className, ...props }, ref) => {
    // Default padding when no width is provided
    const paddingClasses = width ? "" : "px-3";
    // Apply width class if provided
    const widthClass = width ? `w-${width}` : "";
    // Use provided background color or default to "background"
    const backgroundColorClass = bgColor ? `bg-${bgColor}` : "bg-background";

    return (
      <button
        ref={ref}
        className={clsx(
          backgroundColorClass,
          paddingClasses,
          widthClass,
          "font-medium inline-flex items-center justify-center rounded-md py-2 shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
