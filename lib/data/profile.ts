// Client profile data: replace with API calls

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  isBeneficiary: boolean;
}

export interface LinkedAccount {
  id: string;
  institution: string;
  type: string;
  jurisdiction: string;
  status: "Active" | "Pending" | "Closed";
}

export interface CitizenshipItem {
  id: string;
  label: string;
  status: "Active" | "In progress" | "Expired";
  detail: string;
}

export interface ClientProfile {
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  nationality: string;
  taxResidency: string;
  onboardedDate: string;
  advisorName: string;
  familyMembers: FamilyMember[];
  linkedAccounts: LinkedAccount[];
  citizenshipItems: CitizenshipItem[];
}

export const clientProfile: ClientProfile = {
  fullName: "Lois Lane",
  initials: "LL",
  email: "l.lane@email.com",
  phone: "+44 7700 900123",
  nationality: "British / Ghanaian",
  taxResidency: "United Kingdom",
  onboardedDate: "January 2024",
  advisorName: "Jude Addo",
  familyMembers: [
    { id: "f1", name: "Marcus Lane", relation: "Spouse",   isBeneficiary: true  },
    { id: "f2", name: "Amara Lane",  relation: "Daughter", isBeneficiary: true  },
    { id: "f3", name: "Kofi Lane",   relation: "Son",      isBeneficiary: true  },
  ],
  linkedAccounts: [
    { id: "a1", institution: "Barclays Private",                    type: "Primary UK",      jurisdiction: "UK",        status: "Active"  },
    { id: "a2", institution: "CAL Bank",                            type: "Operations",      jurisdiction: "Ghana",     status: "Active"  },
    { id: "a3", institution: "Standard Chartered (pending)",        type: "Private banking", jurisdiction: "Singapore", status: "Pending" },
  ],
  citizenshipItems: [
    { id: "c1", label: "British Passport",         status: "Active",      detail: "Expires Nov 2032" },
    { id: "c2", label: "Ghanaian Passport",        status: "Active",      detail: "Expires Mar 2029" },
    { id: "c3", label: "Portugal NHR Application", status: "In progress", detail: "Expected Q1 2027" },
  ],
};
