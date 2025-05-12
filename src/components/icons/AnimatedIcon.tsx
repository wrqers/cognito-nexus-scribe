
import React, { useState } from 'react';
import { LucideProps } from 'lucide-react';

interface AnimatedIconProps extends LucideProps {
  hoverColor?: string;
  animateOnHover?: "pulse" | "bounce" | "spin" | "none";
}

export const AnimatedIcon = ({ 
  hoverColor = "currentColor",
  animateOnHover = "none",
  children,
  ...props 
}: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getAnimationClass = () => {
    if (!isHovered) return "";
    
    switch (animateOnHover) {
      case "pulse":
        return "animate-[pulse_1s_ease-in-out_infinite]";
      case "bounce":
        return "animate-[bounce_1s_ease-in-out_infinite]";
      case "spin":
        return "animate-[spin_2s_linear_infinite]";
      default:
        return "";
    }
  };
  
  return (
    <div 
      className={`transition-colors duration-300 ${getAnimationClass()}`}
      style={{ color: isHovered ? hoverColor : "currentColor" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};
