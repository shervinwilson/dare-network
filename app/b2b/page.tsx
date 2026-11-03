import type { Metadata } from "next";
import "./b2b.css";
import B2BContent from "./B2BContent";

export const metadata: Metadata = {
  title: "B2B | Dare Network",
  description:
    "Build a connected B2B growth system that turns market demand into qualified pipeline.",
};

export default function B2BPage() {
  return <B2BContent />;
}
