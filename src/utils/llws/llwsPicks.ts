export interface LLWSPick {
  member: string;
  team: string | null;
  note?: string;
}

export const llwsPicks: LLWSPick[] = [
  { member: "Devan", team: null, note: "N/A - retired from league" },
  { member: "Smitty", team: "West" },
  { member: "Alec", team: "Japan" },
  { member: "Kyle", team: "Asia-Pacific" },
  { member: "Matt Rob", team: "Southwest" },
  { member: "Greg", team: "Mexico" },
  { member: "Trevor", team: "Southeast" },
  { member: "Josh L", team: "Caribbean" },
  { member: "Nikhil", team: "Australia" },
  { member: "Anthony", team: "Northwest" },
  { member: "Josh K", team: "Metro" },
  { member: "Jake", team: "New England" },
  { member: "TBD", team: null, note: "Open spot — Devan retired" },
];

export const llwsYear = 2026;
