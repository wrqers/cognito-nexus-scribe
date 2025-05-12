
import React, { useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { gsap } from "gsap";

interface AnimatedProgressProps extends React.ComponentProps<typeof Progress> {
  label?: string;
  sublabel?: string;
  animationDelay?: number;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value = 0,
  label,
  sublabel,
  className,
  animationDelay = 0,
  ...props
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = React.useState(0);
  
  // Animate the progress bar on mount
  useEffect(() => {
    // Animate the value counter
    gsap.to({ val: 0 }, {
      val: value,
      duration: 1.5,
      delay: animationDelay,
      ease: "power2.out",
      onUpdate: function() {
        setDisplayValue(Math.round(this.targets()[0].val));
      }
    });
    
    // Add a shine animation to the progress bar
    const progressBar = progressRef.current;
    if (progressBar) {
      const indicator = progressBar.querySelector("[data-indicator]");
      if (indicator) {
        gsap.fromTo(
          indicator,
          { 
            width: "0%" 
          },
          {
            width: `${value}%`,
            duration: 1.5,
            delay: animationDelay,
            ease: "power2.out",
            onComplete: () => {
              // Add a shine effect after the bar fills
              const shine = document.createElement("div");
              shine.className = "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent";
              shine.style.animation = "shine 2s ease-in-out";
              indicator.appendChild(shine);
              
              setTimeout(() => {
                shine.remove();
              }, 2000);
            }
          }
        );
      }
    }
  }, [value, animationDelay]);
  
  return (
    <div className="space-y-1.5">
      {(label || sublabel) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-neuropen-text">{label}</span>}
          {sublabel && <span className="text-xs text-neuropen-muted">{sublabel}</span>}
        </div>
      )}
      <div className="relative" ref={progressRef}>
        <Progress
          value={displayValue}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
};
