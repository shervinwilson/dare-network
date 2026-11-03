"use client";

import { useEffect, useRef } from "react";

export default function DareCommerceContent() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );
    page.querySelectorAll<HTMLElement>(".rv").forEach((element, index) => {
      element.style.transitionDelay = String((index % 4) * 70) + "ms";
      revealObserver.observe(element);
    });

    const diagnosticNodes = Array.from(
      page.querySelectorAll<HTMLElement>(".dn[data-n]"),
    );
    const status = page.querySelector<HTMLElement>("#diagStatus");
    const name = page.querySelector<HTMLElement>("#diagName");
    let diagnosticTimeout: ReturnType<typeof setTimeout> | undefined;
    let diagnosticIndex = 0;
    const cycleDiagnostic = () => {
      diagnosticNodes.forEach((node) => node.classList.remove("hit"));
      if (status) status.textContent = "Scanning";
      diagnosticTimeout = setTimeout(() => {
        const node = diagnosticNodes[diagnosticIndex % diagnosticNodes.length];
        node.classList.add("hit");
        if (status) status.textContent = "Constraint found";
        if (name)
          name.textContent = node.querySelector(".k")?.textContent ?? "";
        diagnosticIndex += 1;
      }, 700);
    };
    let diagnosticInterval: ReturnType<typeof setInterval> | undefined;
    if (diagnosticNodes.length > 0) {
      cycleDiagnostic();
      diagnosticInterval = setInterval(cycleDiagnostic, 2800);
    }

    return () => {
      revealObserver.disconnect();
      if (diagnosticTimeout !== undefined) clearTimeout(diagnosticTimeout);
      if (diagnosticInterval !== undefined) clearInterval(diagnosticInterval);
    };
  }, []);

  return (
    <main className="commerce-page" ref={pageRef}>
      <div className={"announce"}>
        {" "}
        Accepting a limited number of D2C growth partnerships for Q4  →
      </div>

      {/* ═══ 01 · GLOBAL NAV ═══ */}

      {/* contextual sub-nav */}

      {/* ═══ 02 · HERO ═══ */}

      <section className={"hero"}>
        <div className={"wrap"}>
          <div className={"hero-grid"}>
            <div>
              <div className={"eyebrow"}> Dare Commerce / D2C Growth</div>

              <h1 className={"d1"}>
                {" "}
                Your next growth problem probably isn&apos;t just Meta{" "}
                <span className={"dot"}> .</span>
              </h1>

              <p className={"hero-sub"}>
                We help D2C brands find what&apos;s constraining growth across
                acquisition, creative, conversion, organic and retention, and
                build the system to solve it.
              </p>

              <div className={"hero-cta"}>
                <a href={"#diagnostic"} className={"btn btn-red"}>
                  {" "}
                  Get a D2C Growth Diagnostic
                  <svg
                    width={"14"}
                    height={"14"}
                    viewBox={"0 0 14 14"}
                    fill={"none"}
                  >
                    {" "}
                    <path
                      d={"M1 7h11M8 3l4 4-4 4"}
                      stroke={"currentColor"}
                      strokeWidth={"1.6"}
                      strokeLinecap={"round"}
                      strokeLinejoin={"round"}
                    ></path>
                  </svg>
                </a>
                <a href={"#work"} className={"btn btn-ghost"}>
                  {" "}
                  See Our Commerce Work
                  <svg
                    width={"14"}
                    height={"14"}
                    viewBox={"0 0 14 14"}
                    fill={"none"}
                  >
                    {" "}
                    <path
                      d={"M1 7h11M8 3l4 4-4 4"}
                      stroke={"currentColor"}
                      strokeWidth={"1.6"}
                      strokeLinecap={"round"}
                      strokeLinejoin={"round"}
                    ></path>
                  </svg>
                </a>
              </div>

              <div className={"hero-caps"}>
                <span> Performance</span> <span> Creative</span>{" "}
                <span> SEO</span> <span> CRO</span> <span> Retention</span>{" "}
                <span> Commerce Tech</span>
              </div>
            </div>

            {/* diagnostic tree */}

            <div className={"diag"}>
              <div className={"diag-hd"}>
                <div className={"t"}> Growth Diagnostic</div>

                <div className={"st"}>
                  {" "}
                  <i></i> <span id={"diagStatus"}> Scanning</span>
                </div>
              </div>

              <div className={"tier t1"}>
                <div className={"dn top"}>
                  <div className={"k"}> Revenue</div>
                  <div className={"v"}> The outcome</div>
                </div>
              </div>

              <div className={"tier-link"}>
                {" "}
                <svg
                  width={"10"}
                  height={"14"}
                  viewBox={"0 0 10 14"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M5 14V2M1 6l4-4 4 4"}
                    stroke={"currentColor"}
                    strokeWidth={"1.2"}
                  ></path>
                </svg>
              </div>

              <div className={"tier t3"}>
                <div className={"dn"} data-n={""}>
                  <div className={"k"}> CAC</div>
                  <div className={"v"}> Cost to acquire</div>
                </div>

                <div className={"dn"} data-n={""}>
                  <div className={"k"}> CVR</div>
                  <div className={"v"}> Conversion</div>
                </div>

                <div className={"dn"} data-n={""}>
                  <div className={"k"}> LTV</div>
                  <div className={"v"}> Lifetime value</div>
                </div>
              </div>

              <div className={"tier-link"}>
                {" "}
                <svg
                  width={"10"}
                  height={"14"}
                  viewBox={"0 0 10 14"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M5 14V2M1 6l4-4 4 4"}
                    stroke={"currentColor"}
                    strokeWidth={"1.2"}
                  ></path>
                </svg>
              </div>

              <div className={"tier t3"}>
                <div className={"dn"} data-n={""}>
                  <div className={"k"}> Media</div>
                  <div className={"v"}> Paid channels</div>
                </div>

                <div className={"dn"} data-n={""}>
                  <div className={"k"}> CRO</div>
                  <div className={"v"}> Site &amp; funnel</div>
                </div>

                <div className={"dn"} data-n={""}>
                  <div className={"k"}> Retention</div>
                  <div className={"v"}> Lifecycle</div>
                </div>
              </div>

              <div className={"tier-link"}>
                {" "}
                <svg
                  width={"10"}
                  height={"14"}
                  viewBox={"0 0 10 14"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M5 14V2M1 6l4-4 4 4"}
                    stroke={"currentColor"}
                    strokeWidth={"1.2"}
                  ></path>
                </svg>
              </div>

              <div
                className={"tier"}
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <div className={"dn"} data-n={""}>
                  <div className={"k"}> Creative</div>
                  <div className={"v"}> Demand generation</div>
                </div>

                <div className={"dn"} data-n={""}>
                  <div className={"k"}> Organic</div>
                  <div className={"v"}> Search &amp; content</div>
                </div>
              </div>

              <div className={"diag-ft"}>
                {" "}
                Constraint detected: <b id={"diagName"}> Creative</b>  ·  every
                brand has one
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 03 · ICP ═══ */}

      <section className={"icp paper"}>
        <div className={"wrap"}>
          <div className={"icp-grid"}>
            <div className={"rv"}>
              <div className={"eyebrow"}> Built for D2C</div>

              <h2 className={"d3"} style={{ marginTop: "16px" }}>
                {" "}
                For brands that have proven demand, and are ready for the next
                stage <span className={"dot"}> .</span>
              </h2>
            </div>

            <div className={"rv"}>
              <div className={"icp-chips"}>
                <div className={"icp-chip"}>
                  <div className={"n"}> ₹30L+</div>
                  <div className={"d"}> Monthly revenue</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Proven</div>
                  <div className={"d"}> Product-market fit</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> 40%+</div>
                  <div className={"d"}> Contribution margin</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Live</div>
                  <div className={"d"}> Existing acquisition</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> 6+ mo</div>
                  <div className={"d"}> Growth horizon</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Whole funnel</div>
                  <div className={"d"}> Willing to fix it</div>
                </div>
              </div>

              <p className={"icp-out"}>
                {" "}
                If you&apos;re still validating your first product, we&apos;re probably
                too early for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 · THE GROWTH PROBLEM ═══ */}

      <section className={"dark"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "880px" }}>
            <div className={"eyebrow"}> Scaling gets complicated</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              What got you to ₹30L a month probably won&apos;t get you to ₹1Cr{" "}
              <span className={"dot"}> .</span>
            </h2>

            <p
              className={"lead"}
              style={{ marginTop: "24px", maxWidth: "680px" }}
            >
              Early growth can come from a winning product, a few strong
              creatives and one reliable acquisition channel. As brands scale,
              the constraints multiply.
            </p>
          </div>

          <div className={"stages"}>
            <div className={"stage rv"}>
              <div className={"rng"}> ₹10L–20L</div>

              <div className={"job"}> The job</div>

              <ul>
                <li> Find winning ads</li>
                <li> Prove the offer</li>
              </ul>
            </div>

            <div className={"stage rv"}>
              <div className={"rng"}> ₹30L–50L</div>

              <div className={"job"}> The job</div>

              <ul>
                <li> Build creative consistency</li>
                <li> Improve conversion</li>
                <li> Diversify acquisition</li>
              </ul>
            </div>

            <div className={"stage rv"}>
              <div className={"rng"}> ₹50L–1Cr</div>

              <div className={"job"}> The job</div>

              <ul>
                <li> Improve economics</li>
                <li> Build retention</li>
                <li> Grow organic</li>
                <li> Strengthen systems</li>
              </ul>
            </div>

            <div className={"stage rv"}>
              <div className={"rng"}> ₹1Cr+</div>

              <div className={"job"}> The job</div>

              <ul>
                <li> Build a growth organisation</li>
                <li> Compound and defend</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 05 · POSITIONING ═══ */}

      <section className={"pos"}>
        <div className={"wrap"}>
          <h2 className={"d2 rv"}>
            {" "}
            Scaling isn&apos;t a Meta problem. <br /> It&apos;s a{" "}
            <span className={"red"}> growth-system</span> problem{" "}
            <span className={"dot"}> .</span>
          </h2>

          <div className={"nofix"}>
            <div className={"nofix-row rv"}>
              <div className={"a"}> Increasing ad spend</div>
              <div className={"x"}>
                {" "}
                <svg
                  width={"10"}
                  height={"10"}
                  viewBox={"0 0 12 12"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M2 2l8 8M10 2l-8 8"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                  ></path>
                </svg>
              </div>
              <div className={"b"}> doesn&apos;t fix weak creative.</div>
            </div>

            <div className={"nofix-row rv"}>
              <div className={"a"}> More traffic</div>
              <div className={"x"}>
                {" "}
                <svg
                  width={"10"}
                  height={"10"}
                  viewBox={"0 0 12 12"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M2 2l8 8M10 2l-8 8"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                  ></path>
                </svg>
              </div>
              <div className={"b"}> doesn&apos;t fix poor conversion.</div>
            </div>

            <div className={"nofix-row rv"}>
              <div className={"a"}> Better ROAS</div>
              <div className={"x"}>
                {" "}
                <svg
                  width={"10"}
                  height={"10"}
                  viewBox={"0 0 12 12"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M2 2l8 8M10 2l-8 8"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                  ></path>
                </svg>
              </div>
              <div className={"b"}> doesn&apos;t fix weak retention.</div>
            </div>

            <div className={"nofix-row rv"}>
              <div className={"a"}> More creatives</div>
              <div className={"x"}>
                {" "}
                <svg
                  width={"10"}
                  height={"10"}
                  viewBox={"0 0 12 12"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M2 2l8 8M10 2l-8 8"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                  ></path>
                </svg>
              </div>
              <div className={"b"}> don&apos;t fix bad positioning.</div>
            </div>

            <div className={"nofix-row rv"}>
              <div className={"a"}> More channels</div>
              <div className={"x"}>
                {" "}
                <svg
                  width={"10"}
                  height={"10"}
                  viewBox={"0 0 12 12"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M2 2l8 8M10 2l-8 8"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                  ></path>
                </svg>
              </div>
              <div className={"b"}> don&apos;t fix poor economics.</div>
            </div>
          </div>

          <p className={"pos-close rv"}>
            {" "}
            Growth happens when the system works{" "}
            <span className={"red"}> together</span> .
          </p>
        </div>
      </section>

      {/* ═══ 06 · THE DARE COMMERCE SYSTEM ═══ */}

      <section className={"sys"} id={"system"}>
        <div className={"wrap"}>
          <div className={"sys-head rv"}>
            <div className={"eyebrow"}> The Dare Commerce System</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Find the constraint. Fix it. <br /> Find the next one{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"board rv"}>
            <div className={"sys-strategy"}> Strategy</div>

            <div className={"vln"}></div>

            <div className={"pillars"}>
              <div
                className={"pillar-arrow"}
                style={{ left: "calc(33.33% - 10px)" }}
              >
                {" "}
                →
              </div>

              <div
                className={"pillar-arrow"}
                style={{ left: "calc(66.66% - 10px)" }}
              >
                {" "}
                →
              </div>

              <div className={"pillar"}>
                <div className={"pillar-hd"}> Acquire</div>

                <div className={"pillar-bd"}>
                  {" "}
                  <span> Meta</span> <span> Google</span> <span> Search</span>{" "}
                  <span> Creative</span>
                </div>
              </div>

              <div className={"pillar"}>
                <div className={"pillar-hd"}> Convert</div>

                <div className={"pillar-bd"}>
                  {" "}
                  <span> Website</span> <span> CRO</span> <span> UX</span>{" "}
                  <span> Offer</span>
                </div>
              </div>

              <div className={"pillar"}>
                <div className={"pillar-hd"}> Retain</div>

                <div className={"pillar-bd"}>
                  {" "}
                  <span> Email</span> <span> WhatsApp</span> <span> CRM</span>{" "}
                  <span> Loyalty</span>
                </div>
              </div>
            </div>

            <div className={"vln"}></div>

            <div className={"pod-bar"} style={{ margin: "0 16%" }}></div>

            <div className={"vln"}></div>

            <div className={"sys-base"}>
              <div className={"b"}> Economics</div>

              <div className={"vln"}></div>

              <div className={"b"}> Data</div>

              <div className={"vln"}></div>

              <div className={"b hot"}> Scale</div>
            </div>

            <div className={"sys-loop"}>
              <svg
                width={"15"}
                height={"15"}
                viewBox={"0 0 16 16"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M14 8A6 6 0 1 1 8 2M14 2v4h-4"}
                  stroke={"currentColor"}
                  strokeWidth={"1.5"}
                  strokeLinecap={"round"}
                ></path>
              </svg>
              Next constraint
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 07 · ACQUIRE ═══ */}

      <section className={"lever dark"} id={"capabilities"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 01</div>

              <div className={"eyebrow"}> Acquire</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Find customers without destroying the economics{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              Acquisition isn&apos;t about spending more. It&apos;s about finding scalable
              demand at economics the business can sustain.
            </p>
          </div>

          <div className={"cols3"}>
            <div className={"cap rv"}>
              <h4> Performance Marketing</h4>

              <ul>
                <li> Meta Ads</li>
                <li> Google Ads</li>
                <li> Shopping / PMax</li>
                <li> TikTok</li>
                <li> Snapchat</li>
                <li> Retargeting</li>
                <li> Market expansion</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Creative Strategy</h4>

              <ul>
                <li> Research</li>
                <li> Angles</li>
                <li> Hooks</li>
                <li> Offers</li>
                <li> UGC</li>
                <li> Statics</li>
                <li> Video</li>
                <li> Creative testing</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Organic Acquisition</h4>

              <ul>
                <li> E-commerce SEO</li>
                <li> Collection optimisation</li>
                <li> Product discovery</li>
                <li> Content</li>
                <li> Authority</li>
              </ul>
            </div>
          </div>

          <div
            className={"rv"}
            style={{
              marginTop: "34px",
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <a href={"#"} className={"link-u"}>
              {" "}
              Explore Performance Marketing
              <svg
                width={"13"}
                height={"13"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M1 7h11M8 3l4 4-4 4"}
                  stroke={"currentColor"}
                  strokeWidth={"1.6"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                ></path>
              </svg>
            </a>
            <a href={"#"} className={"link-u"}>
              {" "}
              Explore E-commerce SEO
              <svg
                width={"13"}
                height={"13"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M1 7h11M8 3l4 4-4 4"}
                  stroke={"currentColor"}
                  strokeWidth={"1.6"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 08 · CREATIVE ENGINE ═══ */}

      <section className={"ink"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "820px" }}>
            <div className={"eyebrow"}> Creative as an acquisition system</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Media buying distributes demand. <br />{" "}
              <span className={"red"}> Creative creates it</span>{" "}
              <span className={"dot"}> .</span>
            </h2>

            <p
              className={"lead"}
              style={{ marginTop: "24px", maxWidth: "640px" }}
            >
              Modern D2C performance depends on the ability to continuously
              generate, test and learn from creative.
            </p>
          </div>

          <div className={"cloop"}>
            <div className={"cstep rv"}>
              <div className={"i"}> 01</div>
              <div className={"l"}> Customer research</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 02</div>
              <div className={"l"}> Pain / desire</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 03</div>
              <div className={"l"}> Angles</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 04</div>
              <div className={"l"}> Hooks</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 05</div>
              <div className={"l"}> Creatives</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 06</div>
              <div className={"l"}> Test</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 07</div>
              <div className={"l"}> Performance data</div>
            </div>

            <div className={"cstep rv"}>
              <div className={"i"}> 08</div>
              <div className={"l"}> Learn</div>
            </div>
          </div>

          <div className={"cloop-back rv"}>
            <svg width={"14"} height={"14"} viewBox={"0 0 16 16"} fill={"none"}>
              {" "}
              <path
                d={"M14 8A6 6 0 1 1 8 2M14 2v4h-4"}
                stroke={"currentColor"}
                strokeWidth={"1.5"}
                strokeLinecap={"round"}
              ></path>
            </svg>
            Back into research
          </div>

          <div className={"beca rv"}>
            <div>
              <div className={"bt"}>
                {" "}
                Built for creative velocity <span className={"dot"}> .</span>
              </div>

              <p>
                {" "}
                Dare Commerce defines the strategy and testing direction.{" "}
                <b style={{ color: "var(--red)", fontWeight: "600" }}>
                  {" "}
                  BuyEcomAds.ai
                </b>{" "}
                expands the production capacity required to execute it.
              </p>
            </div>

            <a href={"#"} className={"btn btn-red"}>
              {" "}
              Explore BuyEcomAds.ai
              <svg
                width={"13"}
                height={"13"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M3 11L11 3M5 3h6v6"}
                  stroke={"currentColor"}
                  strokeWidth={"1.7"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 09 · CONVERT ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 02</div>

              <div className={"eyebrow"}> Convert</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                You&apos;ve paid for the click. Don&apos;t waste it{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              Every improvement in conversion makes acquisition more valuable.
              The same media budget simply buys more revenue.
            </p>
          </div>

          <div className={"funnel rv"}>
            <div className={"fstep"}>
              <div className={"fh"}> Ad</div>
              <div className={"fb"}>
                {" "}
                <span> Message match</span> <span> Hook</span>
              </div>
            </div>

            <div className={"fstep"}>
              <div className={"fh"}> Landing Page</div>
              <div className={"fb"}>
                {" "}
                <span> Message match</span> <span> Speed</span>{" "}
                <span> Trust</span>
              </div>
            </div>

            <div className={"fstep"}>
              <div className={"fh"}> Product Page</div>
              <div className={"fb"}>
                {" "}
                <span> UX</span> <span> Merchandising</span> <span> Trust</span>
              </div>
            </div>

            <div className={"fstep"}>
              <div className={"fh"}> Cart</div>
              <div className={"fb"}>
                {" "}
                <span> Offer</span> <span> AOV</span>
              </div>
            </div>

            <div className={"fstep"}>
              <div className={"fh"}> Checkout</div>
              <div className={"fb"}>
                {" "}
                <span> Friction</span> <span> Payment</span>
              </div>
            </div>
          </div>

          <div
            className={"cols3"}
            style={{ marginTop: "clamp(30px,3.4vw,44px)" }}
          >
            <div className={"cap rv"}>
              <h4> CRO</h4>

              <ul>
                <li> Experimentation</li>
                <li> Landing pages</li>
                <li> Product-page optimisation</li>
                <li> Funnel analysis</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Commerce Experience</h4>

              <ul>
                <li> Shopify</li>
                <li> UX / UI</li>
                <li> Development</li>
                <li> Site performance</li>
                <li> Tracking</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Merchandising</h4>

              <ul>
                <li> Bundles</li>
                <li> Offers</li>
                <li> AOV</li>
                <li> Cross-sell</li>
                <li> Upsell</li>
              </ul>
            </div>
          </div>

          <div className={"rv"} style={{ marginTop: "34px" }}>
            <a href={"#"} className={"link-u"}>
              {" "}
              Explore CRO &amp; Commerce Experience
              <svg
                width={"13"}
                height={"13"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M1 7h11M8 3l4 4-4 4"}
                  stroke={"currentColor"}
                  strokeWidth={"1.6"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 10 · ECONOMICS ═══ */}

      <section className={"econ"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Why the system argument matters</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              A 20% improvement in conversion changes more than conversion{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"econ-grid"}>
            <div className={"ecard rv"}>
              <div className={"eh"}> Before</div>

              <div className={"erow"}>
                <div className={"el"}> Visits</div>
                <div className={"ev"}> 100,000</div>
              </div>

              <div className={"erow"}>
                <div className={"el"}> Conversion rate</div>
                <div className={"ev"}> 2.0%</div>
              </div>

              <div className={"erow"}>
                <div className={"el"}> Orders</div>
                <div className={"ev"}> 2,000</div>
              </div>

              <div className={"erow"}>
                <div className={"el"}> Average order value</div>
                <div className={"ev"}> ₹2,000</div>
              </div>

              <div className={"etotal"}>
                <div className={"el"}> Revenue</div>
                <div className={"ev"}> ₹40L</div>
              </div>
            </div>

            <div className={"ecard after rv"}>
              <div className={"eh"}> After</div>

              <div className={"erow same"}>
                <div className={"el"}> Visits</div>
                <div className={"ev"}> 100,000</div>
              </div>

              <div className={"erow chg"}>
                <div className={"el"}> Conversion rate</div>
                <div className={"ev"}> 2.4%</div>
              </div>

              <div className={"erow chg"}>
                <div className={"el"}> Orders</div>
                <div className={"ev"}> 2,400</div>
              </div>

              <div className={"erow same"}>
                <div className={"el"}> Average order value</div>
                <div className={"ev"}> ₹2,000</div>
              </div>

              <div className={"etotal"}>
                <div className={"el"}> Revenue</div>
                <div className={"ev"}> ₹48L</div>
              </div>
            </div>
          </div>

          <div className={"econ-close rv"}>
            <p className={"big"}>
              {" "}
              Same traffic. <span className={"red"}> ₹8L more revenue.</span>
            </p>

            <p
              className={"lead"}
              style={{
                marginTop: "20px",
                maxWidth: "620px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              That&apos;s why we don&apos;t look at acquisition independently from
              conversion.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 11 · RETAIN ═══ */}

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 03</div>

              <div className={"eyebrow"}> Retain</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                The second purchase changes the economics of the first{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              If every month starts from zero, growth becomes increasingly
              expensive. Retention is what makes aggressive acquisition
              affordable.
            </p>
          </div>

          <div className={"chain-v"}>
            <div className={"cv rv"}>
              <div className={"n"}> 01</div>
              <div className={"t"}> First order</div>
            </div>

            <div className={"cv rv"}>
              <div className={"n"}> 02</div>
              <div className={"t"}> Onboard</div>
            </div>

            <div className={"cv rv"}>
              <div className={"n"}> 03</div>
              <div className={"t"}> Educate</div>
            </div>

            <div className={"cv rv"}>
              <div className={"n"}> 04</div>
              <div className={"t"}> Cross-sell</div>
            </div>

            <div className={"cv rv"}>
              <div className={"n"}> 05</div>
              <div className={"t"}> Replenish</div>
            </div>

            <div className={"cv rv"}>
              <div className={"n"}> 06</div>
              <div className={"t"}> Repeat</div>
            </div>

            <div className={"cv rv"}>
              <div className={"n"}> 07</div>
              <div className={"t"}> Advocacy</div>
            </div>
          </div>

          <div
            className={"cols3"}
            style={{ marginTop: "clamp(30px,3.4vw,44px)" }}
          >
            <div className={"cap rv"}>
              <h4> Lifecycle</h4>

              <ul>
                <li> Email</li>
                <li> WhatsApp</li>
                <li> Journeys</li>
                <li> Abandoned cart</li>
                <li> Post-purchase</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Expansion</h4>

              <ul>
                <li> Win-back</li>
                <li> Cross-sell</li>
                <li> Replenishment</li>
                <li> Loyalty</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Data</h4>

              <ul>
                <li> Segmentation</li>
                <li> CRM</li>
                <li> Cohort analysis</li>
                <li> LTV modelling</li>
              </ul>
            </div>
          </div>

          <p
            className={"d3 rv"}
            style={{ marginTop: "clamp(38px,4.4vw,58px)", maxWidth: "760px" }}
          >
            Retention doesn&apos;t replace acquisition. It makes acquisition{" "}
            <span className={"red"}> more valuable</span> .
          </p>
        </div>
      </section>

      {/* ═══ 12 · SCALE ═══ */}

      <section className={"lever ink"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 04</div>

              <div className={"eyebrow"}> Scale</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Scale what works. Stop funding what doesn&apos;t{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              Platform metrics help us optimise channels. Business metrics tell
              us whether the company is actually growing. We report both, but we
              decide on the second.
            </p>
          </div>

          <div className={"mgrid rv"}>
            <div className={"mcell"}>
              <div className={"mk"}> Revenue</div>
              <div className={"mt"}> Business</div>
            </div>

            <div className={"mcell"}>
              <div className={"mk"}> MER</div>
              <div className={"mt"}> Business</div>
            </div>

            <div className={"mcell"}>
              <div className={"mk"}> New Customer CAC</div>
              <div className={"mt"}> Business</div>
            </div>

            <div className={"mcell"}>
              <div className={"mk"}> Contribution Margin</div>
              <div className={"mt"}> Business</div>
            </div>

            <div className={"mcell"}>
              <div className={"mk"}> LTV</div>
              <div className={"mt"}> Business</div>
            </div>

            <div className={"mcell plat"}>
              <div className={"mk"}> CVR</div>
              <div className={"mt"}> Channel</div>
            </div>

            <div className={"mcell plat"}>
              <div className={"mk"}> AOV</div>
              <div className={"mt"}> Channel</div>
            </div>

            <div className={"mcell plat"}>
              <div className={"mk"}> Repeat Rate</div>
              <div className={"mt"}> Channel</div>
            </div>

            <div className={"mcell plat"}>
              <div className={"mk"}> Organic Revenue</div>
              <div className={"mt"}> Channel</div>
            </div>

            <div className={"mcell plat"}>
              <div className={"mk"}> Creative Hit Rate</div>
              <div className={"mt"}> Channel</div>
            </div>
          </div>

          {/* financial model */}

          <div className={"model-chain rv"}>
            <div className={"mrow"}>
              <div className={"mbox"}> Traffic</div>
              <span className={"mop"}> ×</span>

              <div className={"mbox"}> CVR</div>
              <span className={"mop"}> ×</span>

              <div className={"mbox"}> AOV</div>
              <span className={"mop"}> =</span>

              <div className={"mbox eq"}> Revenue</div>
            </div>

            <div className={"mdown"}>
              {" "}
              <svg
                width={"11"}
                height={"20"}
                viewBox={"0 0 12 24"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M6 0v20M1 15l5 5 5-5"}
                  stroke={"currentColor"}
                  strokeWidth={"1.3"}
                ></path>
              </svg>
            </div>

            <div className={"mrow"}>
              <div className={"mbox"}> Gross Margin</div>
            </div>

            <div className={"mdown"}>
              {" "}
              <svg
                width={"11"}
                height={"20"}
                viewBox={"0 0 12 24"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M6 0v20M1 15l5 5 5-5"}
                  stroke={"currentColor"}
                  strokeWidth={"1.3"}
                ></path>
              </svg>
            </div>

            <div className={"mrow"}>
              <div className={"mbox"}> Marketing Cost</div>
            </div>

            <div className={"mdown"}>
              {" "}
              <svg
                width={"11"}
                height={"20"}
                viewBox={"0 0 12 24"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M6 0v20M1 15l5 5 5-5"}
                  stroke={"currentColor"}
                  strokeWidth={"1.3"}
                ></path>
              </svg>
            </div>

            <div className={"mrow"}>
              <div className={"mbox out"}> Contribution Margin</div>
            </div>

            <div className={"msplit"}>
              <div className={"mbox"}> CAC</div>

              <span style={{ color: "var(--red)" }}> ←→</span>

              <div className={"mbox"}> LTV</div>
            </div>
          </div>

          <div className={"mnote"}>
            <div className={"rv hot"}>
              {" "}
              We don&apos;t optimise metrics in isolation. Every lever we pull is
              read against contribution margin, not against itself.
            </div>

            <div className={"rv"}>
              {" "}
              One weekly report. One monthly review. Written commentary from the
              growth lead, not a dashboard link.
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 14 · PROOF ═══ */}

      <section className={"lever dark"} id={"work"}>
        <div className={"wrap"}>
          <div className={"lever-head"} style={{ alignItems: "end" }}>
            <div className={"rv"}>
              <div className={"eyebrow"}> Selected Commerce Work</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Different constraints. Different solutions{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <div className={"rv"} style={{ justifySelf: "end" }}>
              <a href={"#"} className={"link-u"}>
                {" "}
                View All Commerce Work
                <svg
                  width={"13"}
                  height={"13"}
                  viewBox={"0 0 14 14"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M1 7h11M8 3l4 4-4 4"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div className={"cases"}>
            <article className={"case rv"}>
              <div className={"ph shot"}>
                <div className={"tag"}> Image</div>
                <div className={"desc"}>
                  {" "}
                  Shopify dashboard, ad screenshots or winning creative. Real,
                  not mocked.
                </div>
              </div>

              <div className={"cb"}>
                <div className={"cn"}> Case 01 / Mother &amp; Baby</div>

                <div className={"constraint"}>
                  <div className={"cl"}> The constraint</div>

                  <div className={"cx"}>
                    {" "}
                    Acquisition and creative scalability
                  </div>
                </div>

                <p className={"did"}>
                  {" "}
                  Built a structured creative testing system and rebuilt account
                  architecture around new-customer CAC.
                </p>

                <div className={"res"}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> ₹XL → ₹XXL</span>
                  </div>
                  <div className={"rl"}> Monthly revenue</div>
                </div>

                <a
                  href={"#"}
                  className={"link-u"}
                  style={{
                    fontSize: "13.5px",
                    alignSelf: "flex-start",
                    color: "var(--red)",
                    border: "0",
                    padding: "0",
                  }}
                >
                  {" "}
                  View Case Study →
                </a>
              </div>
            </article>

            <article className={"case rv"}>
              <div className={"ph shot"}>
                <div className={"tag"}> Image</div>
                <div className={"desc"}>
                  {" "}
                  Site redesign before/after or PDP screens.
                </div>
              </div>

              <div className={"cb"}>
                <div className={"cn"}> Case 02 / Apparel</div>

                <div className={"constraint"}>
                  <div className={"cl"}> The constraint</div>

                  <div className={"cx"}> Conversion and repeat rate</div>
                </div>

                <p className={"note-ph"}>
                  {" "}
                  Draft: describe the levers pulled, in the order they were
                  pulled.
                </p>

                <div className={"res"}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> X.Xx</span>
                  </div>
                  <div className={"rl"}> Blended ROAS</div>
                </div>

                <a
                  href={"#"}
                  className={"link-u"}
                  style={{
                    fontSize: "13.5px",
                    alignSelf: "flex-start",
                    color: "var(--red)",
                    border: "0",
                    padding: "0",
                  }}
                >
                  {" "}
                  View Case Study →
                </a>
              </div>
            </article>

            <article className={"case rv"}>
              <div className={"ph shot"}>
                <div className={"tag"}> Image</div>
                <div className={"desc"}>
                  {" "}
                  GCC creative, ideally an Arabic variant alongside the English
                  original.
                </div>
              </div>

              <div className={"cb"}>
                <div className={"cn"}> Case 03 / GCC</div>

                <div className={"constraint"}>
                  <div className={"cl"}> The constraint</div>

                  <div className={"cx"}> Market entry and creative context</div>
                </div>

                <p className={"note-ph"}>
                  {" "}
                  Draft: describe the levers pulled, in the order they were
                  pulled.
                </p>

                <div className={"res"}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> X.Xx</span>
                  </div>
                  <div className={"rl"}> Revenue growth</div>
                </div>

                <a
                  href={"#"}
                  className={"link-u"}
                  style={{
                    fontSize: "13.5px",
                    alignSelf: "flex-start",
                    color: "var(--red)",
                    border: "0",
                    padding: "0",
                  }}
                >
                  {" "}
                  View Case Study →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══ 15 · OPERATING MODEL ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"eyebrow"}> The Operating Model</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Specialists around one growth plan{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              You shouldn&apos;t have to coordinate five specialists to understand
              what is happening with growth. Your Growth Lead owns the
              commercial direction. Specialists own their disciplines.
            </p>
          </div>

          <div className={"pod rv"}>
            <div className={"pod-top"}> Brand</div>

            <div className={"vlnl"}></div>

            <div className={"pod-lead"}> D2C Growth Lead</div>

            <div className={"vlnl"}></div>

            <div className={"pod-bar"}></div>

            <div className={"vlnl"}></div>

            <div className={"pod-spokes"}>
              <div className={"pspoke"}>
                {" "}
                <b> Meta</b> <span> Creative</span>
              </div>

              <div className={"pspoke"}>
                {" "}
                <b> Google</b> <span> CRO</span>
              </div>

              <div className={"pspoke"}>
                {" "}
                <b> SEO</b> <span> Content</span>
              </div>
            </div>

            <div className={"vlnl"}></div>

            <div className={"pod-bar"}></div>

            <div className={"vlnl"}></div>

            <div className={"pod-top"}> Account / Ops</div>

            <div className={"vlnl"}></div>

            <div className={"pod-bot"}> Growth</div>
          </div>
        </div>
      </section>

      {/* ═══ 16 · FIRST 90 DAYS ═══ */}

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "820px" }}>
            <div className={"eyebrow"}> The first 90 days</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Diagnose. Fix. Accelerate <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"days"}>
            <div className={"day rv"}>
              <div className={"day-hd"}>
                <div className={"dr"}> Days 1–30</div>
                <div className={"dt"}> Diagnose</div>
              </div>

              <div className={"day-bd"}>
                <ul>
                  <li> Business economics</li>
                  <li> Channel performance</li>
                  <li> Creative analysis</li>
                  <li> SEO</li>
                  <li> Website and CRO</li>
                  <li> Retention</li>
                  <li> Analytics</li>
                  <li> Competitive landscape</li>
                </ul>
              </div>

              <div className={"day-out"}>
                <div className={"ol"}> Output</div>
                <div className={"ov"}> Growth Constraint Map</div>
              </div>
            </div>

            <div className={"day rv"}>
              <div className={"day-hd"}>
                <div className={"dr"}> Days 31–60</div>
                <div className={"dt"}> Fix</div>
              </div>

              <div className={"day-bd"}>
                <ul>
                  <li> Prioritise constraints</li>
                  <li> Launch experiments</li>
                  <li> Build creative pipeline</li>
                  <li> Fix tracking</li>
                  <li> Address high-impact CRO</li>
                  <li> Begin SEO priorities</li>
                  <li> Build lifecycle opportunities</li>
                </ul>
              </div>

              <div className={"day-out"}>
                <div className={"ol"}> Output</div>
                <div className={"ov"}> Growth Operating Plan</div>
              </div>
            </div>

            <div className={"day rv"}>
              <div className={"day-hd"}>
                <div className={"dr"}> Days 61–90</div>
                <div className={"dt"}> Accelerate</div>
              </div>

              <div className={"day-bd"}>
                <ul>
                  <li> Scale winners</li>
                  <li> Kill weak experiments</li>
                  <li> Expand creative angles</li>
                  <li> Improve conversion</li>
                  <li> Grow organic acquisition</li>
                  <li> Strengthen retention</li>
                </ul>
              </div>

              <div className={"day-out"}>
                <div className={"ol"}> Output</div>
                <div className={"ov"}> Scaling Roadmap</div>
              </div>
            </div>
          </div>

          <p className={"day-after rv"}>
            {" "}
            Month 4+  · {" "}
            <span className={"red"}> Compound. Expand. Defend.</span>
          </p>
        </div>
      </section>

      {/* ═══ 17 · MARKET EXPANSION ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "840px" }}>
            <div className={"eyebrow"}> Multi-market commerce</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              A winning ad in India isn&apos;t automatically a winning ad in Dubai{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"mk-grid"}>
            <div className={"mk-var rv"}>
              <h4> Pricing &amp; offers</h4>
              <p>
                {" "}
                Discount tolerance, bundle logic and perceived value shift
                market to market. The same offer can read as generous in one and
                cheap in another.
              </p>
            </div>

            <div className={"mk-var rv"}>
              <h4> Creative context</h4>
              <p>
                {" "}
                Language, casting, setting and cultural references. Arabic
                variants are not translations of the English ad.
              </p>
            </div>

            <div className={"mk-var rv"}>
              <h4> Media economics</h4>
              <p>
                {" "}
                CPMs, auction density and platform mix differ enough to change
                which channel is even viable.
              </p>
            </div>

            <div className={"mk-var rv"}>
              <h4> Payment behaviour</h4>
              <p>
                {" "}
                COD dominance in India versus card and wallet behaviour in the
                Gulf changes checkout design and cash flow.
              </p>
            </div>

            <div className={"mk-var rv"}>
              <h4> Seasonality</h4>
              <p>
                {" "}
                Ramadan, Eid, Diwali and regional sale cycles move the calendar.
                Planning against the wrong one wastes a quarter.
              </p>
            </div>

            <div className={"mk-var rv"}>
              <h4> Product preference</h4>
              <p>
                {" "}
                Category demand, size and format expectations vary. What sells
                in Bengaluru may not be the hero SKU in Riyadh.
              </p>
            </div>
          </div>

          <div className={"mk-flags rv"}>
            <span> India</span> <span> UAE</span> <span> Qatar</span>{" "}
            <span> Saudi</span>{" "}
            <span className={"tbd"} style={{ borderStyle: "dashed" }}>
              {" "}
              + verified markets
            </span>
          </div>

          <div className={"rv"} style={{ marginTop: "34px" }}>
            <a href={"#diagnostic"} className={"btn btn-red"}>
              {" "}
              Talk to us about market expansion
              <svg
                width={"14"}
                height={"14"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M1 7h11M8 3l4 4-4 4"}
                  stroke={"currentColor"}
                  strokeWidth={"1.6"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 18 · INTELLIGENCE ═══ */}

      <section className={"lever dark"} id={"insights"}>
        <div className={"wrap"}>
          <div className={"lever-head"} style={{ alignItems: "end" }}>
            <div className={"rv"}>
              <div className={"eyebrow"}> Dare Commerce Intelligence</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                What we&apos;re learning from scaling D2C brands{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <div className={"rv"} style={{ justifySelf: "end" }}>
              <a href={"#"} className={"link-u"}>
                {" "}
                Explore Commerce Insights
                <svg
                  width={"13"}
                  height={"13"}
                  viewBox={"0 0 14 14"}
                  fill={"none"}
                >
                  {" "}
                  <path
                    d={"M1 7h11M8 3l4 4-4 4"}
                    stroke={"currentColor"}
                    strokeWidth={"1.6"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div className={"icards"}>
            <article className={"icard rv"}>
              <div className={"k"}> Creative</div>

              <div
                className={"ph"}
                style={{ minHeight: "130px", borderRadius: "11px" }}
              >
                <div className={"tag"}> Image</div>
              </div>

              <div className={"t"}>
                {" "}
                Why creative fatigue isn&apos;t solved by producing random variations
              </div>

              <a
                href={"#"}
                className={"link-u"}
                style={{ fontSize: "13.5px", alignSelf: "flex-start" }}
              >
                {" "}
                Read →
              </a>
            </article>

            <article className={"icard rv"}>
              <div className={"k"}> Economics</div>

              <div
                className={"ph"}
                style={{ minHeight: "130px", borderRadius: "11px" }}
              >
                <div className={"tag"}> Image</div>
              </div>

              <div className={"t"}>
                {" "}
                Why ROAS becomes less useful as brands scale
              </div>

              <a
                href={"#"}
                className={"link-u"}
                style={{ fontSize: "13.5px", alignSelf: "flex-start" }}
              >
                {" "}
                Read →
              </a>
            </article>

            <article className={"icard rv"}>
              <div className={"k"}> Growth</div>

              <div
                className={"ph"}
                style={{ minHeight: "130px", borderRadius: "11px" }}
              >
                <div className={"tag"}> Image</div>
              </div>

              <div className={"t"}>
                {" "}
                What changes when a D2C brand moves from ₹30L to ₹1Cr a month
              </div>

              <a
                href={"#"}
                className={"link-u"}
                style={{ fontSize: "13.5px", alignSelf: "flex-start" }}
              >
                {" "}
                Read →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ═══ 19 · FIT ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Fit matters</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Dare Commerce isn&apos;t built for every brand{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"fit-grid"}>
            <div className={"fitcol yes rv"}>
              <h4> Probably a good fit if</h4>

              <ul>
                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2 6.2l2.6 2.6L10 3.4"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You&apos;ve proven people want the product.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2 6.2l2.6 2.6L10 3.4"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You&apos;re already generating meaningful revenue.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2 6.2l2.6 2.6L10 3.4"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You have sufficient margins to invest in growth.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2 6.2l2.6 2.6L10 3.4"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You want to build beyond one acquisition channel.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2 6.2l2.6 2.6L10 3.4"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You&apos;re prepared to fix the website, creative, retention or
                  offer if that&apos;s the constraint.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2 6.2l2.6 2.6L10 3.4"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You&apos;re thinking in years, not next week&apos;s ROAS.
                </li>
              </ul>
            </div>

            <div className={"fitcol no rv"}>
              <h4> Probably not a fit if</h4>

              <ul>
                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2.5 2.5l7 7M9.5 2.5l-7 7"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You&apos;re still validating your first product.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2.5 2.5l7 7M9.5 2.5l-7 7"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You&apos;re looking only for someone to &quot;run ads.&quot;
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2.5 2.5l7 7M9.5 2.5l-7 7"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  Lowest agency fee is your primary decision criterion.
                </li>

                <li>
                  {" "}
                  <span className={"ic"}>
                    {" "}
                    <svg
                      width={"10"}
                      height={"10"}
                      viewBox={"0 0 12 12"}
                      fill={"none"}
                    >
                      {" "}
                      <path
                        d={"M2.5 2.5l7 7M9.5 2.5l-7 7"}
                        stroke={"currentColor"}
                        strokeWidth={"1.9"}
                        strokeLinecap={"round"}
                      ></path>
                    </svg>
                  </span>{" "}
                  You expect scaling without experimentation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 20 · FINAL CTA ═══ */}

      <section className={"final"} id={"diagnostic"}>
        <div className={"wrap"}>
          <div
            className={"eyebrow plain rv"}
            style={{ justifyContent: "center" }}
          >
            {" "}
            Dare Commerce
          </div>

          <h2 className={"rv"}> What&apos;s stopping your next stage of growth?</h2>

          <p className={"rv"}>
            {" "}
            Tell us where the brand is today, where you&apos;re trying to take it,
            and what&apos;s currently getting in the way.
          </p>

          <a href={"#"} className={"btn btn-white rv"}>
            {" "}
            Get a D2C Growth Diagnostic
            <svg width={"15"} height={"15"} viewBox={"0 0 14 14"} fill={"none"}>
              {" "}
              <path
                d={"M1 7h11M8 3l4 4-4 4"}
                stroke={"currentColor"}
                strokeWidth={"1.7"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              ></path>
            </svg>
          </a>

          <p className={"fine rv"}>
            {" "}
            Built for established D2C brands ready to scale.
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
    </main>
  );
}
