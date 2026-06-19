"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { CelereyChat } from "@/components/celerey/celerey-chat";
import { PageShell } from "@/components/layout/page-shell";
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
        <H1>Ask Celerey</H1>
        <Muted>Advisor assistant for client book insights, legacy gaps, and planning support.</Muted>
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
