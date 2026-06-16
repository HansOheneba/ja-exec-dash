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
    id: "e2",
    type: "opportunity",
    title: "Pre-IPO: Accra Digital Exchange",
    date: "Closes 15 Jul 2026",
    location: "JA Digital",
    description:
      "Early-access opportunity in Ghana's first regulated crypto and digital securities exchange. Minimum $50,000.",
    cta: "Register interest",
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
