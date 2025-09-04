import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'info', 
  size = 'sm' 
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          // Variants
          'bg-emerald-100 text-emerald-800': variant === 'success',
          'bg-gold-100 text-gold-800': variant === 'warning',
          'bg-red-100 text-red-800': variant === 'error',
          'bg-royal-100 text-royal-800': variant === 'info',
          
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        }
      )}
    >
      {children}
    </span>
  );
};
