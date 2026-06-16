"use client";

import { CalendarDays, Download, ExternalLink, Video } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DashCard, DashCardContent, DashCardDescription, DashCardHeader, DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { pastSessions, sessionTypes, upcomingSessions } from "@/lib/data/sessions";
import { cn } from "@/lib/utils";

export default function SessionsPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>Sessions</H1>
        <Muted>Upcoming meetings and session history with your advisor.</Muted>
      </header>

      <div>
        <DashCardTitle className="mb-4">Upcoming Sessions</DashCardTitle>
        <div className="flex flex-col gap-(--spacing-grid)">
          {upcomingSessions.map(s => (
            <DashCard key={s.id}>
              <DashCardHeader>
                <div>
                  <DashCardTitle>{s.type}</DashCardTitle>
                  <DashCardDescription>
                    {s.advisor} · {s.date}, {s.time} · {s.format}
                  </DashCardDescription>
                </div>
                <Badge variant={s.status === "Confirmed" ? "secondary" : "outline"}>{s.status}</Badge>
              </DashCardHeader>
              <DashCardContent>
                <div className="flex flex-wrap gap-2">
                  {s.joinUrl && (
                    <a
                      href={s.joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ size: "sm" })}
                    >
                      <Video className="size-4" />
                      Join Zoom
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                  <Button variant="outline" size="sm">
                    <CalendarDays className="size-4" />
                    Add to calendar
                  </Button>
                  <Button variant="ghost" size="sm">Reschedule</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Cancel</Button>
                </div>
              </DashCardContent>
            </DashCard>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <DashCardTitle className="mb-4">Session History</DashCardTitle>
        <DashCard>
          <DashCardContent className="p-0">
            <div className="divide-y divide-border/40">
              {pastSessions.map(h => (
                <div key={h.id} className="flex items-start gap-4 px-6 py-4">
                  <CalendarDays className="size-4 shrink-0 mt-0.5 text-muted-foreground/60" />
                  <div className="flex-1 min-w-0">
                    <TextSmall className="font-medium">{h.type}</TextSmall>
                    <Muted>{h.date}</Muted>
                    <TextSmall className="mt-0.5 text-muted-foreground">{h.outcome}</TextSmall>
                  </div>
                  {h.hasMinutes && (
                    <Button variant="outline" size="sm" className="shrink-0">
                      <Download className="size-3.5" />
                      <span className="hidden sm:inline">Minutes</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>
      </div>

      <Separator />

      <div>
        <DashCardTitle className="mb-4">Book a Session</DashCardTitle>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sessionTypes.map(type => (
            <button
              key={type}
              type="button"
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 text-left transition-colors hover:border-brand-primary/30 hover:bg-brand-primary/5"
            >
              <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
              <TextSmall className="font-medium">{type}</TextSmall>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
