import React from 'react';

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'sm' | 'md' | 'lg';
    underline?: boolean;
    children: React.ReactNode;
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
    ({ variant = 'text', size = 'md', underline = false, className = '', children, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

        const variants = {
            primary: 'text-primary hover:text-primary/80 focus:ring-primary',
            secondary: 'text-secondary hover:text-secondary/80 focus:ring-secondary',
            text: 'text-muted hover:text-text',
        };

        const sizes = {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        };

        const underlineStyle = underline ? 'underline' : 'no-underline';

        const classes = [
            baseStyles,
            variants[variant],
            sizes[size],
            underlineStyle,
            className,
        ].join(' ');

        return (
            <a ref={ref} className={classes} {...props}>
                {children}
            </a>
        );
    }
);

TextLink.displayName = 'TextLink';

export default TextLink;