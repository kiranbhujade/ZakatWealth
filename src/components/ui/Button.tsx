import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          // Variants
          'bg-emerald-950 text-parchment-50 hover:bg-emerald-800 focus:ring-emerald-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5': variant === 'primary',
          'bg-gold-950 text-emerald-950 hover:bg-gold-800 focus:ring-gold-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5': variant === 'secondary',
          'border-2 border-emerald-950 text-emerald-950 hover:bg-emerald-950 hover:text-parchment-50 focus:ring-emerald-500': variant === 'outline',
          'text-emerald-950 hover:bg-emerald-50 focus:ring-emerald-500': variant === 'ghost',
          
          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
