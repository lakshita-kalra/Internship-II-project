import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Briefcase, CalendarClock, TrendingUp, Plus, UserPlus, FileText, ArrowRight, MapPin, Video, MonitorSmartphone } from "lucide-react";
import { StatCard } from "@/components/smarthire/StatCard";
import { GradientAvatar } from "@/components/smarthire/Avatar";
import { StatusBadge } from "@/components/smarthire/StatusBadge";
import { AIPanel } from "@/components/smarthire/AIPanel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { recruiter, activity, interviews, pipeline, monthlyData, sources } from "@/data/mock";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Line, LineChart } from "recharts";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — SmartHire" }] }),
});

function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const totalPipeline = pipeline.reduce((s, p) => s + p.count, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome */}
      <div className="card-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-soft via-accent/50 to-transparent" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <GradientAvatar initials={recruiter.initials} ci={0} size="xl" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{today}</p>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {recruiter.name.split(" ")[0]} 👋
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                You have <span className="font-semibold text-foreground">2 interviews</span> today and{" "}
                <span className="font-semibold text-foreground">14 new candidates</span> waiting for review.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Post Job</Button>
            <Button size="sm" variant="outline" className="gap-1.5 bg-background/60"><UserPlus className="h-4 w-4" />Add Candidate</Button>
            <Button size="sm" variant="outline" className="gap-1.5 bg-background/60"><FileText className="h-4 w-4" />Reports</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Candidates" value="1,284" icon={Users} delta={12} hint="vs last month" tone="primary" />
        <StatCard label="Active Jobs" value="24" icon={Briefcase} delta={4} hint="6 urgent" tone="info" />
        <StatCard label="Interviews This Week" value="18" icon={CalendarClock} delta={-3} hint="2 today" tone="warning" />
        <StatCard label="Hired This Month" value="14" icon={TrendingUp} delta={22} hint="above target" tone="success" />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold">Applications & Hires</h3>
              <p className="text-xs text-muted-foreground">Last 7 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[var(--color-chart-1)]" />Applications</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[var(--color-chart-3)]" />Hired</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={monthlyData} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="apps" fill="var(--color-chart-1)" radius={[6,6,0,0]} />
                <Bar dataKey="hired" fill="var(--color-chart-3)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="mb-4">
            <h3 className="font-display text-base font-bold">Hiring Pipeline</h3>
            <p className="text-xs text-muted-foreground">{totalPipeline} candidates in flow</p>
          </div>
          <div className="space-y-3.5">
            {pipeline.map((p) => {
              const pct = Math.round((p.count / totalPipeline) * 100);
              return (
                <div key={p.stage}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{p.stage}</span>
                    <span className="tabular-nums text-muted-foreground">{p.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: p.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity + Interviews + AI */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-bold">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">View all<ArrowRight className="h-3 w-3" /></Button>
          </div>
          <ul className="space-y-4">
            {activity.slice(0, 5).map((a) => (
              <li key={a.id} className="flex gap-3">
                <div className="relative">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    a.kind === "selected" ? "bg-emerald-100 text-emerald-700" :
                    a.kind === "rejected" ? "bg-rose-100 text-rose-700" :
                    a.kind === "interview" ? "bg-amber-100 text-amber-700" :
                    a.kind === "shortlisted" ? "bg-blue-100 text-blue-700" :
                    a.kind === "offer" ? "bg-violet-100 text-violet-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>{a.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">
                    <span className="text-muted-foreground">{a.text} </span>
                    <span className="font-semibold">{a.name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.role} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-bold">Upcoming Interviews</h3>
            <Link to="/interviews" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">View all<ArrowRight className="h-3 w-3" /></Link>
          </div>
          <ul className="space-y-3">
            {interviews.filter(i => i.status === "Scheduled").slice(0, 4).map((iv) => (
              <li key={iv.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-2.5 transition hover:bg-muted/50">
                <GradientAvatar initials={iv.initials} ci={iv.ci} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{iv.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{iv.round} · with {iv.with}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-foreground">{iv.day}</p>
                  <p className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                    {iv.mode === "Video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                    {iv.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <AIPanel />
      </div>

      {/* Sources */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-display text-base font-bold">Hiring Trend</h3>
            <p className="text-xs text-muted-foreground">Applications velocity</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Line type="monotone" dataKey="apps" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-elevated p-5">
          <h3 className="font-display text-base font-bold">Candidate Sources</h3>
          <p className="text-xs text-muted-foreground">Where they come from</p>
          <div className="mt-4 space-y-3">
            {sources.map((s, i) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="tabular-nums text-muted-foreground">{s.count} · {s.pct}%</span>
                </div>
                <Progress value={s.pct * 2.5} className="h-1.5" style={{ ["--progress-fg" as any]: `var(--color-chart-${i+1})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
