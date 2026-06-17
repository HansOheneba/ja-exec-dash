"use client";

import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function AddClientSheet() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <UserPlus className="size-4" />
            Add client
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add new client</SheetTitle>
          <SheetDescription>
            Enter client details and initial setup. They will receive a portal invite once added.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-4">
          {/* Personal details */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Personal details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Jane" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Smith" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="jane.smith@email.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" placeholder="+44 7700 000000" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="London, UK" />
              </div>
            </div>
          </section>

          <div className="border-t border-border/60" />

          {/* Investment profile */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Investment profile
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="initial-aum">Initial AUM (£)</Label>
                <Input id="initial-aum" type="number" placeholder="1000000" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="risk-profile">Risk profile</Label>
                <select
                  id="risk-profile"
                  className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select profile</option>
                  <option>Conservative</option>
                  <option>Moderate</option>
                  <option>Balanced</option>
                  <option>Growth</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="investment-horizon">Investment horizon</Label>
              <select
                id="investment-horizon"
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select horizon</option>
                <option>1-3 years (Short term)</option>
                <option>3-7 years (Medium term)</option>
                <option>7-15 years (Long term)</option>
                <option>15+ years (Generational)</option>
              </select>
            </div>
          </section>

          <div className="border-t border-border/60" />

          {/* Initial allocation */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Initial allocation (%)
            </p>
            <p className="text-xs text-muted-foreground">
              Set the target allocation across JA entities. Values should sum to 100%.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "alloc-wealth", label: "JA Wealth" },
                { id: "alloc-realty", label: "JA Realty" },
                { id: "alloc-digital", label: "JA Digital" },
                { id: "alloc-capital", label: "JA Capital" },
                { id: "alloc-cash", label: "Cash & Equivalents" },
              ].map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5">
                  <Label htmlFor={item.id}>{item.label}</Label>
                  <div className="relative">
                    <Input
                      id={item.id}
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      className="pr-7"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-border/60" />

          {/* Legacy and goals */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Legacy and goals
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dependents">Number of dependents</Label>
                <Input id="dependents" type="number" min="0" placeholder="0" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="estate-status">Estate plan status</Label>
                <select
                  id="estate-status"
                  className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>Not started</option>
                  <option>In progress</option>
                  <option>Will in place</option>
                  <option>Fully established</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="primary-goals">Primary financial goals</Label>
              <textarea
                id="primary-goals"
                rows={2}
                placeholder="e.g. Wealth preservation, legacy planning, property acquisition..."
                className="flex w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </section>

          <div className="border-t border-border/60" />

          {/* Advisor notes */}
          <section className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Advisor notes
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="onboarding-notes">Initial notes</Label>
              <textarea
                id="onboarding-notes"
                rows={3}
                placeholder="Any relevant background, referral source, or onboarding context..."
                className="flex min-h-[60px] w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </section>
        </div>

        <SheetFooter className="flex gap-2 border-t border-border/60 pt-4">
          <SheetClose
            render={
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            }
          />
          <Button className="flex-1">Send invite</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddClientSheet };
