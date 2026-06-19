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

export type LegacyHealthStatus = "healthy" | "warning" | "critical";

export interface LegacyHealthOverview {
  readinessScorePct: number;
  status: LegacyHealthStatus;
  statusLabel: string;
  risks: string[];
  missingItems: string[];
}

export function getLegacyHealthOverview(profile: LegacyProfile): LegacyHealthOverview {
  const risks: string[] = [];
  const missingItems: string[] = [];
  let score = 100;

  if (profile.willStatus === "not-in-place") {
    score -= 45;
    risks.push("No will in place. Estate distribution would follow intestacy rules.");
    missingItems.push("Draft and execute a will with your solicitor");
  } else if (profile.willStatus === "review-required") {
    score -= 28;
    risks.push("Will last updated in 2023. Recent property and residency goals are not reflected.");
    missingItems.push("Schedule will review to align with current estate");
  }

  if (profile.powerOfAttorney === "not-in-place") {
    score -= 18;
    risks.push("No lasting power of attorney on file.");
    missingItems.push("Establish lasting power of attorney");
  }

  const allocationTotal = profile.beneficiaries.reduce((sum, b) => sum + b.allocationPct, 0);
  const allocationGap = Math.max(0, 100 - allocationTotal);
  if (allocationGap > 0) {
    score -= Math.min(15, Math.round(allocationGap / 5));
    risks.push(`${allocationGap}% of estate allocation remains unassigned.`);
    missingItems.push("Complete beneficiary allocation across all instruments");
  }

  const pendingMilestones = profile.successionMilestones.filter((m) => m.status === "pending");
  const inProgressMilestones = profile.successionMilestones.filter((m) => m.status === "in-progress");
  if (inProgressMilestones.length > 0) {
    score -= 6;
    inProgressMilestones.forEach((m) => {
      if (!missingItems.some((item) => item.includes(m.title))) {
        missingItems.push(`Complete: ${m.title}`);
      }
    });
  }
  if (pendingMilestones.length >= 2) {
    score -= 4;
  }

  const activeTrusts = profile.trustStructures.filter((t) => t.status === "active").length;
  if (activeTrusts === 0 && profile.trustStructures.length === 0) {
    score -= 10;
    risks.push("No trust structure established for wealth transfer.");
  }

  const readinessScorePct = Math.max(0, Math.min(100, score));

  let status: LegacyHealthStatus = "healthy";
  let statusLabel = "Well established";
  if (readinessScorePct < 50 || profile.willStatus === "not-in-place") {
    status = "critical";
    statusLabel = "Critical attention required";
  } else if (readinessScorePct < 80 || profile.willStatus === "review-required") {
    status = "warning";
    statusLabel = "Needs attention";
  }

  return {
    readinessScorePct,
    status,
    statusLabel,
    risks: risks.slice(0, 3),
    missingItems: missingItems.slice(0, 2),
  };
}

export function getBeneficiaryAllocationSummary(profile: LegacyProfile) {
  const totalPct = profile.beneficiaries.reduce((sum, b) => sum + b.allocationPct, 0);
  const gapPct = Math.max(0, 100 - totalPct);
  const estateValue = profile.trustStructures.reduce((sum, t) => sum + t.estimatedValueUSD, 0);

  return {
    totalPct,
    gapPct,
    beneficiaryCount: profile.beneficiaries.length,
    coveredValueUSD: estateValue * (totalPct / 100),
    estateValueUSD: estateValue,
  };
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
