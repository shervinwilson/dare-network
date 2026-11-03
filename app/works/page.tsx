import type { Metadata } from "next";
import WorksContent from "./WorksContent";
import "./works.css";
import { getCaseStudies } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Selected Work | Dare Network",
  description: "Explore Dare Network's selected commerce and B2B work, growth systems, and measurable results.",
};

export default async function WorksPage() {
  const caseStudies = await getCaseStudies();
  return <WorksContent caseStudies={caseStudies} />;
}
