import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-lg border border-emerald-100/50 backdrop-blur-sm',
        {
          'hover:shadow-xl hover:-translate-y-1 transition-all duration-300': hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
