import type { Metadata } from "next";
import "./globals.css";
import "./content.css";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Dare Network",
  description: "Dare Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}