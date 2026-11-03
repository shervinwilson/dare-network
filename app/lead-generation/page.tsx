import type { Metadata } from "next";
import LeadGenerationContent from "./LeadGenerationContent";
import "./lead-generation.css";

export const metadata: Metadata = {
  title: "High-Ticket Lead Generation | Dare Network",
  description: "Lead-to-revenue systems for high-ticket service businesses, built to generate more qualified sales conversations.",
};

export default function LeadGenerationPage() {
  return <LeadGenerationContent />;
}
