/**
 * useNewsletterDoc — read the Firestore document for a newsletter (#108).
 *
 * Plain cached read, mirroring useLeagueDoc. Shares the ["newsletter", id]
 * query key with NewsletterHome so the NavBar and the page dedupe into one
 * fetch.
 */
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getNewsletter } from "../services/firestoreCrud";
import type { NewsletterDoc } from "../types/firestore";

export function useNewsletterDoc(
  newsletterId: string | undefined
): UseQueryResult<NewsletterDoc | null> {
  return useQuery<NewsletterDoc | null>({
    queryKey: ["newsletter", newsletterId],
    enabled: !!newsletterId,
    queryFn: () => getNewsletter(newsletterId!),
  });
}
