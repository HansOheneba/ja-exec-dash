// Liabilities data: all monetary values in USD. Replace with API calls.

export type LiabilityType = "mortgage" | "personal-loan" | "credit-facility" | "business-loan";
export type LiabilityStatus = "current" | "attention-required";

export interface Liability {
  id: string;
  name: string;
  lender: string;
  type: LiabilityType;
  originalAmountUSD: number;
  outstandingUSD: number;
  interestRatePct: number;
  monthlyPaymentUSD: number;
  startDate: string;
  maturityDate: string;
  status: LiabilityStatus;
  notes?: string;
}

export const liabilities: Liability[] = [
  {
    id: "l1",
    name: "Canary Wharf Residential Mortgage",
    lender: "Barclays Private",
    type: "mortgage",
    originalAmountUSD: 480_000,
    outstandingUSD: 312_000,
    interestRatePct: 3.85,
    monthlyPaymentUSD: 2_410,
    startDate: "Mar 2019",
    maturityDate: "Mar 2034",
    status: "current",
    notes: "Fixed rate until Mar 2027, then reverts to tracker.",
  },
  {
    id: "l2",
    name: "Accra Office Space Finance",
    lender: "CAL Bank",
    type: "mortgage",
    originalAmountUSD: 180_000,
    outstandingUSD: 94_000,
    interestRatePct: 22.0,
    monthlyPaymentUSD: 2_100,
    startDate: "Jul 2021",
    maturityDate: "Jul 2028",
    status: "current",
  },
  {
    id: "l3",
    name: "Business Expansion Credit Facility",
    lender: "Standard Chartered",
    type: "credit-facility",
    originalAmountUSD: 250_000,
    outstandingUSD: 140_000,
    interestRatePct: 7.25,
    monthlyPaymentUSD: 0,
    startDate: "Jan 2025",
    maturityDate: "Jan 2027",
    status: "current",
    notes: "Revolving facility. Interest only until drawdown. Renewal due Jan 2027.",
  },
  {
    id: "l4",
    name: "Dubai Property Deposit Loan",
    lender: "HSBC Private",
    type: "personal-loan",
    originalAmountUSD: 120_000,
    outstandingUSD: 120_000,
    interestRatePct: 6.1,
    monthlyPaymentUSD: 1_850,
    startDate: "Jun 2026",
    maturityDate: "Jun 2031",
    status: "attention-required",
    notes: "Bridge loan pending property purchase completion. Review with Jude at June session.",
  },
];

export const liabilitySummary = {
  totalAssetValueUSD: 4_180_000,
  totalOutstandingUSD: liabilities.reduce((s, l) => s + l.outstandingUSD, 0),
  monthlyDebtServiceUSD: liabilities.reduce((s, l) => s + l.monthlyPaymentUSD, 0),
};

liabilitySummary.totalOutstandingUSD = liabilities.reduce((s, l) => s + l.outstandingUSD, 0);
