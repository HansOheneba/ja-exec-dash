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
import { FileText, Download } from "lucide-react";

const documents = [
  {
    name: "Trust deed amendment",
    category: "Legal",
    date: "8 Jun 2026",
    size: "1.2 MB",
  },
  {
    name: "Q1 2026 portfolio statement",
    category: "Statements",
    date: "1 Apr 2026",
    size: "840 KB",
  },
  {
    name: "Succession planning briefing",
    category: "Legacy",
    date: "15 Mar 2026",
    size: "2.1 MB",
  },
  {
    name: "JA Wealth annual report",
    category: "Reports",
    date: "10 Jan 2026",
    size: "5.4 MB",
  },
  {
    name: "Power of attorney (draft)",
    category: "Legal",
    date: "22 Feb 2026",
    size: "320 KB",
  },
];

export default function ClientDocumentsPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Documents</H1>
          <Muted>All files shared between you and your advisory team</Muted>
        </div>
        <Button size="sm">Upload document</Button>
      </header>

      <DashboardGrid>
        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Recent Documents</DashCardTitle>
              <DashCardDescription>
                Sorted by most recently added
              </DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <TextSmall className="truncate font-medium">
                    {doc.name}
                  </TextSmall>
                  <Muted>
                    {doc.date} · {doc.size}
                  </Muted>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {doc.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  aria-label={`Download ${doc.name}`}
                >
                  <Download className="size-4" />
                </Button>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}
