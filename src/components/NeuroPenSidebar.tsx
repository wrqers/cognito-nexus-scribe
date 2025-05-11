
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
    `flex items-center gap-2 p-2 rounded-md transition-all ${
      isActive 
        ? "bg-neuropen-primary text-white font-medium" 
        : "hover:bg-neuropen-surface text-neuropen-text"
    }`;

  return (
    <Sidebar
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-neuropen-background border-r border-neuropen-border transition-all`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end text-neuropen-text" />

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neuropen-muted">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-neuropen-muted">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5" />
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
