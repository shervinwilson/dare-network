import "server-only";

import { isSanityConfigured, sanityFetch } from "./client";
import {
  CASE_STUDIES_QUERY,
  CASE_STUDY_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  POST_SLUGS_QUERY,
} from "./queries";
import type { BlogPost, BlogPostSummary, CaseStudy, CaseStudySummary } from "./types";

type SlugResult = { slug: string }[];

export async function getCaseStudies() {
  if (!isSanityConfigured) return null;
  return sanityFetch<CaseStudySummary[]>(CASE_STUDIES_QUERY, {}, "caseStudy");
}

export async function getCaseStudy(slug: string) {
  if (!isSanityConfigured) return null;
  return sanityFetch<CaseStudy | null>(CASE_STUDY_QUERY, { slug }, "caseStudy");
}

export async function getCaseStudySlugs() {
  if (!isSanityConfigured) return [];
  return sanityFetch<SlugResult>(CASE_STUDY_SLUGS_QUERY, {}, "caseStudy");
}

export async function getPosts() {
  if (!isSanityConfigured) return null;
  return sanityFetch<BlogPostSummary[]>(POSTS_QUERY, {}, "post");
}

export async function getPost(slug: string) {
  if (!isSanityConfigured) return null;
  return sanityFetch<BlogPost | null>(POST_QUERY, { slug }, "post");
}

export async function getPostSlugs() {
  if (!isSanityConfigured) return [];
  return sanityFetch<SlugResult>(POST_SLUGS_QUERY, {}, "post");
}
