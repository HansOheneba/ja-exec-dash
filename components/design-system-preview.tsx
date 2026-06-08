"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageSection, PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Caption,
  Display,
  H1,
  H2,
  H3,
  H4,
  Lead,
  Muted,
  Overline,
  Text,
  TextSmall,
} from "@/components/ui/typography";

const semanticColors = [
  { name: "Primary", className: "bg-primary" },
  { name: "Secondary", className: "bg-secondary" },
  { name: "Accent", className: "bg-accent" },
  { name: "Muted", className: "bg-muted" },
  { name: "Destructive", className: "bg-destructive" },
  { name: "Sidebar", className: "bg-sidebar" },
];

const brandColors = [
  { name: "Brand Primary", className: "bg-brand-primary" },
  { name: "Brand Secondary", className: "bg-brand-secondary" },
  { name: "Brand Accent", className: "bg-brand-accent" },
  { name: "Mono Dark", className: "bg-brand-mono-dark" },
  { name: "Mono Mid", className: "bg-brand-mono-mid" },
  { name: "Mono Light", className: "bg-brand-mono-light" },
];

function ColorSwatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-12 rounded-lg border border-border ${className}`} />
      <Caption>{name}</Caption>
    </div>
  );
}

function DesignSystemPreview() {
  return (
    <DashboardShell>
      <PageShell className="flex flex-col gap-(--spacing-section)">
        <PageSection>
          <Overline>JA Group Design System</Overline>
          <Display>Design System Foundation</Display>
          <Lead>
            Centralized tokens for typography, color, and components. Change
            values in globals.css to update the entire dashboard.
          </Lead>
        </PageSection>

        <Separator />

        <PageSection>
          <H2>Typography</H2>
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              <div>
                <Overline>Display</Overline>
                <Display>Portfolio Overview</Display>
              </div>
              <div>
                <Overline>H1</Overline>
                <H1>Wealth Summary</H1>
              </div>
              <div>
                <Overline>H2</Overline>
                <H2>Recent Activity</H2>
              </div>
              <div>
                <Overline>H3</Overline>
                <H3>Asset Allocation</H3>
              </div>
              <div>
                <Overline>H4</Overline>
                <H4>Holdings by Sector</H4>
              </div>
              <div>
                <Overline>Body</Overline>
                <Text>
                  Your portfolio grew 4.2% this quarter, driven by strong
                  performance in real estate and alternative investments.
                </Text>
              </div>
              <div>
                <Overline>Lead</Overline>
                <Lead>
                  A concise introduction paragraph for page-level context.
                </Lead>
              </div>
              <div>
                <Overline>Small / Caption / Muted</Overline>
                <TextSmall>Secondary table or list content.</TextSmall>
                <Caption>Last updated 2 hours ago</Caption>
                <Muted>Helper text and de-emphasized content.</Muted>
              </div>
            </CardContent>
          </Card>
        </PageSection>

        <PageSection>
          <H2>Colors</H2>
          <Card>
            <CardHeader>
              <CardTitle>Semantic Tokens</CardTitle>
              <CardDescription>
                Used by shadcn components automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {semanticColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Brand Tokens</CardTitle>
              <CardDescription>
                Escape hatch for charts, marketing, and one-offs
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {brandColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </CardContent>
          </Card>
        </PageSection>

        <PageSection>
          <H2>Buttons</H2>
          <Card>
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>
        </PageSection>

        <PageSection>
          <H2>Badges</H2>
          <Card>
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>
        </PageSection>

        <PageSection>
          <H2>Table</H2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">JA Wealth</TableCell>
                    <TableCell>42%</TableCell>
                    <TableCell className="text-right">£1,240,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">JA Realty</TableCell>
                    <TableCell>28%</TableCell>
                    <TableCell className="text-right">£826,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">JA Digital</TableCell>
                    <TableCell>18%</TableCell>
                    <TableCell className="text-right">£531,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </PageSection>
      </PageShell>
    </DashboardShell>
  );
}

export { DesignSystemPreview };
