import type {
  CASE_STUDIES_QUERY_RESULT,
  CASE_STUDY_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POST_QUERY_RESULT,
} from "@/sanity.types";

export type CaseStudySummary = CASE_STUDIES_QUERY_RESULT[number];
export type CaseStudy = NonNullable<CASE_STUDY_QUERY_RESULT>;
export type BlogPostSummary = POSTS_QUERY_RESULT[number];
export type BlogPost = NonNullable<POST_QUERY_RESULT>;

export type PortableTextBlock =
  | NonNullable<NonNullable<CASE_STUDY_QUERY_RESULT>["challenge"]>[number]
  | NonNullable<NonNullable<POST_QUERY_RESULT>["body"]>[number];
