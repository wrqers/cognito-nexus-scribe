
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NeuroPenSidebar } from "@/components/NeuroPenSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="min-h-screen flex w-full bg-neuropen-background">
        <NeuroPenSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 bg-neuropen-surface/80 border-b border-neuropen-border flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8 text-neuropen-text" />
              <h1 className="text-lg font-semibold text-neuropen-text">NeuroPen</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
