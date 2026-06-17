"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { H1, Muted } from "@/components/ui/typography";

function Section({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      {/* Section header */}
      <div className="flex items-start gap-4 border-b border-border bg-muted/40 px-6 py-5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sidebar text-xs font-semibold text-sidebar-foreground">
          {step}
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {/* Section body */}
      <div className="flex flex-col gap-5 px-6 py-6">{children}</div>
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

const ASSET_CLASSES = [
  { id: "alloc-equities",     label: "Equities",       hint: "Stocks, ETFs, equity funds" },
  { id: "alloc-fixed-income", label: "Fixed Income",   hint: "Bonds, gilts, treasuries" },
  { id: "alloc-real-estate",  label: "Real Estate",    hint: "Property, REITs" },
  { id: "alloc-commodities",  label: "Commodities",    hint: "Gold, silver, energy" },
  { id: "alloc-alternatives", label: "Alternatives",   hint: "Hedge funds, private equity" },
  { id: "alloc-digital",      label: "Digital Assets", hint: "Crypto, tokenised assets" },
  { id: "alloc-cash",         label: "Cash",           hint: "Money market, savings" },
];

export default function AddClientPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-8 sm:px-6">

      {/* Back nav */}
      <Link
        href="/advisors/dashboard/clients"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All clients
      </Link>

      {/* Page header */}
      <div className="flex flex-col gap-1">
        <H1>Add new client</H1>
        <Muted>
          Fill in the details below to create the client profile and send a portal invitation.
        </Muted>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">

        {/* 1. Personal details */}
        <Section
          step={1}
          title="Personal details"
          description="Contact and identity information for the client."
        >
          <FormRow>
            <FieldGroup>
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Jane" />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Smith" />
            </FieldGroup>
          </FormRow>
          <FieldGroup>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="jane.smith@email.com" />
          </FieldGroup>
          <FormRow>
            <FieldGroup>
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="+44 7700 000000" />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="London, UK" />
            </FieldGroup>
          </FormRow>
          <FieldGroup>
            <Label htmlFor="dob">Date of birth (optional)</Label>
            <Input id="dob" type="date" className="max-w-xs" />
          </FieldGroup>
        </Section>

        {/* 2. Investment profile */}
        <Section
          step={2}
          title="Investment profile"
          description="Risk appetite, objectives, and initial assets under management."
        >
          <FieldGroup>
            <Label htmlFor="initial-aum">Initial AUM (£)</Label>
            <Input
              id="initial-aum"
              type="number"
              placeholder="1,000,000"
              className="max-w-xs"
            />
            <Muted className="text-xs">Total assets under management at onboarding.</Muted>
          </FieldGroup>
          <FormRow>
            <FieldGroup>
              <Label htmlFor="risk-profile">Risk profile</Label>
              <Select id="risk-profile">
                <option value="">Select profile</option>
                <option>Conservative</option>
                <option>Moderate</option>
                <option>Balanced</option>
                <option>Growth</option>
                <option>Aggressive</option>
              </Select>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="horizon">Investment horizon</Label>
              <Select id="horizon">
                <option value="">Select horizon</option>
                <option>1-3 years (Short term)</option>
                <option>3-7 years (Medium term)</option>
                <option>7-15 years (Long term)</option>
                <option>15+ years (Generational)</option>
              </Select>
            </FieldGroup>
          </FormRow>
          <FieldGroup>
            <Label htmlFor="objective">Primary investment objective</Label>
            <Select id="objective">
              <option value="">Select objective</option>
              <option>Capital preservation</option>
              <option>Income generation</option>
              <option>Capital growth</option>
              <option>Wealth transfer and legacy</option>
              <option>Diversification</option>
              <option>Tax efficiency</option>
            </Select>
          </FieldGroup>
        </Section>

        {/* 3. Portfolio allocation */}
        <Section
          step={3}
          title="Initial portfolio allocation"
          description="Target allocation across asset classes. Percentages should sum to 100% and can be adjusted after onboarding."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ASSET_CLASSES.map((ac) => (
              <FieldGroup key={ac.id}>
                <Label htmlFor={ac.id}>{ac.label}</Label>
                <div className="relative">
                  <Input
                    id={ac.id}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    className="pr-8"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                <Muted className="text-xs">{ac.hint}</Muted>
              </FieldGroup>
            ))}
          </div>
        </Section>

        {/* 4. Legacy and estate planning */}
        <Section
          step={4}
          title="Legacy and estate planning"
          description="Personal circumstances and estate planning status at time of onboarding."
        >
          <FormRow>
            <FieldGroup>
              <Label htmlFor="marital-status">Marital status</Label>
              <Select id="marital-status">
                <option value="">Select status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Civil partnership</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </Select>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="dependents">Number of dependents</Label>
              <Input id="dependents" type="number" min="0" placeholder="0" />
            </FieldGroup>
          </FormRow>
          <FieldGroup>
            <Label htmlFor="estate-status">Current estate plan status</Label>
            <Select id="estate-status">
              <option>Not started</option>
              <option>Will in place</option>
              <option>Trust structure in progress</option>
              <option>Fully established</option>
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="goals">Primary financial goals</Label>
            <Textarea
              id="goals"
              rows={3}
              placeholder="e.g. Wealth preservation, generational legacy, retirement income, property acquisition..."
            />
          </FieldGroup>
        </Section>

        {/* 5. Advisor notes */}
        <Section
          step={5}
          title="Advisor notes"
          description="Private notes visible only to you. Record background, referral source, or anything relevant for onboarding."
        >
          <FieldGroup>
            <Label htmlFor="onboarding-notes">Notes</Label>
            <Textarea
              id="onboarding-notes"
              rows={5}
              placeholder="Any background, referral source, key preferences, or onboarding context..."
            />
          </FieldGroup>
        </Section>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/advisors/dashboard/clients"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </Link>
          <div className="flex gap-3">
            <Button variant="outline">Save as draft</Button>
            <Button>Send portal invitation</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
