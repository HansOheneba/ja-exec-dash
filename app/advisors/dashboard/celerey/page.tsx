"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { CelereyChat } from "@/components/celerey/celerey-chat";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { H1, Muted } from "@/components/ui/typography";
import { advisorPromptChips } from "@/lib/data/celerey";

function AdvisorAskCelereyContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? undefined;

  return (
    <PageShell
      className="flex h-[calc(100vh-3.5rem)] flex-col gap-0 overflow-hidden py-0"
      style={{ paddingBottom: 0 }}
    >
      <header className="shrink-0 border-b border-border/40 px-(--spacing-page-x) py-4">
        <div className="flex flex-wrap items-center gap-2">
          <H1>Celerey Workspace</H1>
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
            Internal
          </Badge>
        </div>
        <Muted>
          Book intelligence for relationship managers. Scan reviews, legacy gaps, goals, and
          portfolio flags across your client book.
        </Muted>
      </header>
      <CelereyChat
        audience="advisor"
        promptChips={advisorPromptChips}
        initialQuery={initialQuery}
      />
    </PageShell>
  );
}

export default function AdvisorAskCelereyPage() {
  return (
    <Suspense>
      <AdvisorAskCelereyContent />
    </Suspense>
  );
}
