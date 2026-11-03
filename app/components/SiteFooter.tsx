import Link from "next/link";

const footerNavigation = [
  {
    title: "Commerce",
    links: [{ label: "Dare Commerce", href: "/dare-commerce" }],
  },
  {
    title: "Growth",
    links: [
      { label: "B2B", href: "/b2b" },
      { label: "Lead Generation", href: "/lead-generation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Works", href: "/works" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <div className="logo">
              <span>Dare</span>
              <span className="n">
                Network<em>.</em>
              </span>
            </div>
            <div className="f-cities">
              <span>Bengaluru</span>
              <span>Kochi</span>
              <span>Dubai</span>
            </div>
            <p>
              We build growth systems for D2C brands and B2B companies across India, the GCC, the
              UK and beyond.
            </p>
            <div className="f-social">
              <a
                href="https://in.linkedin.com/company/the-dare-network"
                aria-label="Dare Network on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M3.2 1.6a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM1.7 6h3v8.4h-3V6zm5 0h2.9v1.15h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2 3.61 4.62v4.19h-3v-3.72c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97v3.78h-3V6z" />
                </svg>
              </a>
            </div>
          </div>

          {footerNavigation.map(({ title, links }) => (
            <div className="f-col" key={title}>
              <h5>{title}</h5>
              <ul>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="f-col">
            <h5>Address</h5>
            <address>
              Novel Tech Park, Second Floor,
              <br />
              46/4, Hosur Rd, Kudlu Gate,
              <br />
              Krishna Reddy Industrial Area,
              <br />
              HSR Extension, Bengaluru,
              <br />
              Karnataka 560068
            </address>
          </div>
        </div>

        <div className="f-bar">
          <div>© 2026 Dare Network. All rights reserved.</div>
          <div>India &nbsp;•&nbsp; GCC &nbsp;•&nbsp; UK</div>
        </div>
      </div>
      <div className="ghost" aria-hidden="true">
        Dare
      </div>
    </footer>
  );
}
