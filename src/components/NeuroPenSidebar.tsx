
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
  BookText,
  Sparkles,
  Lightbulb,
  BarChart3
} from "lucide-react";
import { openInNewTab } from "@/utils/navigation";

export const NeuroPenSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define which paths should open in a new tab
  const openInNewTabPaths = ['/graph', '/notes', '/reader', '/materials'];

  const mainMenuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Knowledge Graph", url: "/graph", icon: Brain },
    { title: "Study Materials", url: "/materials", icon: LibraryBig },
    { title: "Notes", url: "/notes", icon: FileText },
    { title: "Reader", url: "/reader", icon: BookOpen },
  ];

  const learningToolsItems = [
    { title: "Flashcards", url: "/flashcards", icon: BookText },
    { title: "Adaptive Flashcards", url: "/adaptive-flashcards", icon: BarChart3 },
    { title: "Metacognitive Insights", url: "/metacognitive-insights", icon: Sparkles },
    { title: "Intelligence Amplification", url: "/intelligence-amplification", icon: Lightbulb },
    { title: "Experiments", url: "/experiments", icon: FlaskConical },
  ];
  
  const systemItems = [
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const handleItemClick = (e: React.MouseEvent, url: string) => {
    if (openInNewTabPaths.includes(url)) {
      e.preventDefault();
      openInNewTab(url);
    }
  };

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
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      onClick={(e) => handleItemClick(e, item.url)}
                    >
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
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-neuropen-muted">Learning Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {learningToolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      onClick={(e) => handleItemClick(e, item.url)}
                    >
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
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-neuropen-muted">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      onClick={(e) => handleItemClick(e, item.url)}
                    >
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
