
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TiltCardProps extends React.ComponentProps<typeof Card> {
  intensity?: number;
  glare?: boolean;
  children: React.ReactNode;
  perspective?: number;
}

export const TiltCard = ({ 
  intensity = 15, 
  glare = true, 
  perspective = 1000,
  children, 
  className,
  ...props 
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const glareElement = glareRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      // Calculate tilt effect
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const tiltX = (mouseY / (rect.height / 2)) * intensity;
      const tiltY = -((mouseX / (rect.width / 2)) * intensity);
      
      // Apply tilt with GSAP
      gsap.to(card, {
        rotationX: tiltX,
        rotationY: tiltY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: perspective,
      });
      
      // Update glare effect if enabled
      if (glare && glareElement) {
        const glareX = (mouseX / rect.width) * 100 + 50;
        const glareY = (mouseY / rect.height) * 100 + 50;
        
        gsap.to(glareElement, {
          opacity: 0.15,
          x: `${glareX}%`,
          y: `${glareY}%`,
          duration: 0.5,
        });
      }
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
      
      if (glare && glareElement) {
        gsap.to(glareElement, {
          opacity: 0,
          duration: 0.7,
        });
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, glare, perspective]);
  
  return (
    <Card 
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transform-style-3d",
        className
      )}
      {...props}
    >
      {children}
      {glare && (
        <div 
          ref={glareRef}
          className="absolute inset-0 pointer-events-none bg-gradient-radial from-white/20 to-transparent opacity-0 rounded-lg"
          style={{width: '200%', height: '200%', transform: 'translate(-50%, -50%)'}}
        />
      )}
    </Card>
  );
};
