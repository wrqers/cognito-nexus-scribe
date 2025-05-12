
import React, { useState, useEffect, useRef } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NeuroPenSidebar } from "@/components/NeuroPenSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { gsap } from 'gsap';
import { AnimatedIcon } from './icons/AnimatedIcon';
import { toast } from '@/hooks/use-toast';
import { AnimatedWrapper } from './AnimatedWrapper';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  
  // Initialize animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    // Create the parallax background dots effect
    const dotContainer = document.createElement('div');
    dotContainer.className = 'fixed inset-0 pointer-events-none bg-dot-pattern opacity-20 z-0';
    document.body.appendChild(dotContainer);
    
    return () => {
      document.body.removeChild(dotContainer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: darkMode ? "Switched to light theme" : "Switched to dark theme",
      duration: 2000,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neuropen-background">
        <NeuroPenSidebar />
        <div className="flex-1 flex flex-col">
          <header
            ref={headerRef}
            className={`h-16 sticky top-0 z-10 transition-all duration-500 flex items-center justify-between px-4 ${
              scrolled 
                ? "bg-neuropen-surface/90 backdrop-blur-lg shadow-lg border-b border-white/5" 
                : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8 text-neuropen-text hover:text-neuropen-primary transition-colors" />
              <AnimatedWrapper type="fade-in" duration={0.8}>
                <h1 className="text-xl font-semibold text-gradient relative">
                  NeuroPen
                  <span className="absolute -top-1 -right-2 h-1.5 w-1.5 rounded-full bg-neuropen-accent-purple animate-pulse-glow"></span>
                </h1>
              </AnimatedWrapper>
            </div>

            <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neuropen-muted" />
              <Input 
                placeholder="Search your knowledge..." 
                className="pl-10 bg-neuropen-surface-lighter border-neuropen-border focus-visible:ring-neuropen-primary focus:ring-neuropen-accent-blue w-full transition-all duration-300 focus:shadow-[0_0_10px_rgba(30,174,219,0.3)]"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <AnimatedIcon animateOnHover="pulse" hoverColor="#9b87f5">
                <Button variant="ghost" size="icon" className="relative text-neuropen-muted hover:text-neuropen-text transition-colors duration-300">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-neuropen-accent-purple"></span>
                </Button>
              </AnimatedIcon>
              
              <AnimatedIcon animateOnHover="spin" hoverColor="#1EAEDB">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleThemeToggle}
                  className="text-neuropen-muted hover:text-neuropen-text"
                >
                  {darkMode ? 
                    <Sun className="h-5 w-5" /> : 
                    <Moon className="h-5 w-5" />
                  }
                </Button>
              </AnimatedIcon>
              
              <Button 
                variant="outline" 
                size="sm"
                className="ml-2 hidden sm:flex border-neuropen-border bg-neuropen-surface-lighter hover:bg-neuropen-border hover:text-neuropen-text transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              >
                <span className="text-sm">Profile</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto relative z-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
