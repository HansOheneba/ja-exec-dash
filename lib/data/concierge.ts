// Concierge data: replace with API calls

export type ServiceRequestStatus = "submitted" | "in-progress" | "completed" | "pending";

export interface ServiceRequest {
  id: string;
  iconName: string;
  title: string;
  category: string;
  officer: string;
  submittedDate: string;
  expectedCompletion: string;
  status: ServiceRequestStatus;
  notes: string;
  nextStep?: string;
  lastUpdate?: string;
  progressPct?: number;
  requiresAttention?: boolean;
}

export interface ServiceItem {
  iconName: string;
  label: string;
  description: string;
}

export interface ServiceCategory {
  heading: string;
  jaExclusive?: boolean;
  services: ServiceItem[];
}

export interface ExclusiveEvent {
  id: string;
  type: "event" | "opportunity";
  title: string;
  date: string;
  location: string;
  description: string;
  cta: string;
  featured?: boolean;
}

export interface PartnerCategory {
  label: string;
  partners: string[];
}

export interface ConciergeOverview {
  activeCount: number;
  attentionCount: number;
  inProgressCount: number;
  nextMilestone: string;
  primaryOfficer: string;
}

export const activeRequests: ServiceRequest[] = [
  {
    id: "r1",
    iconName: "Globe",
    title: "Portugal NHR Application Support",
    category: "Citizenship by Investment",
    officer: "Kwame Asare",
    submittedDate: "15 May 2026",
    expectedCompletion: "Q1 2027",
    status: "in-progress",
    notes: "Due diligence complete. Awaiting document submission to Portuguese immigration authority.",
    nextStep: "Submit certified documents to immigration authority",
    lastUpdate: "12 Jun 2026 · Kwame Asare",
    progressPct: 65,
    requiresAttention: true,
  },
  {
    id: "r2",
    iconName: "CreditCard",
    title: "Offshore Bank Account: Singapore",
    category: "Offshore Banking",
    officer: "Sarah Kim",
    submittedDate: "2 Jun 2026",
    expectedCompletion: "28 Jun 2026",
    status: "submitted",
    notes: "Standard Chartered private banking application under review.",
    nextStep: "Awaiting bank compliance review (5 to 10 business days)",
    lastUpdate: "8 Jun 2026 · Sarah Kim",
    progressPct: 30,
    requiresAttention: false,
  },
  {
    id: "r3",
    iconName: "Gavel",
    title: "Tax Consultation: Ghana 2026",
    category: "Tax",
    officer: "Kofi Mensah",
    submittedDate: "18 Apr 2026",
    expectedCompletion: "30 Apr 2026",
    status: "completed",
    notes: "Completed. Annual tax summary prepared and uploaded to your documents.",
    nextStep: "Closed",
    lastUpdate: "30 Apr 2026 · Kofi Mensah",
    progressPct: 100,
    requiresAttention: false,
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    heading: "Travel and Lifestyle",
    services: [
      { iconName: "Car",      label: "Airport Transfer",     description: "Premium, tracked ground transport" },
      { iconName: "Plane",    label: "Travel Planning",      description: "Private and business travel" },
      { iconName: "Sparkles", label: "Lifestyle Assistance", description: "General concierge requests" },
    ],
  },
  {
    heading: "Property",
    services: [
      { iconName: "Home", label: "Property Search", description: "Residential or commercial (via JA Realty)" },
    ],
  },
  {
    heading: "Advisory and Legal",
    services: [
      { iconName: "Gavel",    label: "Legal Consultation",  description: "Referral to JA partner firms" },
      { iconName: "Shield",   label: "Insurance Review",    description: "Coverage comparison and optimisation" },
      { iconName: "Briefcase",label: "Business Advisory",   description: "Expansion and capital strategy" },
      { iconName: "Globe",    label: "Tax Consultation",    description: "Local and international" },
    ],
  },
  {
    heading: "JA Exclusive",
    jaExclusive: true,
    services: [
      { iconName: "Globe",      label: "Citizenship / Residency", description: "CBI processing and application support" },
      { iconName: "CreditCard", label: "Offshore Banking",        description: "Introduce and open accounts internationally" },
    ],
  },
];

export const exclusiveEvents: ExclusiveEvent[] = [
  {
    id: "e2",
    type: "opportunity",
    title: "Pre-IPO: Accra Digital Exchange",
    date: "Closes 15 Jul 2026",
    location: "JA Digital",
    description:
      "Early-access opportunity in Ghana's first regulated crypto and digital securities exchange. Minimum $50,000.",
    cta: "Register interest",
    featured: true,
  },
  {
    id: "e1",
    type: "event",
    title: "JA Private Investment Briefing",
    date: "3 Jul 2026",
    location: "Mayfair, London",
    description:
      "Exclusive Q3 outlook for JA clients. Featuring commentary on African private equity, UK real estate, and global fixed income.",
    cta: "RSVP",
  },
  {
    id: "e3",
    type: "opportunity",
    title: "JA Realty: Dubai Waterfront Co-investment",
    date: "Closes 30 Jun 2026",
    location: "JA Realty",
    description:
      "Fractional co-investment in a premium Dubai waterfront development. Projected yield: 6.8% p.a.",
    cta: "Register interest",
  },
];

export const partnerNetworkItems = [
  "Standard Chartered Private Banking",
  "Barclays Private",
  "Freshfields Bruckhaus Deringer",
  "Knight Frank",
  "JA Realty",
  "JA Elements",
  "CAL Bank Ghana",
  "Malta Residency Program",
];

export const partnerCategories: PartnerCategory[] = [
  {
    label: "Private banking",
    partners: ["Standard Chartered Private Banking", "Barclays Private", "CAL Bank Ghana"],
  },
  {
    label: "Legal and tax",
    partners: ["Freshfields Bruckhaus Deringer"],
  },
  {
    label: "Real estate",
    partners: ["Knight Frank", "JA Realty"],
  },
  {
    label: "Residency and lifestyle",
    partners: ["JA Elements", "Malta Residency Program"],
  },
];

export function getConciergeOverview(): ConciergeOverview {
  const active = activeRequests.filter((r) => r.status !== "completed");
  const attention = activeRequests.filter((r) => r.requiresAttention);
  const inProgress = activeRequests.filter((r) => r.status === "in-progress");

  const nextActive = [...active]
    .filter((r) => r.expectedCompletion)
    .sort((a, b) => a.expectedCompletion.localeCompare(b.expectedCompletion))[0];

  return {
    activeCount: active.length,
    attentionCount: attention.length,
    inProgressCount: inProgress.length,
    nextMilestone: nextActive?.expectedCompletion ?? "None scheduled",
    primaryOfficer: "Kwame Asare",
  };
}

