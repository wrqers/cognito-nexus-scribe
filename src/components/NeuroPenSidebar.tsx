
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  BookOpen, 
  FileText, 
  Brain, 
  LayoutDashboard, 
  Settings, 
  LibraryBig, 
  FlaskConical, 
  BookText 
} from "lucide-react";

export const NeuroPenSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const mainMenuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Knowledge Graph", url: "/graph", icon: Brain },
    { title: "Study Materials", url: "/materials", icon: LibraryBig },
    { title: "Notes", url: "/notes", icon: FileText },
    { title: "Reader", url: "/reader", icon: BookOpen },
  ];

  const toolsMenuItems = [
    { title: "Flashcards", url: "/flashcards", icon: BookText },
    { title: "Experiments", url: "/experiments", icon: FlaskConical },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-2 rounded-md transition-all ${
      isActive 
        ? "bg-white/10 text-neuropen-primary font-medium" 
        : "hover:bg-neuropen-surface-lighter text-neuropen-muted hover:text-neuropen-text"
    }`;

  return (
    <Sidebar
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-neuropen-surface border-r border-neuropen-border transition-all`}
      collapsible="icon"
    >
      <div className="flex items-center justify-center h-16 border-b border-neuropen-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gradient">NeuroPen</h1>
        )}
      </div>
      
      <SidebarTrigger className="m-2 self-end text-neuropen-muted hover:text-neuropen-text" />

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-neuropen-muted">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className={`h-5 w-5 ${!collapsed && "mr-2"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-neuropen-muted">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className={`h-5 w-5 ${!collapsed && "mr-2"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
