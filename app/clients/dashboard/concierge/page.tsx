"use client";

import {
  Briefcase, Car, ChevronRight, Clock, CreditCard, Gavel,
  Globe, Home, Plane, Shield, Sparkles, Star, Users,
  type LucideIcon,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DashCard, DashCardContent, DashCardDescription, DashCardHeader, DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  activeRequests, exclusiveEvents, partnerNetworkItems, serviceCategories,
  type ServiceRequestStatus,
} from "@/lib/data/concierge";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, CreditCard, Gavel, Car, Plane, Sparkles, Home, Shield, Briefcase,
};

const STATUS_CONFIG: Record<ServiceRequestStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  submitted:    { label: "Submitted",    variant: "outline"   },
  "in-progress":{ label: "In progress",  variant: "default"   },
  completed:    { label: "Completed",    variant: "secondary" },
  pending:      { label: "Pending",      variant: "outline"   },
};

export default function ConciergePage() {
  const open = activeRequests.filter(r => r.status !== "completed").length;

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <H1>Concierge</H1>
          <Star className="size-5 fill-amber-400 text-amber-400" />
        </div>
        <Muted>Your dedicated private wealth concierge. Available exclusively to JA Wealth clients.</Muted>
      </header>

      {/* Active requests */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <DashCardTitle>Active Service Requests</DashCardTitle>
          <Badge variant="secondary">{open} open</Badge>
        </div>
        <div className="flex flex-col gap-(--spacing-grid)">
          {activeRequests.map(req => {
            const cfg = STATUS_CONFIG[req.status];
            const ReqIcon = ICON_MAP[req.iconName] ?? Globe;
            return (
              <DashCard key={req.id}>
                <DashCardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                      <ReqIcon className="size-5 text-brand-primary" />
                    </div>
                    <div>
                      <DashCardTitle>{req.title}</DashCardTitle>
                      <DashCardDescription>{req.category}</DashCardDescription>
                    </div>
                  </div>
                  <Badge variant={cfg.variant}>{cfg.label}</Badge>
                </DashCardHeader>
                <DashCardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div><Muted>Officer</Muted><TextSmall className="font-medium">{req.officer}</TextSmall></div>
                    <div><Muted>Submitted</Muted><TextSmall className="font-medium">{req.submittedDate}</TextSmall></div>
                    <div><Muted>Expected</Muted><TextSmall className="font-medium">{req.expectedCompletion}</TextSmall></div>
                  </div>
                  <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2">
                    <TextSmall className="text-muted-foreground">{req.notes}</TextSmall>
                  </div>
                </DashCardContent>
              </DashCard>
            );
          })}
        </div>
      </div>

      {/* New service request */}
      <div>
        <DashCardTitle className="mb-4">Request a Service</DashCardTitle>
        <div className="flex flex-col gap-4">
          {serviceCategories.map(cat => (
            <div key={cat.heading}>
              <div className="mb-2 flex items-center gap-2">
                <Muted className="font-medium">{cat.heading}</Muted>
                {cat.jaExclusive && <Badge className="h-4 px-1.5 text-[10px]">JA exclusive</Badge>}
              </div>
              <div className={cn(
                "grid gap-(--spacing-grid)",
                cat.services.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}>
                {cat.services.map(svc => {
                  const SvcIcon = ICON_MAP[svc.iconName] ?? Globe;
                  return (
                    <button
                      key={svc.label}
                      type="button"
                      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-3.5 text-left transition-colors hover:border-brand-primary/30 hover:bg-brand-primary/5"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <SvcIcon className="size-4 text-muted-foreground group-hover:text-brand-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <TextSmall className="font-medium">{svc.label}</TextSmall>
                        <Muted className="truncate">{svc.description}</Muted>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusive events */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <DashCardTitle>Exclusive Events and Opportunities</DashCardTitle>
          <Star className="size-4 fill-amber-400 text-amber-400" />
        </div>
        <div className="grid grid-cols-1 gap-(--spacing-grid) md:grid-cols-3">
          {exclusiveEvents.map(ev => (
            <DashCard key={ev.id}>
              <DashCardHeader>
                <div>
                  <Badge variant={ev.type === "event" ? "secondary" : "default"} className="mb-2">
                    {ev.type === "event" ? "Event" : "Investment opportunity"}
                  </Badge>
                  <DashCardTitle>{ev.title}</DashCardTitle>
                  <DashCardDescription>
                    <Clock className="size-3 mr-1 inline" />{ev.date} · {ev.location}
                  </DashCardDescription>
                </div>
              </DashCardHeader>
              <DashCardContent>
                <TextSmall className="leading-relaxed text-muted-foreground">{ev.description}</TextSmall>
                <Button size="sm" className="mt-4 w-full">{ev.cta}</Button>
              </DashCardContent>
            </DashCard>
          ))}
        </div>
      </div>

      {/* Partner network */}
      <DashCard>
        <DashCardHeader>
          <div>
            <DashCardTitle>JA Partner Network</DashCardTitle>
            <DashCardDescription>Preferred introductions across banking, legal, real estate, and advisory</DashCardDescription>
          </div>
          <Users className="size-4 text-muted-foreground" />
        </DashCardHeader>
        <DashCardContent>
          <div className="flex flex-wrap gap-2">
            {partnerNetworkItems.map(partner => (
              <Badge key={partner} variant="outline">{partner}</Badge>
            ))}
          </div>
          <Muted className="mt-3">Contact your concierge officer to request an introduction.</Muted>
        </DashCardContent>
      </DashCard>
    </PageShell>
  );
}
