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
    name: "Trust deed amendment (Priya Nair)",
    client: "Priya Nair",
    category: "Legal",
    date: "8 Jun 2026",
    size: "1.2 MB",
    needsAction: true,
  },
  {
    name: "Q1 2026 portfolio statement (Marcus Webb)",
    client: "Marcus Webb",
    category: "Statements",
    date: "1 Apr 2026",
    size: "840 KB",
    needsAction: false,
  },
  {
    name: "Succession planning brief (Lois Lane)",
    client: "Lois Lane",
    category: "Legacy",
    date: "15 Mar 2026",
    size: "2.1 MB",
    needsAction: false,
  },
  {
    name: "Risk profile update (Amara Diallo)",
    client: "Amara Diallo",
    category: "Compliance",
    date: "20 May 2026",
    size: "540 KB",
    needsAction: true,
  },
  {
    name: "Onboarding pack (Theo Baxter)",
    client: "Theo Baxter",
    category: "Onboarding",
    date: "10 Jun 2026",
    size: "3.2 MB",
    needsAction: false,
  },
];

export default function AdvisorDocumentsPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Documents</H1>
          <Muted>All client and advisory documents</Muted>
        </div>
        <Button size="sm">Upload document</Button>
      </header>

      <DashboardGrid>
        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>All Documents</DashCardTitle>
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
                    {doc.client} · {doc.date} · {doc.size}
                  </Muted>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {doc.needsAction && (
                    <Badge variant="default" className="hidden sm:inline-flex">
                      Action needed
                    </Badge>
                  )}
                  <Badge variant="outline">{doc.category}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={`Download ${doc.name}`}
                  >
                    <Download className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}
