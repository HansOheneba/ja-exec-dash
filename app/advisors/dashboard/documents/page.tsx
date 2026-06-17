"use client";

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
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { FileText, Download } from "lucide-react";

const documents = [
  {
    id: "d1",
    name: "Trust deed amendment (Priya Nair)",
    client: "Priya Nair",
    clientId: "priya-nair",
    category: "Legal",
    date: "8 Jun 2026",
    size: "1.2 MB",
    needsAction: true,
  },
  {
    id: "d2",
    name: "Q1 2026 portfolio statement (Marcus Webb)",
    client: "Marcus Webb",
    clientId: "marcus-webb",
    category: "Statements",
    date: "1 Apr 2026",
    size: "840 KB",
    needsAction: false,
  },
  {
    id: "d3",
    name: "Succession planning brief (Lois Lane)",
    client: "Lois Lane",
    clientId: "lois-lane",
    category: "Legacy",
    date: "15 Mar 2026",
    size: "2.1 MB",
    needsAction: false,
  },
  {
    id: "d4",
    name: "Risk profile update (Amara Diallo)",
    client: "Amara Diallo",
    clientId: "amara-diallo",
    category: "Compliance",
    date: "20 May 2026",
    size: "540 KB",
    needsAction: true,
  },
  {
    id: "d5",
    name: "Onboarding pack (Theo Baxter)",
    client: "Theo Baxter",
    clientId: "theo-baxter",
    category: "Onboarding",
    date: "10 Jun 2026",
    size: "3.2 MB",
    needsAction: false,
  },
  {
    id: "d6",
    name: "Annual review summary (Lois Lane)",
    client: "Lois Lane",
    clientId: "lois-lane",
    category: "Review",
    date: "3 Jun 2026",
    size: "960 KB",
    needsAction: false,
  },
];

const actionNeeded = documents.filter((d) => d.needsAction);
const categories = [...new Set(documents.map((d) => d.category))];

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

      <KpiStrip>
        <KpiItem
          label="Total Documents"
          value={String(documents.length)}
          change={`${categories.length} categories`}
          trend="neutral"
        />
        <KpiItem
          label="Action Needed"
          value={String(actionNeeded.length)}
          change="Awaiting review or signature"
          trend={actionNeeded.length > 0 ? "down" : "up"}
        />
        <KpiItem
          label="Clients"
          value={String(new Set(documents.map((d) => d.clientId)).size)}
          change="With documents on file"
          trend="neutral"
        />
        <KpiItem
          label="Most Recent"
          value="8 Jun 2026"
          change="Trust deed (Priya Nair)"
          trend="neutral"
        />
      </KpiStrip>

      <DashboardGrid>
        {actionNeeded.length > 0 && (
          <DashCard span="full">
            <DashCardHeader>
              <div>
                <DashCardTitle>Action Required</DashCardTitle>
                <DashCardDescription>
                  {actionNeeded.length} document{actionNeeded.length > 1 ? "s" : ""} awaiting your review
                </DashCardDescription>
              </div>
            </DashCardHeader>
            <DashCardContent className="gap-3">
              {actionNeeded.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 rounded-lg border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-900/40 dark:bg-amber-950/20"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs dark:bg-muted">
                    <FileText className="size-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <TextSmall className="truncate font-medium">{doc.name}</TextSmall>
                    <Muted>
                      {doc.client} · {doc.date}
                    </Muted>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="default">Action needed</Badge>
                    <Button variant="ghost" size="icon" className="size-8" aria-label={`Download ${doc.name}`}>
                      <Download className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </DashCardContent>
          </DashCard>
        )}

        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>All Documents</DashCardTitle>
              <DashCardDescription>Sorted by most recently added</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <TextSmall className="truncate font-medium">{doc.name}</TextSmall>
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
