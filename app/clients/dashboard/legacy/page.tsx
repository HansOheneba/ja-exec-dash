import { PageShell } from "@/components/layout/page-shell";
import {
  DashCard,
  DashCardContent,
  DashCardHeader,
  DashCardTitle,
  DashCardDescription,
} from "@/components/ui/dash-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, TextSmall, Muted } from "@/components/ui/typography";
import { DashboardGrid } from "@/components/layout/page-shell";

const milestones = [
  { label: "Will review", status: "Complete", updated: "Jan 2026" },
  { label: "Trust structure review", status: "In progress", updated: "May 2026" },
  { label: "Succession briefing with family", status: "Scheduled", updated: "Jul 2026" },
  { label: "Power of attorney update", status: "Pending", updated: "" },
];

export default function ClientLegacyPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Legacy Planning</H1>
          <Muted>Estate, succession and generational wealth planning</Muted>
        </div>
        <Button variant="outline" size="sm">Book a session</Button>
      </header>

      <DashboardGrid>
        <DashCard span="wide">
          <DashCardHeader>
            <div>
              <DashCardTitle>Estate Plan Progress</DashCardTitle>
              <DashCardDescription>
                Ongoing milestones with your advisor
              </DashCardDescription>
            </div>
            <Badge>60% complete</Badge>
          </DashCardHeader>
          <DashCardContent className="gap-1">
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-3/5 rounded-full bg-brand-accent" />
            </div>
            <div className="flex flex-col gap-3">
              {milestones.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-0.5">
                    <TextSmall className="font-medium">{m.label}</TextSmall>
                    {m.updated ? (
                      <Muted>Updated {m.updated}</Muted>
                    ) : null}
                  </div>
                  <Badge
                    variant={
                      m.status === "Complete"
                        ? "secondary"
                        : m.status === "In progress"
                        ? "default"
                        : "outline"
                    }
                  >
                    {m.status}
                  </Badge>
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Key Contacts</DashCardTitle>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {[
              { role: "Lead advisor", name: "James Adeyemi" },
              { role: "Legal counsel", name: "Fola Balogun" },
              { role: "Tax advisor", name: "Sarah Mensah" },
            ].map((c) => (
              <div key={c.role} className="flex flex-col gap-0.5">
                <TextSmall className="font-medium">{c.name}</TextSmall>
                <Muted>{c.role}</Muted>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}
