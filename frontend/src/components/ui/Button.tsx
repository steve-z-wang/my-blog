import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ bgColor, children, className, ...props }, ref) => {
    const backgroundColorClass = bgColor ? `bg-${bgColor}` : "bg-primary";

    return (
      <button
        ref={ref}
        className={clsx(
          backgroundColorClass,
          "font-medium inline-flex items-center justify-center rounded-md py-2 px-3 shadow-md hover:shadow-lg",
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
