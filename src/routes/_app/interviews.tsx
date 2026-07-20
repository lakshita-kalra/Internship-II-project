import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Video, MapPin, User } from "lucide-react";
import { GradientAvatar } from "@/components/smarthire/Avatar";
import { StatusBadge } from "@/components/smarthire/StatusBadge";
import { Button } from "@/components/ui/button";
import { interviews } from "@/data/mock";

export const Route = createFileRoute("/_app/interviews")({
  component: InterviewsPage,
  head: () => ({ meta: [{ title: "Interviews — SmartHire" }] }),
});

function InterviewsPage() {
  const upcoming = interviews.filter(i => i.status === "Scheduled");
  const past = interviews.filter(i => i.status !== "Scheduled");

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Interviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your schedule at a glance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-elevated p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold">Upcoming</h2>
              <p className="text-xs text-muted-foreground">{upcoming.length} scheduled</p>
            </div>
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>
          <ul className="space-y-3">
            {upcoming.map(iv => (
              <li key={iv.id} className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-muted/40">
                <GradientAvatar initials={iv.initials} ci={iv.ci} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{iv.name}</p>
                    <StatusBadge status={iv.round} className="hidden sm:inline-flex" />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{iv.role}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{iv.with}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {iv.mode === "Video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {iv.mode}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{iv.day}</p>
                  <p className="text-xs text-muted-foreground">{iv.time}</p>
                  <Button size="sm" variant="outline" className="mt-1.5 h-7 text-xs">Join</Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-elevated p-5">
          <div className="mb-4">
            <h2 className="font-display text-base font-bold">Past Interviews</h2>
            <p className="text-xs text-muted-foreground">{past.length} completed</p>
          </div>
          <ul className="space-y-3">
            {past.map(iv => (
              <li key={iv.id} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                <GradientAvatar initials={iv.initials} ci={iv.ci} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{iv.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{iv.role} · {iv.round}</p>
                </div>
                <StatusBadge status={iv.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
