import { doc, setDoc } from "firebase/firestore";
import { writeCache } from "../platformCache";

jest.mock("../../../firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

/* Firestore setDoc rejects documents containing undefined field values. ESPN's
   trimLeagueResponse produces them for absent optional fields (roster, away,
   playoffTierType, ...), so every cache write failed silently and
   private-league shared links had no fallback. The write must strip undefined
   before persisting. */
test("writeCache strips undefined fields before persisting", () => {
  (doc as jest.Mock).mockReturnValue({});
  (setDoc as jest.Mock).mockResolvedValue(undefined);

  writeCache("espn_123:matchups:2026:3", {
    id: 1,
    logo: undefined,
    roster: undefined,
    schedule: [{ home: { teamId: 4 }, away: undefined, playoffTierType: undefined }],
  });

  expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
    data: { id: 1, schedule: [{ home: { teamId: 4 } }] },
    cachedAt: expect.any(Number),
  });
});
