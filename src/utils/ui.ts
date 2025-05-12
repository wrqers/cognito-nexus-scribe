
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { gsap } from 'gsap';

/**
 * Combines class names with Tailwind's merge utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a ripple effect on a button or clickable element
 */
export const createRippleEffect = (event: React.MouseEvent<HTMLElement>) => {
  const element = event.currentTarget;
  
  // Create ripple element
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  // Style the ripple
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('absolute', 'rounded-full', 'bg-white/20', 'pointer-events-none', 'animate-ripple', 'z-10');
  
  // Make sure the button has relative positioning
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  
  element.appendChild(ripple);
  
  // Remove the ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 1000);
};

/**
 * Animate text typing effect
 */
export const animateTextTyping = (element: HTMLElement, text: string, speed: number = 50) => {
  let index = 0;
  element.textContent = '';
  
  const typeChar = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, speed);
    }
  };
  
  typeChar();
};

/**
 * Create parallax mouse movement effect
 */
export const createParallaxEffect = (selector: string, depth: number = 0.05) => {
  const elements = document.querySelectorAll(selector);
  
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const distanceX = (clientX - centerX) / centerX;
    const distanceY = (clientY - centerY) / centerY;
    
    elements.forEach((element, index) => {
      const elementDepth = depth * (index % 3 + 1);
      gsap.to(element, {
        x: distanceX * 20 * elementDepth,
        y: distanceY * 20 * elementDepth,
        duration: 1,
        ease: "power2.out"
      });
    });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Return cleanup function
  return () => window.removeEventListener('mousemove', handleMouseMove);
};

/**
 * Animate number count up/down
 */
export const animateNumber = (
  element: HTMLElement, 
  start: number, 
  end: number, 
  duration: number = 1,
  prefix: string = '',
  suffix: string = ''
) => {
  gsap.fromTo(
    element, 
    { textContent: start }, 
    {
      textContent: end,
      duration,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(Number(element.textContent))}${suffix}`;
      }
    }
  );
};

/**
 * Create a hover glow effect
 */
export const createHoverGlowEffect = (element: HTMLElement, color: string = 'rgba(255,255,255,0.2)') => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    element.style.background = `radial-gradient(circle at ${x}px ${y}px, ${color}, transparent 50%)`;
  };
  
  const handleMouseLeave = () => {
    element.style.background = '';
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Create a floating animation for elements
 */
export const createFloatingAnimation = (element: HTMLElement, intensity: number = 1) => {
  const randomOffset = Math.random() * 2 - 1;
  
  gsap.to(element, {
    y: `+=${10 * intensity}`,
    duration: 2 + Math.random() * 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: randomOffset
  });
  
  // Optional: add slight rotation for more organic movement
  gsap.to(element, {
    rotation: randomOffset * 2,
    duration: 3 + Math.random() * 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: randomOffset
  });
};

/**
 * Trigger animations when elements enter viewport
 */
export const createScrollTrigger = (selector: string, animationType: 'fade' | 'slide' | 'scale' = 'fade') => {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          switch (animationType) {
            case 'fade':
              gsap.fromTo(
                element,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
              );
              break;
              
            case 'slide':
              gsap.fromTo(
                element,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
              );
              break;
              
            case 'scale':
              gsap.fromTo(
                element,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
              );
              break;
          }
          
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  elements.forEach((element) => {
    observer.observe(element);
  });
  
  // Return cleanup function
  return () => {
    elements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};
