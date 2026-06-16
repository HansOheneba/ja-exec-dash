"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DashCard, DashCardContent, DashCardDescription, DashCardHeader, DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { advisorNotes, recommendations, type RecommendationStatus } from "@/lib/data/advisor-insights";

const REC_STATUS: Record<RecommendationStatus, { label: string; icon: React.ElementType; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "pending-acknowledgement": { label: "Pending acknowledgement", icon: Clock,        variant: "default"   },
  "implemented":             { label: "Implemented",             icon: CheckCircle2, variant: "secondary" },
  "declined":                { label: "Declined",                icon: XCircle,      variant: "outline"   },
};

export default function AdvisorInsightsPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>Advisor Insights</H1>
        <Muted>Notes, recommendations, and market commentary from Jude Addo.</Muted>
      </header>

      <div>
        <DashCardTitle className="mb-4">Advisor Notes</DashCardTitle>
        <div className="flex flex-col gap-(--spacing-grid)">
          {advisorNotes.map(note => (
            <DashCard key={note.id}>
              <DashCardHeader>
                <div>
                  <DashCardTitle>{note.subject}</DashCardTitle>
                  <DashCardDescription>{note.advisor} · {note.date}</DashCardDescription>
                </div>
                <Badge variant="secondary">{note.type}</Badge>
              </DashCardHeader>
              <DashCardContent>
                <TextSmall className="leading-relaxed text-muted-foreground">{note.body}</TextSmall>
                <Button variant="ghost" size="sm" className="mt-3 px-0 text-brand-primary">
                  Add comment or question
                </Button>
              </DashCardContent>
            </DashCard>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <DashCardTitle className="mb-4">Investment Recommendations</DashCardTitle>
        <div className="flex flex-col gap-(--spacing-grid)">
          {recommendations.map(rec => {
            const cfg = REC_STATUS[rec.status];
            const Icon = cfg.icon;
            return (
              <DashCard key={rec.id}>
                <DashCardHeader>
                  <div>
                    <DashCardTitle>{rec.title}</DashCardTitle>
                    <DashCardDescription>{rec.date}</DashCardDescription>
                  </div>
                  <Badge variant={cfg.variant} className="flex items-center gap-1.5 shrink-0">
                    <Icon className="size-3" />
                    <span className="hidden sm:inline">{cfg.label}</span>
                    <span className="sm:hidden">{rec.status === "implemented" ? "Done" : rec.status === "declined" ? "No" : "Pending"}</span>
                  </Badge>
                </DashCardHeader>
                <DashCardContent>
                  <TextSmall className="text-muted-foreground">{rec.rationale}</TextSmall>
                  {rec.status === "pending-acknowledgement" && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm">Acknowledge and accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" variant="ghost">Ask a question</Button>
                    </div>
                  )}
                </DashCardContent>
              </DashCard>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
