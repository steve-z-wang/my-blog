import React from 'react';

type ClickableTextVariant = 'muted' | 'primary';
type ClickableTextSize = 'sm' | 'md';

interface ClickableTextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ClickableTextVariant;
    size?: ClickableTextSize;
    className?: string;
}

export const ClickableText: React.FC<ClickableTextProps> = ({
    variant = 'muted',
    size,
    children,
    className = '',
    ...props
}) => {
    const base = 'bg-transparent border-none p-0 cursor-pointer transition-colors duration-150';

    const variants = {
        muted: 'text-muted hover:text-text focus-visible:text-text',
        primary: 'text-primary hover:underline',
    };

    const sizes = {
        sm: 'text-sm',
        md: 'text-base',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${size ? sizes[size] : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};