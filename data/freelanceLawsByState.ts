export type StateLawStatus =
  | "verified-has-law"      // statewide freelance payment protection law confirmed
  | "verified-no-law"       // actively confirmed: no statewide law exists
  | "coming-soon"           // page/deep content planned, not yet published
  | "not-yet-verified";     // default for states not yet legally researched

export interface StateFreelanceLaw {
  state: string;            // "California"
  code: string;             // "CA"
  status: StateLawStatus;
  lawName?: string;
  effectiveDate?: string;
  paymentThreshold?: string;      // e.g. "$250 in a 120-day period"
  paymentDeadline?: string;       // e.g. "30 days after completion if unspecified"
  sourceUrl?: string;             // link to the .gov or statute source
  lastVerified?: string;          // ISO date you personally checked this
  detailPageSlug?: string;        // link to an existing deep page, if one exists
  note?: string;                  // optional single-line note for special status card copy
}

export const freelanceLawsByState: StateFreelanceLaw[] = [
  // 1. California
  {
    state: "California",
    code: "CA",
    status: "verified-has-law",
    lawName: "SB 988 — Freelance Worker Protection Act",
    effectiveDate: "January 1, 2025",
    paymentThreshold: "$250",
    paymentDeadline: "30 days after completion if unspecified",
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB988",
    lastVerified: "2026-08-04",
    detailPageSlug: "/tools/ca-contractor-laws",
  },
  // 2. Illinois
  {
    state: "Illinois",
    code: "IL",
    status: "verified-has-law",
    lawName: "Freelance Worker Protection Act (FWPA)",
    effectiveDate: "July 1, 2024",
    paymentThreshold: "$500 in a 120-day period",
    paymentDeadline: "30 days after completion if unspecified",
    sourceUrl: "https://labor.illinois.gov",
    lastVerified: "2026-08-04",
  },
  // 3. New York
  {
    state: "New York",
    code: "NY",
    status: "verified-has-law",
    lawName: "Freelance Isn't Free Act (statewide)",
    effectiveDate: "August 28, 2024",
    paymentThreshold: "$800 in a 120-day period",
    paymentDeadline: "30 days after completion if unspecified",
    sourceUrl: "https://dol.ny.gov/freelance-isnt-free-act",
    lastVerified: "2026-08-04",
  },
  // 4. Washington
  {
    state: "Washington",
    code: "WA",
    status: "verified-no-law",
    note: "No statewide freelance payment law — WA's ABC test (RCW 50.04.140) applies to unemployment insurance/workers' comp classification, not freelance contracts.",
    lastVerified: "2026-08-04",
    detailPageSlug: "/compliance/washington",
  },
  // 5. Oregon
  {
    state: "Oregon",
    code: "OR",
    status: "coming-soon",
    detailPageSlug: "/compliance/oregon",
  },
  // 6. Alabama
  { state: "Alabama", code: "AL", status: "not-yet-verified" },
  // 7. Alaska
  { state: "Alaska", code: "AK", status: "not-yet-verified" },
  // 8. Arizona
  { state: "Arizona", code: "AZ", status: "not-yet-verified" },
  // 9. Arkansas
  { state: "Arkansas", code: "AR", status: "not-yet-verified" },
  // 10. Colorado
  { state: "Colorado", code: "CO", status: "not-yet-verified" },
  // 11. Connecticut
  { state: "Connecticut", code: "CT", status: "not-yet-verified" },
  // 12. Delaware
  { state: "Delaware", code: "DE", status: "not-yet-verified" },
  // 13. District of Columbia
  { state: "District of Columbia", code: "DC", status: "not-yet-verified" },
  // 14. Florida
  { state: "Florida", code: "FL", status: "not-yet-verified" },
  // 15. Georgia
  { state: "Georgia", code: "GA", status: "not-yet-verified" },
  // 16. Hawaii
  { state: "Hawaii", code: "HI", status: "not-yet-verified" },
  // 17. Idaho
  { state: "Idaho", code: "ID", status: "not-yet-verified" },
  // 18. Indiana
  { state: "Indiana", code: "IN", status: "not-yet-verified" },
  // 19. Iowa
  { state: "Iowa", code: "IA", status: "not-yet-verified" },
  // 20. Kansas
  { state: "Kansas", code: "KS", status: "not-yet-verified" },
  // 21. Kentucky
  { state: "Kentucky", code: "KY", status: "not-yet-verified" },
  // 22. Louisiana
  { state: "Louisiana", code: "LA", status: "not-yet-verified" },
  // 23. Maine
  { state: "Maine", code: "ME", status: "not-yet-verified" },
  // 24. Maryland
  { state: "Maryland", code: "MD", status: "not-yet-verified" },
  // 25. Massachusetts
  { state: "Massachusetts", code: "MA", status: "not-yet-verified" },
  // 26. Michigan
  { state: "Michigan", code: "MI", status: "not-yet-verified" },
  // 27. Minnesota
  { state: "Minnesota", code: "MN", status: "not-yet-verified" },
  // 28. Mississippi
  { state: "Mississippi", code: "MS", status: "not-yet-verified" },
  // 29. Missouri
  { state: "Missouri", code: "MO", status: "not-yet-verified" },
  // 30. Montana
  { state: "Montana", code: "MT", status: "not-yet-verified" },
  // 31. Nebraska
  { state: "Nebraska", code: "NE", status: "not-yet-verified" },
  // 32. Nevada
  { state: "Nevada", code: "NV", status: "not-yet-verified" },
  // 33. New Hampshire
  { state: "New Hampshire", code: "NH", status: "not-yet-verified" },
  // 34. New Jersey
  { state: "New Jersey", code: "NJ", status: "not-yet-verified" },
  // 35. New Mexico
  { state: "New Mexico", code: "NM", status: "not-yet-verified" },
  // 36. North Carolina
  { state: "North Carolina", code: "NC", status: "not-yet-verified" },
  // 37. North Dakota
  { state: "North Dakota", code: "ND", status: "not-yet-verified" },
  // 38. Ohio
  { state: "Ohio", code: "OH", status: "not-yet-verified" },
  // 39. Oklahoma
  { state: "Oklahoma", code: "OK", status: "not-yet-verified" },
  // 40. Pennsylvania
  { state: "Pennsylvania", code: "PA", status: "not-yet-verified" },
  // 41. Rhode Island
  { state: "Rhode Island", code: "RI", status: "not-yet-verified" },
  // 42. South Carolina
  { state: "South Carolina", code: "SC", status: "not-yet-verified" },
  // 43. South Dakota
  { state: "South Dakota", code: "SD", status: "not-yet-verified" },
  // 44. Tennessee
  { state: "Tennessee", code: "TN", status: "not-yet-verified" },
  // 45. Texas
  { state: "Texas", code: "TX", status: "not-yet-verified" },
  // 46. Utah
  { state: "Utah", code: "UT", status: "not-yet-verified" },
  // 47. Vermont
  { state: "Vermont", code: "VT", status: "not-yet-verified" },
  // 48. Virginia
  { state: "Virginia", code: "VA", status: "not-yet-verified" },
  // 49. West Virginia
  { state: "West Virginia", code: "WV", status: "not-yet-verified" },
  // 50. Wisconsin
  { state: "Wisconsin", code: "WI", status: "not-yet-verified" },
  // 51. Wyoming
  { state: "Wyoming", code: "WY", status: "not-yet-verified" },
];
