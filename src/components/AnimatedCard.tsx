
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  animateOnScroll?: boolean;
  animationType?: 'fade-in' | 'slide-up' | 'zoom-in' | 'none';
  delay?: number;
  glowOnHover?: boolean;
  children: React.ReactNode;
}

export const AnimatedCard = ({
  animateOnScroll = true,
  animationType = 'fade-in',
  delay = 0,
  glowOnHover = true,
  children,
  className,
  ...props
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current || !animateOnScroll) return;
    
    const card = cardRef.current;
    let animation: gsap.core.Tween;
    
    const animateCard = () => {
      switch (animationType) {
        case 'fade-in':
          animation = gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              delay, 
              ease: 'power3.out',
              clearProps: 'all' 
            }
          );
          break;
          
        case 'slide-up':
          animation = gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              delay, 
              ease: 'power3.out',
              clearProps: 'all' 
            }
          );
          break;
          
        case 'zoom-in':
          animation = gsap.fromTo(
            card,
            { opacity: 0, scale: 0.9 },
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.7, 
              delay, 
              ease: 'back.out(1.7)',
              clearProps: 'all' 
            }
          );
          break;
      }
    };
    
    // Observer for scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCard();
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
    
    return () => {
      animation?.kill();
      observer.unobserve(card);
    };
  }, [animationType, animateOnScroll, delay]);
  
  return (
    <Card
      ref={cardRef}
      className={cn(
        className,
        glowOnHover && "hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow duration-300",
        "overflow-hidden"
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export { CardContent, CardDescription, CardHeader, CardTitle, CardFooter };
