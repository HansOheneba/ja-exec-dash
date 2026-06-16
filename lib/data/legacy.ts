// Legacy and estate data. Replace with API calls.

export type WillStatus = "current" | "review-required" | "not-in-place";
export type PoaStatus = "in-place" | "not-in-place";

export interface Dependent {
  id: string;
  name: string;
  relation: string;
  dateOfBirth: string;
  guardian?: string;
  notes?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  relation: string;
  allocationPct: number;
  instrument: string;
}

export interface TrustStructure {
  id: string;
  name: string;
  type: string;
  jurisdictionFormed: string;
  established: string;
  estimatedValueUSD: number;
  status: "active" | "pending" | "dormant";
  trustees: string[];
  beneficiaries: string[];
  notes: string;
}

export interface SuccessionMilestone {
  id: string;
  title: string;
  targetDate: string;
  status: "completed" | "in-progress" | "pending";
  notes: string;
}

export interface LegacyProfile {
  willStatus: WillStatus;
  willLastUpdated: string;
  willSolicitor: string;
  powerOfAttorney: PoaStatus;
  poaHolder: string;
  dependents: Dependent[];
  beneficiaries: Beneficiary[];
  trustStructures: TrustStructure[];
  successionMilestones: SuccessionMilestone[];
  advisorNote: string;
}

export const legacyProfile: LegacyProfile = {
  willStatus: "review-required",
  willLastUpdated: "March 2023",
  willSolicitor: "Freshfields Bruckhaus Deringer",
  powerOfAttorney: "in-place",
  poaHolder: "Marcus Lane (Spouse)",
  dependents: [
    { id: "d1", name: "Marcus Lane",  relation: "Spouse",   dateOfBirth: "14 Aug 1979", notes: "Primary beneficiary. Joint mortgage on Canary Wharf property." },
    { id: "d2", name: "Amara Lane",   relation: "Daughter", dateOfBirth: "3 Apr 2010",  guardian: "Marcus Lane", notes: "Named in will and as trust beneficiary." },
    { id: "d3", name: "Kofi Lane",    relation: "Son",      dateOfBirth: "18 Nov 2013", guardian: "Marcus Lane", notes: "Named in will and as trust beneficiary." },
  ],
  beneficiaries: [
    { id: "b1", name: "Marcus Lane",  relation: "Spouse",   allocationPct: 50, instrument: "Lois Lane Family Trust + Life Insurance" },
    { id: "b2", name: "Amara Lane",   relation: "Daughter", allocationPct: 25, instrument: "Lois Lane Family Trust" },
    { id: "b3", name: "Kofi Lane",    relation: "Son",      allocationPct: 25, instrument: "Lois Lane Family Trust" },
  ],
  trustStructures: [
    {
      id: "t1",
      name: "Lois Lane Family Trust",
      type: "Discretionary trust",
      jurisdictionFormed: "England and Wales",
      established: "January 2024",
      estimatedValueUSD: 4_180_000,
      status: "active",
      trustees: ["Lois Lane", "Marcus Lane", "Freshfields Corporate Trustee Ltd"],
      beneficiaries: ["Marcus Lane", "Amara Lane", "Kofi Lane"],
      notes: "Primary vehicle for wealth preservation and intergenerational transfer. Reviewed annually alongside financial plan.",
    },
  ],
  successionMilestones: [
    { id: "m1", title: "Will drafted and signed",             targetDate: "Mar 2023",     status: "completed",   notes: "Initial will in place. Review recommended as estate has grown significantly." },
    { id: "m2", title: "Family trust established",            targetDate: "Jan 2024",     status: "completed",   notes: "Lois Lane Family Trust established and funded." },
    { id: "m3", title: "Will review and update",              targetDate: "Sep 2026",     status: "in-progress", notes: "Estate has grown. New CBI goal and Dubai property should be reflected in will." },
    { id: "m4", title: "Children's education trust sub-fund", targetDate: "Dec 2026",     status: "pending",     notes: "Ring-fencing education allocation inside the family trust." },
    { id: "m5", title: "Offshore succession memo",            targetDate: "Mar 2027",     status: "pending",     notes: "Governance memo for Singapore and Ghana accounts following offshore banking review." },
  ],
  advisorNote: "Your legacy structure is well-founded but requires updating. The will was last reviewed in 2023 before the Dubai property goal and the Portuguese NHR application. I strongly recommend a dedicated estate planning session in Q3 to bring all documents current.",
};
