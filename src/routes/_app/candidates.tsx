import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Filter, Download, UserPlus, Mail, Phone, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/smarthire/StatusBadge";
import { GradientAvatar } from "@/components/smarthire/Avatar";
import { AIPanel } from "@/components/smarthire/AIPanel";
import { candidates, type Candidate } from "@/data/mock";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/candidates")({
  component: CandidatesPage,
  head: () => ({ meta: [{ title: "Candidates — SmartHire" }] }),
});

function CandidatesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Candidate | null>(null);

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.role.toLowerCase().includes(q.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(q.toLowerCase()));
      const matchS = status === "all" || c.status === status;
      return matchQ && matchS;
    });
  }, [q, status]);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Candidates</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage and review your entire talent pipeline.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" />Export</Button>
          <Button size="sm" className="gap-1.5" onClick={() => toast.success("Candidate added to pipeline")}><UserPlus className="h-4 w-4" />Add Candidate</Button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="card-elevated flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, role, or skill…" className="h-10 border-transparent bg-muted/40 pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10 w-[170px]"><Filter className="mr-1 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Shortlisted">Shortlisted</SelectItem>
              <SelectItem value="Interview Scheduled">Interview</SelectItem>
              <SelectItem value="Selected">Selected</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted"><Users className="h-6 w-6 text-muted-foreground" /></div>
            <div>
              <p className="font-display text-base font-semibold">No candidates match</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting search or filters.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setQ(""); setStatus("all"); }}>Clear filters</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Candidate</th>
                  <th className="px-5 py-3 text-left font-semibold">Role</th>
                  <th className="px-5 py-3 text-left font-semibold">Skills</th>
                  <th className="px-5 py-3 text-left font-semibold">Match</th>
                  <th className="px-5 py-3 text-left font-semibold">Status</th>
                  <th className="px-5 py-3 text-left font-semibold">Applied</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <GradientAvatar initials={c.initials} ci={c.ci} size="md" />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{c.role}</p>
                      <p className="text-xs text-muted-foreground">{c.exp} · {c.location}</p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.skills.slice(0, 3).map((s) => (
                          <Badge key={s} variant="secondary" className="rounded-md font-normal">{s}</Badge>
                        ))}
                        {c.skills.length > 3 && <Badge variant="outline" className="rounded-md font-normal">+{c.skills.length - 3}</Badge>}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full gradient-primary" style={{ width: `${c.aiScore}%` }} />
                        </div>
                        <span className="text-xs font-semibold tabular-nums">{c.aiScore}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3 text-muted-foreground">{c.date}</td>
                    <td className="px-5 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(c)}>View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl">
          {selected && (
            <div className="space-y-5">
              <DialogHeader className="text-left">
                <div className="flex items-start gap-4">
                  <GradientAvatar initials={selected.initials} ci={selected.ci} size="xl" />
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="font-display text-xl">{selected.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{selected.role} · {selected.exp}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{selected.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{selected.phone}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{selected.location}</span>
                    </div>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">About</p>
                    <p className="mt-1 text-sm">{selected.about}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Education</p>
                    <p className="mt-1 text-sm">{selected.education}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Previous Role</p>
                    <p className="mt-1 text-sm">{selected.previousRole}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {selected.skills.map((s) => <Badge key={s} variant="secondary" className="rounded-md">{s}</Badge>)}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={() => { toast.success("Interview scheduled"); setSelected(null); }}>Schedule Interview</Button>
                    <Button size="sm" variant="outline">Message</Button>
                  </div>
                </div>
                <AIPanel candidate={selected} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
