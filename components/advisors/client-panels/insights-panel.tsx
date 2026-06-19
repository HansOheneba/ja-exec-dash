"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Check } from "lucide-react";

import { PostInsightSheet } from "@/components/advisors/post-insight-sheet";
import { Button } from "@/components/ui/button";
import { H2, H3, H4, Lead, Muted, Overline, TextSmall } from "@/components/ui/typography";
import {
  advisorActivity,
  advisorNotes,
  getInsightsSummaryFromData,
  recommendations,
  type PortfolioImpact,
  type Recommendation,
} from "@/lib/data/advisor-insights";
import { cn } from "@/lib/utils";

const STATUS_CHART_COLORS = {
  pending: "#c9a227",
  implemented: "#5a7d5a",
  declined: "#9ca3af",
};

function PortfolioImpactPreview({ impact }: { impact: PortfolioImpact }) {
  return (
    <div className="mt-4 rounded-xl bg-muted/30 px-4 py-3">
      <Overline className="mb-2 block">Portfolio impact (client view)</Overline>
      <ul className="flex flex-col gap-1.5">
        {impact.benefits.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-body-sm">
            <Check className="mt-0.5 size-3.5 shrink-0 text-brand-accent" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendationManageCard({ rec }: { rec: Recommendation }) {
  return (
    <article className="rounded-2xl border border-border/30 bg-card px-6 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Overline className="mb-1.5 block">
            {rec.status === "pending-acknowledgement" ? "Awaiting client response" : rec.status}
          </Overline>
          <H4>{rec.title}</H4>
          <Muted className="mt-1 text-body-sm">{rec.date}</Muted>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">Remove</Button>
        </div>
      </div>
      <TextSmall className="mt-4 leading-relaxed text-muted-foreground">{rec.rationale}</TextSmall>
      {rec.impact ? <PortfolioImpactPreview impact={rec.impact} /> : null}
    </article>
  );
}

function AdvisorInsightsPanel({ clientName }: { clientName: string }) {
  const summary = getInsightsSummaryFromData();
  const pending = recommendations.filter((r) => r.status === "pending-acknowledgement");
  const featuredNote = advisorNotes.find((n) => n.featured) ?? advisorNotes[0];
  const chartData = [
    { name: "Pending", value: summary.pendingCount, color: STATUS_CHART_COLORS.pending },
    { name: "Implemented", value: summary.implementedCount, color: STATUS_CHART_COLORS.implemented },
    { name: "Declined", value: summary.declinedCount, color: STATUS_CHART_COLORS.declined },
  ].filter((d) => d.value > 0);

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border/20 bg-linear-to-br from-card via-card to-muted/15 px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Overline className="mb-2 block">Client portal preview · {clientName}</Overline>
            <H3 className="mb-3">Advisor insights summary</H3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-200/60 bg-amber-50/80 px-3 py-1.5 text-body-sm font-medium text-amber-900">
                {summary.pendingCount} Pending
              </span>
              <span className="rounded-full border border-emerald-200/50 bg-emerald-50/60 px-3 py-1.5 text-body-sm font-medium text-emerald-900">
                {summary.implementedCount} Implemented
              </span>
            </div>
          </div>
          <PostInsightSheet clientName={clientName} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex flex-col gap-8">
          <section>
            <H2 className="mb-2 text-h3">Pending recommendations</H2>
            <Muted className="mb-6 text-body-sm">Visible to client under Requires your attention</Muted>
            <div className="flex flex-col gap-4">
              {pending.map((rec) => (
                <RecommendationManageCard key={rec.id} rec={rec} />
              ))}
            </div>
          </section>

          <section>
            <H2 className="mb-6 text-h3">Advisor notes</H2>
            <div className="flex flex-col gap-4">
              {advisorNotes.map((note) => (
                <div key={note.id} className="rounded-xl border border-border/25 bg-card px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Overline className="mb-1 block">{note.type} · {note.date}</Overline>
                      <TextSmall className="font-semibold">{note.subject}</TextSmall>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">Remove</Button>
                    </div>
                  </div>
                  <Muted className="mt-3 text-body-sm leading-relaxed">{note.body}</Muted>
                </div>
              ))}
            </div>
          </section>

          {featuredNote ? (
            <section>
              <H2 className="mb-4 text-h3">Featured commentary</H2>
              <div className="rounded-2xl border border-border/25 bg-card px-6 py-6">
                <Overline className="mb-2 block">{featuredNote.type}</Overline>
                <H4>{featuredNote.subject}</H4>
                <Lead className="mt-3 text-foreground/80">{featuredNote.body}</Lead>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border/25 bg-card px-5 py-5">
            <H4 className="mb-1">Response rate</H4>
            <div className="relative mx-auto mt-3 h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={36} outerRadius={52} paddingAngle={3} dataKey="value" stroke="none">
                    {chartData.map((e) => (
                      <Cell key={e.name} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-numeric text-xl font-bold">{summary.completionRatePct}%</span>
                <Overline>Complete</Overline>
              </div>
            </div>
          </div>

          <div>
            <H4 className="mb-4">Activity timeline</H4>
            <ul className="flex flex-col gap-3">
              {advisorActivity.slice(0, 4).map((item) => (
                <li key={item.id} className="border-b border-border/20 pb-3 last:border-0">
                  <Overline className="mb-0.5 block">{item.date}</Overline>
                  <TextSmall className="font-medium">{item.label}</TextSmall>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section>
        <H2 className="mb-4 text-h3">All recommendations</H2>
        <div className="rounded-xl border border-border/20 bg-muted/10 divide-y divide-border/20">
          {recommendations.filter((r) => r.status !== "pending-acknowledgement").map((rec) => (
            <div key={rec.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div>
                <TextSmall className="font-medium">{rec.title}</TextSmall>
                <Muted className="text-body-sm">{rec.date}</Muted>
              </div>
              <span className={cn("text-caption font-medium capitalize", rec.status === "implemented" ? "text-emerald-700" : "text-muted-foreground")}>
                {rec.status.replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { AdvisorInsightsPanel };
