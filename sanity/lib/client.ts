import "server-only";

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured = Boolean(projectId);

export function sanityFetch<QueryResult>(
  query: string,
  params: Record<string, string> = {},
  tag: string,
) {
  if (!projectId) {
    throw new Error("Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.");
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    useCdn: true,
    perspective: "published",
    token: process.env.SANITY_API_READ_TOKEN,
  });

  return client.fetch<QueryResult>(query, params, {
    next: { revalidate: 60, tags: [tag] },
  });
}
