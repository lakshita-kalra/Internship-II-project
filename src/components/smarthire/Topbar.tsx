import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ChevronRight, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications, recruiter } from "@/data/mock";
import { GradientAvatar } from "./Avatar";
import { Badge } from "@/components/ui/badge";

const labels: Record<string, string> = {
  "": "Dashboard",
  candidates: "Candidates",
  jobs: "Jobs",
  interviews: "Interviews",
  "ai-insights": "AI Insights",
};

export function Topbar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = parts.length === 0 ? ["Dashboard"] : parts.map((p) => labels[p] ?? p);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="-ml-1" />

      <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm md:flex">
        <Link to="/" className="text-muted-foreground transition hover:text-foreground">SmartHire</Link>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className={i === crumbs.length - 1 ? "font-medium text-foreground" : "text-muted-foreground"}>{c}</span>
          </span>
        ))}
      </nav>

      <div className="relative ml-auto hidden max-w-xs flex-1 lg:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search candidates, jobs..."
          className="h-9 rounded-lg border-border bg-muted/50 pl-9 pr-14 text-sm shadow-none focus-visible:bg-background"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground xl:flex">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground">
            <Bell className="h-4.5 w-4.5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {unread}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="rounded-full text-[10px]">{unread} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="flex items-start gap-3 py-2.5">
                  <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-muted-foreground/30" : "bg-primary"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.msg}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground/70">{n.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-transparent p-1 pr-2 transition hover:border-border hover:bg-muted">
            <GradientAvatar initials={recruiter.initials} ci={0} size="sm" />
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight">{recruiter.name}</p>
              <p className="text-[11px] leading-tight text-muted-foreground">Recruiter</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold">{recruiter.name}</p>
              <p className="text-xs font-normal text-muted-foreground">{recruiter.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Team settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
