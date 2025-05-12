
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionType?: 'fade' | 'slide' | 'zoom' | 'none';
}

export const PageTransition = ({ 
  children, 
  transitionType = 'fade' 
}: PageTransitionProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (!pageRef.current) return;
    
    const element = pageRef.current;
    
    // Initial animation based on transition type
    switch (transitionType) {
      case 'fade':
        gsap.fromTo(
          element,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.inOut' }
        );
        break;
        
      case 'slide':
        gsap.fromTo(
          element,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
        break;
        
      case 'zoom':
        gsap.fromTo(
          element,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }
        );
        break;
    }
    
    return () => {
      gsap.killTweensOf(element);
    };
  }, [location.pathname, transitionType]);
  
  return (
    <div ref={pageRef} className="min-h-full w-full">
      {children}
    </div>
  );
};
