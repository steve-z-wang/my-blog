// components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`p-6 bg-white rounded-md shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;