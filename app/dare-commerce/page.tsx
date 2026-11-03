import type { Metadata } from "next";
import DareCommerceContent from "./DareCommerceContent";
import "./dare-commerce.css";

export const metadata: Metadata = {
  title: "Dare Commerce | Dare Network",
  description:
    "A connected growth system for established D2C brands, spanning acquisition, creative, conversion, organic growth, and retention.",
};

export default function DareCommercePage() {
  return <DareCommerceContent />;
}