
import React from 'react';
import { cn } from '@/lib/utils';

interface NeuropenLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
}

export const NeuropenLoader = ({ 
  className, 
  size = 'md', 
  variant = 'primary' 
}: NeuropenLoaderProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };
  
  const variantClasses = {
    primary: 'text-neuropen-primary',
    secondary: 'text-neuropen-accent-blue',
    accent: 'text-neuropen-accent-purple'
  };
  
  return (
    <div className="flex items-center justify-center">
      <svg
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2a4 4 0 014-4v2a2 2 0 00-2 2h2a0 0 010 0v-2a2 2 0 012 2h-2a4 4 0 01-4-4h-2a6 6 0 006 6v-2a8 8 0 01-8-8z"
        />
      </svg>
    </div>
  );
};
