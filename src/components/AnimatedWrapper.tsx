
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type AnimationType = 
  | "fade-in" 
  | "slide-up" 
  | "slide-in-right" 
  | "scale-in" 
  | "stagger-fade";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  type: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: string;
  staggerDelay?: number;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ 
  children, 
  type, 
  delay = 0,
  duration = 0.5,
  className = "",
  staggerChildren,
  staggerDelay = 0.1
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    let animation;
    
    switch (type) {
      case "fade-in":
        animation = gsap.fromTo(
          element,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
        );
        break;
        
      case "slide-up":
        animation = gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
        );
        break;
        
      case "slide-in-right":
        animation = gsap.fromTo(
          element,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration, delay, ease: "power2.out" }
        );
        break;
        
      case "scale-in":
        animation = gsap.fromTo(
          element,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" }
        );
        break;
        
      case "stagger-fade":
        if (staggerChildren) {
          animation = gsap.fromTo(
            element.querySelectorAll(staggerChildren),
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration, 
              stagger: staggerDelay,
              delay, 
              ease: "power2.out" 
            }
          );
        }
        break;
    }
    
    return () => {
      animation?.kill();
    };
  }, [type, delay, duration, staggerChildren, staggerDelay]);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
