
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { AnimatedIcon } from './icons/AnimatedIcon';

interface ScrollToTopButtonProps {
  threshold?: number;
  right?: number;
  bottom?: number;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ 
  threshold = 300,
  right = 20,
  bottom = 20
}) => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    // Animate scroll to top with GSAP
    gsap.to(window, {
      scrollTo: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return visible ? (
    <div 
      className="fixed z-50 transition-all duration-300"
      style={{ 
        right: `${right}px`, 
        bottom: `${bottom}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <AnimatedIcon animateOnHover="bounce" hoverColor="#9b87f5">
        <Button 
          onClick={scrollToTop}
          size="icon"
          className="rounded-full bg-neuropen-surface border border-neuropen-border hover:bg-neuropen-surface-lighter shadow-lg"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </AnimatedIcon>
    </div>
  ) : null;
};
