import { TrendingUp, TrendingDown } from "lucide-react";

import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardMetric,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, TextSmall, Muted } from "@/components/ui/typography";

const allocations = [
  { entity: "JA Wealth", totalAum: "£22,100,000", clients: 18, qtrChange: "+3.1%" },
  { entity: "JA Realty", totalAum: "£14,800,000", clients: 14, qtrChange: "+1.8%" },
  { entity: "JA Digital", totalAum: "£7,400,000", clients: 9, qtrChange: "+6.4%" },
  { entity: "JA Capital", totalAum: "£4,440,000", clients: 6, qtrChange: "-0.5%" },
];

export default function AdvisorPortfolioPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>Portfolio</H1>
        <Muted>Aggregated view across your book of business</Muted>
      </header>

      <DashboardGrid>
        <DashCard span="wide">
          <DashCardHeader>
            <div>
              <DashCardTitle>Total AUM by Entity</DashCardTitle>
              <DashCardDescription>Q2 2026 performance</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {allocations.map((row) => {
              const isUp = row.qtrChange.startsWith("+");
              return (
                <div
                  key={row.entity}
                  className="flex items-center justify-between border-b border-border/60 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-0.5">
                    <TextSmall className="font-medium">{row.entity}</TextSmall>
                    <Muted>{row.clients} clients</Muted>
                  </div>
                  <div className="flex items-center gap-3">
                    <DashCardMetric className="text-xl">{row.totalAum}</DashCardMetric>
                    <Badge
                      variant={isUp ? "secondary" : "outline"}
                      className="flex items-center gap-1"
                    >
                      {isUp ? (
                        <TrendingUp className="size-3" />
                      ) : (
                        <TrendingDown className="size-3" />
                      )}
                      {row.qtrChange}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Quarterly Return</DashCardTitle>
          </DashCardHeader>
          <DashCardContent>
            <DashCardMetric>+2.8%</DashCardMetric>
            <TextSmall className="mt-1 text-muted-foreground">
              Across all managed assets, Q2 2026
            </TextSmall>
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Largest Holding</DashCardTitle>
          </DashCardHeader>
          <DashCardContent>
            <DashCardMetric>£11,200,000</DashCardMetric>
            <TextSmall className="mt-1 text-muted-foreground">
              Amara Diallo · JA Wealth
            </TextSmall>
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}
