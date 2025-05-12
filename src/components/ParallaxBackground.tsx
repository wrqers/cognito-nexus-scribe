
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

interface ParallaxBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSizeMin?: number;
  particleSizeMax?: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  className = 'absolute inset-0 pointer-events-none',
  particleCount = 20,
  particleColor = 'bg-white/5',
  particleSizeMin = 1,
  particleSizeMax = 4
}) => {
  useEffect(() => {
    // Create container for particles
    const container = document.createElement('div');
    container.className = className;
    document.querySelector('main')?.appendChild(container);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * (particleSizeMax - particleSizeMin) + particleSizeMin;
      
      particle.className = `absolute rounded-full ${particleColor}`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
      
      gsap.to(particle, {
        y: -100 - Math.random() * 200,
        x: Math.random() * 50 - 25,
        opacity: 0,
        duration: 5 + Math.random() * 10,
        repeat: -1,
        delay: Math.random() * 5,
        ease: "none",
        yoyo: true
      });
    }
    
    return () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, [className, particleCount, particleColor, particleSizeMin, particleSizeMax]);
  
  return null;
};
