import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Briefcase, CalendarClock, Sparkles, Settings, LifeBuoy } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Candidates", url: "/candidates", icon: Users },
  { title: "Jobs", url: "/jobs", icon: Briefcase },
  { title: "Interviews", url: "/interviews", icon: CalendarClock },
  { title: "AI Insights", url: "/ai-insights", icon: Sparkles },
];

const secondary = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Support", url: "/support", icon: LifeBuoy },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (u: string) => (u === "/" ? pathname === "/" : pathname.startsWith(u));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-primary shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="font-display text-base font-bold leading-tight tracking-tight">SmartHire</p>
            <p className="text-[11px] text-muted-foreground">Recruitment OS</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="rounded-xl bg-gradient-to-br from-primary-soft to-accent p-3 text-xs group-data-[collapsible=icon]:hidden">
          <p className="font-semibold text-accent-foreground">SmartHire Pro</p>
          <p className="mt-1 text-muted-foreground">Unlock advanced AI insights and unlimited pipelines.</p>
          <button className="mt-2 w-full rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            Upgrade
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
