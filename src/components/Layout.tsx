
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NeuroPenSidebar } from "@/components/NeuroPenSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neuropen-background">
        <NeuroPenSidebar />
        <div className="flex-1 flex flex-col">
          <header
            className={`h-16 sticky top-0 z-10 transition-all duration-200 flex items-center justify-between px-4 ${
              scrolled 
                ? "bg-neuropen-surface/95 backdrop-blur-lg shadow-md" 
                : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8 text-neuropen-text hover:text-neuropen-primary transition-colors" />
              <h1 className="text-xl font-semibold text-gradient">NeuroPen</h1>
            </div>

            <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neuropen-muted" />
              <Input 
                placeholder="Search your knowledge..." 
                className="pl-10 bg-neuropen-surface-lighter border-neuropen-border focus-visible:ring-neuropen-primary w-full"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-neuropen-muted hover:text-neuropen-text">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-neuropen-highlight"></span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setDarkMode(!darkMode)}
                className="text-neuropen-muted hover:text-neuropen-text"
              >
                {darkMode ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />
                }
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="ml-2 hidden sm:flex border-neuropen-border bg-neuropen-surface-lighter hover:bg-neuropen-border hover:text-neuropen-text"
              >
                <span className="text-sm">Profile</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
