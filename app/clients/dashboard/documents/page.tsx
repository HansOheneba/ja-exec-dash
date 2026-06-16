"use client";

import { useState } from "react";
import { Download, Eye, FileCheck, FileText, Search, type LucideIcon } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DashCard, DashCardContent, DashCardDescription, DashCardHeader, DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { docSections, type Doc, type DocStatus } from "@/lib/data/documents";

const SECTION_ICON_MAP: Record<string, LucideIcon> = { FileText, FileCheck };

const STATUS_CONFIG: Record<DocStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "new":                { label: "New",                variant: "default"    },
  "requires-signature": { label: "Signature required", variant: "destructive" },
  "viewed":             { label: "Viewed",              variant: "secondary"  },
  "signed":             { label: "Signed",              variant: "secondary"  },
};

function formatSize(kb: number): string {
  return kb >= 1000 ? `${(kb / 1000).toFixed(1)} MB` : `${kb} KB`;
}

function DocRow({ doc }: { doc: Doc }) {
  const cfg = STATUS_CONFIG[doc.status];
  return (
    <div className="flex items-center gap-3 py-3">
      <FileText className="size-4 shrink-0 text-muted-foreground/60" />
      <div className="min-w-0 flex-1">
        <TextSmall className="font-medium truncate">{doc.name}</TextSmall>
        <Muted>{doc.date} · {formatSize(doc.sizeKb)}</Muted>
      </div>
      <Badge variant={cfg.variant} className="shrink-0 hidden sm:flex">{cfg.label}</Badge>
      <div className="flex shrink-0 gap-1.5">
        {doc.status === "requires-signature" && (
          <Button size="sm" className="h-7 px-2 text-xs">
            <FileCheck className="size-3.5" />
            <span className="hidden sm:inline">Sign</span>
          </Button>
        )}
        <Button variant="outline" size="sm" className="h-7 px-2">
          <Eye className="size-3.5" />
        </Button>
        <Button variant="outline" size="sm" className="h-7 px-2">
          <Download className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const allDocs = docSections.flatMap(s => s.docs);
  const needsSig = allDocs.filter(d => d.status === "requires-signature").length;
  const newDocs  = allDocs.filter(d => d.status === "new").length;

  const filteredSections = docSections.map(sec => ({
    ...sec,
    docs: query.trim()
      ? sec.docs.filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
      : sec.docs,
  })).filter(sec => !query.trim() || sec.docs.length > 0);

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Documents</H1>
          <Muted>Your secure client vault. {newDocs} new · {needsSig} require signature.</Muted>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vault..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="h-8 w-full sm:w-48 pl-8 text-sm"
          />
        </div>
      </header>

      {/* Signature alert */}
      {needsSig > 0 && !query && (
        <DashCard className="border-destructive/30 bg-destructive/5">
          <DashCardHeader>
            <div>
              <DashCardTitle>Action required</DashCardTitle>
              <DashCardDescription>
                You have {needsSig} document{needsSig > 1 ? "s" : ""} awaiting your signature
              </DashCardDescription>
            </div>
            <Badge variant="destructive">{needsSig} pending</Badge>
          </DashCardHeader>
          <DashCardContent>
            {docSections
              .flatMap(s => s.docs.filter(d => d.status === "requires-signature").map(d => ({ ...d, section: s.title })))
              .map(doc => (
                <div key={doc.id} className="flex items-center gap-3 py-2">
                  <FileCheck className="size-4 text-destructive shrink-0" />
                  <div className="flex-1 min-w-0">
                    <TextSmall className="font-medium truncate">{doc.name}</TextSmall>
                    <Muted>{doc.section} · {doc.date}</Muted>
                  </div>
                  <Button size="sm" className="shrink-0">Sign document</Button>
                </div>
              ))
            }
          </DashCardContent>
        </DashCard>
      )}

      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-2">
        {filteredSections.map(sec => {
          const SectionIcon = SECTION_ICON_MAP[sec.iconName] ?? FileText;
          const newCount = sec.docs.filter(d => d.status === "new").length;
          return (
            <DashCard key={sec.id}>
              <DashCardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                    <SectionIcon className="size-5 text-brand-primary" />
                  </div>
                  <div>
                    <DashCardTitle>{sec.title}</DashCardTitle>
                    <DashCardDescription>{sec.description}</DashCardDescription>
                  </div>
                </div>
                {newCount > 0 && <Badge>{newCount} new</Badge>}
              </DashCardHeader>
              <DashCardContent className="p-0">
                <div className="divide-y divide-border/40 px-6">
                  {sec.docs.map(doc => <DocRow key={doc.id} doc={doc} />)}
                </div>
              </DashCardContent>
            </DashCard>
          );
        })}
      </div>
    </PageShell>
  );
}
