import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact | Dare Network",
  description:
    "Talk to Dare Network about building a compounding growth system for your brand.",
};

export default function ContactPage() {
  return <ContactContent />;
}