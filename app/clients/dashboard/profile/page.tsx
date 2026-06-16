"use client";

import { Edit, Upload } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DashCard, DashCardContent, DashCardDescription, DashCardHeader, DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { clientProfile } from "@/lib/data/profile";

export default function ProfilePage() {
  const p = clientProfile;

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar className="size-16">
          <AvatarFallback className="bg-brand-primary text-lg font-semibold text-white">
            {p.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <H1>{p.fullName}</H1>
          <Muted>Client since {p.onboardedDate} · Advisor: {p.advisorName}</Muted>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="size-4" />
          Request update
        </Button>
      </header>

      <div className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-2.5">
        <Muted className="text-amber-800">
          Profile changes are submitted to your advisor to maintain data integrity. Use the button above to request a change.
        </Muted>
      </div>

      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-2">
        {/* Personal info */}
        <DashCard>
          <DashCardHeader><DashCardTitle>Personal Information</DashCardTitle></DashCardHeader>
          <DashCardContent>
            <dl className="flex flex-col gap-3">
              {[
                { label: "Full name",     value: p.fullName       },
                { label: "Email",         value: p.email          },
                { label: "Phone",         value: p.phone          },
                { label: "Nationality",   value: p.nationality    },
                { label: "Tax residency", value: p.taxResidency   },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between gap-4">
                  <Muted className="shrink-0">{label}</Muted>
                  <TextSmall className="text-right font-medium">{value}</TextSmall>
                </div>
              ))}
            </dl>
          </DashCardContent>
        </DashCard>

        {/* Family */}
        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Family Members and Beneficiaries</DashCardTitle>
          </DashCardHeader>
          <DashCardContent className="p-0">
            <div className="divide-y divide-border/40">
              {p.familyMembers.map(m => (
                <div key={m.id} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <TextSmall className="font-medium">{m.name}</TextSmall>
                    <Muted>{m.relation}</Muted>
                  </div>
                  {m.isBeneficiary && <Badge variant="secondary">Beneficiary</Badge>}
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        {/* Linked accounts */}
        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Linked Accounts</DashCardTitle>
            <DashCardDescription>Onshore and offshore banking relationships</DashCardDescription>
          </DashCardHeader>
          <DashCardContent className="p-0">
            <div className="divide-y divide-border/40">
              {p.linkedAccounts.map(acc => (
                <div key={acc.id} className="flex items-center justify-between gap-4 px-6 py-3.5">
                  <div className="min-w-0">
                    <TextSmall className="font-medium truncate">{acc.institution}</TextSmall>
                    <Muted>{acc.type} · {acc.jurisdiction}</Muted>
                  </div>
                  <Badge variant={acc.status === "Active" ? "secondary" : "outline"} className="shrink-0">
                    {acc.status}
                  </Badge>
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        {/* Citizenship */}
        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Citizenship and Residency</DashCardTitle>
          </DashCardHeader>
          <DashCardContent className="p-0">
            <div className="divide-y divide-border/40">
              {p.citizenshipItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4 px-6 py-3.5">
                  <div>
                    <TextSmall className="font-medium">{item.label}</TextSmall>
                    <Muted>{item.detail}</Muted>
                  </div>
                  <Badge
                    variant={item.status === "Active" ? "secondary" : item.status === "In progress" ? "default" : "outline"}
                    className="shrink-0"
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>
      </div>

      {/* Document upload */}
      <DashCard>
        <DashCardHeader>
          <DashCardTitle>Supporting Documents</DashCardTitle>
          <DashCardDescription>KYC, identity, and compliance documents</DashCardDescription>
        </DashCardHeader>
        <DashCardContent>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border/60 py-8">
            <Upload className="size-8 text-muted-foreground/60" />
            <div className="text-center">
              <TextSmall className="font-medium">Upload a document</TextSmall>
              <Muted>Passport, proof of address, or other KYC documents</Muted>
            </div>
            <Button variant="outline" size="sm">Choose file</Button>
          </div>
        </DashCardContent>
      </DashCard>
    </PageShell>
  );
}
