"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

const b2bServices = [
  "B2B SEO",
  "Website & CRO",
  "Paid Demand",
  "CRM & Marketing Ops",
  "Content & Demand",
  "Attribution & Reporting",
];

const navigation = [
  { label: "Dare Commerce", href: "/dare-commerce" },
  { label: "Lead Generation", href: "/lead-generation" },
  { label: "Works", href: "/works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link className={styles.logo} href="/" aria-label="Dare Network home" onClick={closeMenu}>
          <span>Dare</span>
          <span className={styles.logoNetwork}>Network<em>.</em></span>
        </Link>

        <ul className={styles.links}>
          <li className={styles.b2bItem}>
            <Link className={styles.link} href="/b2b" onClick={closeMenu}>
              B2B
              <svg className={styles.caret} viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
            <div className={styles.megaMenu}>
              <div className={styles.megaHeader}>
                <span>Dare B2B</span>
                <span>For B2B companies</span>
              </div>
              <div className={styles.megaGrid}>
                {b2bServices.map((service) => (
                  <Link key={service} href="/b2b#capabilities" onClick={closeMenu}>
                    {service}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {navigation.map(({ label, href }) => (
            <li key={label}>
              <Link className={styles.link} href={href} onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link className={styles.cta} href="/contact#call" onClick={closeMenu}>
          Get a Growth Diagnostic
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 7h11M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <button
          className={`${styles.burger}${menuOpen ? ` ${styles.burgerOpen}` : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu}${menuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
        id="site-mobile-menu"
        aria-hidden={!menuOpen}
      >
        <Link href="/b2b" onClick={closeMenu}>B2B</Link>
        {navigation.map(({ label, href }) => (
          <Link key={label} href={href} onClick={closeMenu}>{label}</Link>
        ))}
        <Link className={styles.mobileCta} href="/contact#call" onClick={closeMenu}>
          Get a Growth Diagnostic
        </Link>
      </div>
    </header>
  );
}
