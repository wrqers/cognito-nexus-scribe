
import { gsap } from 'gsap';

/**
 * Apply a staggered fade-in animation to a set of elements
 */
export const staggerFadeIn = (
  elements: HTMLElement[] | NodeListOf<Element>,
  options = {
    y: 20,
    delay: 0,
    duration: 0.5,
    staggerDelay: 0.1,
    ease: 'power2.out'
  }
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: options.y },
    {
      opacity: 1,
      y: 0,
      duration: options.duration,
      stagger: options.staggerDelay,
      delay: options.delay,
      ease: options.ease,
      clearProps: 'all'
    }
  );
};

/**
 * Apply a fade-in animation to an element
 */
export const fadeIn = (
  element: HTMLElement | null,
  options = {
    y: 10,
    delay: 0,
    duration: 0.5,
    ease: 'power2.out'
  }
) => {
  if (!element) return null;
  
  return gsap.fromTo(
    element,
    { opacity: 0, y: options.y },
    {
      opacity: 1,
      y: 0,
      duration: options.duration,
      delay: options.delay,
      ease: options.ease,
      clearProps: 'all'
    }
  );
};

/**
 * Apply a page transition animation
 */
export const pageTransition = (
  container: HTMLElement | null,
  options = {
    duration: 0.5,
    ease: 'power2.inOut'
  }
) => {
  if (!container) return null;
  
  // Timeline for page transition
  const tl = gsap.timeline();
  
  tl.fromTo(
    container,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration,
      ease: options.ease,
    }
  );
  
  return tl;
};

/**
 * Create a parallax mouse movement effect
 */
export const createParallaxEffect = (selector: string, depth = 0.05) => {
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
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};
