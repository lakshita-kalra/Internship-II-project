import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Plus, MapPin, Users, Clock, Wallet, Building2, CalendarDays, Zap, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/smarthire/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobs } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/jobs")({
  component: JobsPage,
  head: () => ({ meta: [{ title: "Jobs — SmartHire" }] }),
});

function JobsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");

  const filtered = useMemo(() => jobs.filter(j =>
    (!q || j.title.toLowerCase().includes(q.toLowerCase())) &&
    (dept === "all" || j.dept === dept),
  ), [q, dept]);

  const depts = Array.from(new Set(jobs.map(j => j.dept)));

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Jobs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Post, track, and manage open positions across the company.</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => toast.success("New job draft created")}><Plus className="h-4 w-4" />Post New Job</Button>
      </div>

      <div className="card-elevated flex flex-col gap-3 p-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search jobs…" className="h-10 border-transparent bg-muted/40 pl-9" />
        </div>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="h-10 w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {depts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="card-elevated flex flex-col items-center gap-3 p-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted"><Briefcase className="h-6 w-6 text-muted-foreground" /></div>
          <p className="font-display text-base font-semibold">No jobs found</p>
          <p className="text-sm text-muted-foreground">Try a different search.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(job => (
            <article key={job.id} className="card-elevated group flex flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-bold leading-tight">{job.title}</h3>
                    {job.urgent && (
                      <Badge className="gap-0.5 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300">
                        <Zap className="h-3 w-3" />Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />{job.dept}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5" />{job.type}</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Wallet className="h-3.5 w-3.5" />{job.salary}</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{job.deadline}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {job.requirements.slice(0, 3).map(r => <Badge key={r} variant="secondary" className="rounded-md font-normal">{r}</Badge>)}
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{job.count}</span>
                  <span className="text-muted-foreground">applicants</span>
                </div>
                <Button size="sm" variant="ghost" className="text-xs">View Details</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
