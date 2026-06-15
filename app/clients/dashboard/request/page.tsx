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

const openRequests = [
  {
    title: "Succession planning review",
    submitted: "12 Jun 2026",
    status: "In review",
  },
  {
    title: "Offshore banking setup",
    submitted: "5 Jun 2026",
    status: "Pending",
  },
];

const serviceCategories = [
  { label: "Wealth planning", description: "Reviews, projections and strategy sessions" },
  { label: "Legacy and estate", description: "Wills, trusts and succession structuring" },
  { label: "Property and realty", description: "Acquisitions, valuations and management" },
  { label: "Digital assets", description: "Crypto holdings, reporting and custody" },
];

export default function ClientRequestPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Request a Service</H1>
          <Muted>Submit a request to your advisor or the JA Group team</Muted>
        </div>
        <Button size="sm">New request</Button>
      </header>

      <DashboardGrid>
        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Open Requests</DashCardTitle>
              <DashCardDescription>Requests currently being handled by your team</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {openRequests.length === 0 ? (
              <TextSmall className="text-muted-foreground">No open requests.</TextSmall>
            ) : (
              openRequests.map((req) => (
                <div
                  key={req.title}
                  className="flex items-center justify-between border-b border-border/60 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-0.5">
                    <TextSmall className="font-medium">{req.title}</TextSmall>
                    <Muted>Submitted {req.submitted}</Muted>
                  </div>
                  <Badge variant="secondary">{req.status}</Badge>
                </div>
              ))
            )}
          </DashCardContent>
        </DashCard>

        {serviceCategories.map((cat) => (
          <DashCard key={cat.label}>
            <DashCardHeader>
              <DashCardTitle>{cat.label}</DashCardTitle>
            </DashCardHeader>
            <DashCardContent>
              <TextSmall className="text-muted-foreground">{cat.description}</TextSmall>
              <Button variant="outline" size="sm" className="mt-4">
                Request
              </Button>
            </DashCardContent>
          </DashCard>
        ))}
      </DashboardGrid>
    </PageShell>
  );
}
