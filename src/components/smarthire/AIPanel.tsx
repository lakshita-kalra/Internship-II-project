import { Sparkles, TrendingUp, Target, FileCheck2, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Candidate } from "@/data/mock";

interface Props {
  candidate?: Candidate;
}

function ScoreRow({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          {label}
        </span>
        <span className="font-semibold tabular-nums text-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}

export function AIPanel({ candidate }: Props) {
  const c = candidate;
  const insights = c
    ? [
        `Strong ${c.skills.slice(0, 2).join(" & ")} profile — matches top 12% of applicants for this role.`,
        `${c.exp} of experience aligns with role seniority requirement.`,
        c.aiScore >= 85 ? "Highly recommend advancing to next interview round." : "Consider for shortlist if role fit persists.",
      ]
    : [
        "Engineering roles show 24% higher engagement this week.",
        "Referral pipeline is converting 2.3× faster than direct applications.",
        "Consider adding 2 more interviewers to reduce time-to-hire by ~3 days.",
      ];

  return (
    <div className="card-elevated overflow-hidden">
      <div className="relative border-b border-border bg-gradient-to-br from-primary-soft via-accent to-transparent px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-white shadow-sm">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold leading-tight">AI Recommendation</h3>
            <p className="text-xs text-muted-foreground">
              {c ? `Analysis for ${c.name}` : "Weekly hiring insights"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {c && (
          <div className="space-y-3.5">
            <div className="flex items-baseline justify-between rounded-xl bg-muted/40 p-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Match Score</p>
                <p className="mt-1 font-display text-3xl font-bold tracking-tight">{c.aiScore}<span className="text-lg text-muted-foreground">/100</span></p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                {c.aiScore >= 85 ? "Excellent" : c.aiScore >= 70 ? "Good" : "Fair"}
              </span>
            </div>
            <ScoreRow icon={FileCheck2} label="Resume Match" value={c.resumeScore} />
            <ScoreRow icon={Target} label="Skill Match" value={c.skillMatch} />
            <ScoreRow icon={TrendingUp} label="Culture Fit" value={Math.min(100, c.aiScore - 5)} />
          </div>
        )}

        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Brain className="h-3.5 w-3.5" /> Hiring Insights
          </p>
          <ul className="space-y-2">
            {insights.map((i, idx) => (
              <li key={idx} className="flex gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5 text-xs leading-relaxed text-foreground/90">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
