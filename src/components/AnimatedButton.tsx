
import React from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  glowOnHover?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className, 
  glowOnHover = true,
  ...props 
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (!buttonRef.current || !glowOnHover) return;
    
    const button = buttonRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.03,
        duration: 0.2,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.in"
      });
    };
    
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [glowOnHover]);
  
  return (
    <Button
      ref={buttonRef}
      className={cn(
        glowOnHover && "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
      {glowOnHover && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 -z-10 hover:animate-[shine_1.5s_ease-in-out_infinite] pointer-events-none" />
      )}
    </Button>
  );
};
