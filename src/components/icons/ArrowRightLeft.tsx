
import React, { useState } from 'react';
import { LucideProps } from 'lucide-react';

export const ArrowRightLeft = (props: LucideProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transition-all duration-300 ${isHovered ? 'text-neuropen-primary' : ''}`}
      {...props}
    >
      <path
        d="m16 3 4 4-4 4"
        className={`transition-transform origin-center duration-300 ${isHovered ? 'translate-x-0.5' : ''}`}
      />
      <path
        d="M20 7H4"
        className="transition-opacity duration-300"
      />
      <path
        d="m8 21-4-4 4-4"
        className={`transition-transform origin-center duration-300 ${isHovered ? '-translate-x-0.5' : ''}`}
      />
      <path
        d="M4 17h16"
        className="transition-opacity duration-300"
      />
    </svg>
  );
};

export default ArrowRightLeft;
