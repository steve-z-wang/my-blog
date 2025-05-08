import React from "react";
import {
  buttonClass,
  ButtonVariant,
  ButtonSize,
} from "../../styles/buttonClass";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClass({ variant, size, fullWidth })}
      {...props}
    ></button>
  )
);

export default Button;
