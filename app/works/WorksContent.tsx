"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { safeSanityImageUrl } from "@/sanity/lib/media";
import type { CaseStudySummary } from "@/sanity/lib/types";

type WorksContentProps = {
  caseStudies: CaseStudySummary[] | null;
};

const capabilityLabels: Record<string, string> = {
  performance: "Performance",
  seo: "SEO",
  creative: "Creative",
  cro: "CRO",
  web: "Web",
  retention: "Retention",
  crm: "CRM",
};
const businessUnits = {
  commerce: { value: "commerce", label: "Dare Commerce", className: "com" },
  b2b: { value: "b2b", label: "Dare B2B", className: "b2b" },
  "lead-generation": {
    value: "lead-generation",
    label: "Lead Generation",
    className: "b2b",
  },
} as const;

function renderCaseStudyCard(caseStudy: CaseStudySummary) {
  const unit = businessUnits[caseStudy.businessUnit] ?? businessUnits.commerce;
  const capabilities = caseStudy.capabilities.filter((capability) =>
    Object.hasOwn(capabilityLabels, capability),
  );
  const imageUrl = safeSanityImageUrl(caseStudy.imageUrl);

  return (
    <article
      className="ccase rv"
      data-unit={unit.value}
      data-cap={capabilities.join(" ")}
      key={caseStudy._id}
    >
      <div className="ph shot">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={caseStudy.imageAlt ?? ""}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ) : (
          <>
            <div className="tag">Case study</div>
            <div className="desc">{caseStudy.summary}</div>
          </>
        )}
      </div>
      <div className="cbody2">
        <span className={`unit ${unit.className}`}>{unit.label}</span>
        <div className="cat">{caseStudy.industry}</div>
        <div className="headline-res">
          <span className="tbd">{caseStudy.resultHeadline}</span>
        </div>
        <div className="constraint2">
          <div className="cl2">Constraint</div>
          <div className="cx2">{caseStudy.constraint}</div>
        </div>
        <div className="caps2">
          <div className="cc">
            {capabilities
              .map((capability) => capabilityLabels[capability])
              .join(" · ")}
          </div>
          <a href={`/works/${encodeURIComponent(caseStudy.slug)}`}>
            View case →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function WorksContent({ caseStudies }: WorksContentProps) {
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

    const cards = Array.from(
      page.querySelectorAll<HTMLElement>("#cgrid .ccase"),
    );
    const count = page.querySelector<HTMLElement>("#fcount");
    const empty = page.querySelector<HTMLElement>("#fempty");
    const chips = Array.from(page.querySelectorAll<HTMLButtonElement>(".chip"));
    const state = { unit: "all", cap: "all" };
    const applyFilters = () => {
      let visibleCount = 0;
      cards.forEach((card) => {
        const unitMatches =
          state.unit === "all" || card.dataset.unit === state.unit;
        const capabilities = (card.dataset.cap ?? "").split(" ");
        const capabilityMatches =
          state.cap === "all" || capabilities.includes(state.cap);
        const visible = unitMatches && capabilityMatches;
        card.classList.toggle("hide", !visible);
        if (visible) {
          visibleCount += 1;
          card.classList.add("in");
        }
      });
      if (count)
        count.textContent =
          visibleCount + (visibleCount === 1 ? " case study" : " case studies");
      if (empty)
        empty.style.display =
          cards.length > 0 && visibleCount === 0 ? "block" : "none";
    };
    const onChipClick = (event: Event) => {
      const chip = event.currentTarget as HTMLButtonElement;
      const filter = chip.dataset.f;
      const value = chip.dataset.v;
      if ((filter !== "unit" && filter !== "cap") || !value) return;
      chips
        .filter((item) => item.dataset.f === filter)
        .forEach((item) => item.classList.remove("on"));
      chip.classList.add("on");
      state[filter] = value;
      applyFilters();
    };
    chips.forEach((chip) => chip.addEventListener("click", onChipClick));
    applyFilters();

    const slider = page.querySelector<HTMLElement>("#slider");
    const afterPane = page.querySelector<HTMLElement>("#afterPane");
    const handle = page.querySelector<HTMLElement>("#slHandle");
    let dragging = false;
    const setSliderPosition = (clientX: number) => {
      if (!slider || !afterPane || !handle) return;
      const bounds = slider.getBoundingClientRect();
      if (bounds.width === 0) return;
      const position = Math.max(
        4,
        Math.min(96, ((clientX - bounds.left) / bounds.width) * 100),
      );
      afterPane.style.clipPath = "inset(0 0 0 " + position + "%)";
      handle.style.left = position + "%";
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!slider) return;
      dragging = true;
      slider.setPointerCapture(event.pointerId);
      setSliderPosition(event.clientX);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (dragging) setSliderPosition(event.clientX);
    };
    const stopDragging = () => {
      dragging = false;
    };
    slider?.addEventListener("pointerdown", onPointerDown);
    slider?.addEventListener("pointermove", onPointerMove);
    slider?.addEventListener("pointerup", stopDragging);
    slider?.addEventListener("pointercancel", stopDragging);

    return () => {
      revealObserver.disconnect();
      chips.forEach((chip) => chip.removeEventListener("click", onChipClick));
      slider?.removeEventListener("pointerdown", onPointerDown);
      slider?.removeEventListener("pointermove", onPointerMove);
      slider?.removeEventListener("pointerup", stopDragging);
      slider?.removeEventListener("pointercancel", stopDragging);
    };
  }, []);

  return (
    <main className="works-page" ref={pageRef}>
      <div className={"announce"}>
        {" "}
        Accepting a limited number of growth partnerships for Q4  →
      </div>

      {/* ═══ 01 · HERO ═══ */}

      <section className={"ev-hero"}>
        <div className={"wrap"}>
          <div className={"ev-head"}>
            <div className={"eyebrow rv"}> Dare Network / Selected Work</div>

            <h1 className={"d1 rv"} style={{ marginTop: "20px" }}>
              {" "}
              The work is only interesting if it worked{" "}
              <span className={"dot"}> .</span>
            </h1>

            <p
              className={"lead rv"}
              style={{ marginTop: "26px", maxWidth: "660px" }}
            >
              Different businesses have different constraints. We bring together
              the capabilities needed to solve them, and measure what changed.
            </p>

            <a href={"#work"} className={"scroll-cue rv"}>
              {" "}
              Explore the work
              <svg
                width={"13"}
                height={"13"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
                {" "}
                <path
                  d={"M7 1v11M2.5 8L7 12.5 11.5 8"}
                  stroke={"currentColor"}
                  strokeWidth={"1.6"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <div className={"montage"}>
          <div className={"mrow2 a"}>
            <div className={"etile"}>
              <div className={"el2"}> Shopify</div>
              <div className={"ed"}> Revenue graph</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> 18×</span>
              </div>
              <div className={"el2"}> Revenue growth</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Meta Ads</div>
              <div className={"ed"}> Account view</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> ₹XX → ₹XX</span>
              </div>
              <div className={"el2"}> Monthly</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Search Console</div>
              <div className={"ed"}> Impressions</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Creative</div>
              <div className={"ed"}> Winning ad set</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> +XX%</span>
              </div>
              <div className={"el2"}> Conversion rate</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Website</div>
              <div className={"ed"}> Before / after</div>
            </div>

            {/* duplicate for seamless loop */}

            <div className={"etile"}>
              <div className={"el2"}> Shopify</div>
              <div className={"ed"}> Revenue graph</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> 18×</span>
              </div>
              <div className={"el2"}> Revenue growth</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Meta Ads</div>
              <div className={"ed"}> Account view</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> ₹XX → ₹XX</span>
              </div>
              <div className={"el2"}> Monthly</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Search Console</div>
              <div className={"ed"}> Impressions</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Creative</div>
              <div className={"ed"}> Winning ad set</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> +XX%</span>
              </div>
              <div className={"el2"}> Conversion rate</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Website</div>
              <div className={"ed"}> Before / after</div>
            </div>
          </div>

          <div className={"mrow2 b"}>
            <div className={"etile"}>
              <div className={"el2"}> Google Ads</div>
              <div className={"ed"}> Campaign view</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> ₹XX Cr</span>
              </div>
              <div className={"el2"}> Pipeline influenced</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Keywords</div>
              <div className={"ed"}> Rank movement</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> CRM</div>
              <div className={"ed"}> Pipeline board</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> XX%</span>
              </div>
              <div className={"el2"}> CAC improvement</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Reviews</div>
              <div className={"ed"}> Customer feedback</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Arabic creative</div>
              <div className={"ed"}> GCC variant</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> X.X×</span>
              </div>
              <div className={"el2"}> Repeat rate</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Google Ads</div>
              <div className={"ed"}> Campaign view</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> ₹XX Cr</span>
              </div>
              <div className={"el2"}> Pipeline influenced</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Keywords</div>
              <div className={"ed"}> Rank movement</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> CRM</div>
              <div className={"ed"}> Pipeline board</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> XX%</span>
              </div>
              <div className={"el2"}> CAC improvement</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Reviews</div>
              <div className={"ed"}> Customer feedback</div>
            </div>

            <div className={"etile"}>
              <div className={"el2"}> Arabic creative</div>
              <div className={"ed"}> GCC variant</div>
            </div>

            <div className={"etile num"}>
              <div className={"en"}>
                {" "}
                <span className={"tbd"}> X.X×</span>
              </div>
              <div className={"el2"}> Repeat rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 02 · PORTFOLIO PROOF ═══ */}

      <section className={"dark"} style={{ padding: "0 0 var(--sect)" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "760px" }}>
            <h2 className={"d3"}>
              {" "}
              Growth across different businesses, markets and problems{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"pstats rv"}>
            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                40 <em> +</em>
              </div>
              <div className={"pl2"}> Brands worked with</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}> 4</div>
              <div className={"pl2"}> Markets served</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> ₹XX Cr+</span>
              </div>
              <div className={"pl2"}> Revenue influenced</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> ₹XX Cr+</span>
              </div>
              <div className={"pl2"}> Media managed</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> XX</span>
              </div>
              <div className={"pl2"}> Industries</div>
            </div>
          </div>

          <div
            className={"logos rv"}
            style={{
              marginTop: "1px",
              borderRadius: "0 0 14px 14px",
              borderTop: "0",
            }}
          >
            <div className={"cell"}>
              {" "}
              <span> Luker</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> MYOP</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Vismay</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> SSKL</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Arabian Aroma</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Hive</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> YadaSutra</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Yalla Toys</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> EVR</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Autosmart</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Natural Remedies</span>
            </div>

            <div className={"cell"}>
              {" "}
              <span> Ewaan Tech</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 03 · FEATURED CASE ═══ */}

      <section className={"ink"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Dare Commerce / Featured</div>

            <h2 className={"d3"} style={{ marginTop: "16px" }}>
              {" "}
              The flagship result <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"feat rv"}>
            <div className={"feat-grid"}>
              <div className={"ph feat-media"}>
                <div className={"tag"}> Image</div>

                <div className={"desc"}>
                  {" "}
                  Split composition: the live store on one side, the actual
                  revenue graph on the other. Real screenshots, no mockups.
                </div>
              </div>

              <div className={"feat-body"}>
                <span className={"unit com"}> Dare Commerce</span>

                <div
                  className={"cat"}
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "700",
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.45)",
                  }}
                >
                  {" "}
                  Mother &amp; Baby
                </div>

                <h3>
                  {" "}
                  From <span className={"tbd"}> ₹XL</span> to{" "}
                  <span className={"tbd"}> ₹XXL</span> a month{" "}
                  <span className={"dot"}> .</span>
                </h3>

                <p className={"lead"}>
                  {" "}
                  How we identified creative scalability as the constraint and
                  rebuilt acquisition, production and conversion around it.
                </p>

                <div className={"feat-metrics"}>
                  <div className={"fm"}>
                    <div className={"v"}>
                      {" "}
                      <span className={"tbd"}> ₹XL → ₹XXL</span>
                    </div>
                    <div className={"l"}> Monthly revenue</div>
                  </div>

                  <div className={"fm"}>
                    <div className={"v"}>
                      {" "}
                      <span className={"tbd"}> X.X×</span>
                    </div>
                    <div className={"l"}> Blended MER</div>
                  </div>

                  <div className={"fm"}>
                    <div className={"v"}>
                      {" "}
                      <span className={"tbd"}> XX%</span>
                    </div>
                    <div className={"l"}> New customer growth</div>
                  </div>

                  <div className={"fm"}>
                    <div className={"v"}>
                      {" "}
                      <span className={"tbd"}> X months</span>
                    </div>
                    <div className={"l"}> Timeframe</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginTop: "4px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "rgba(255,255,255,.5)",
                    }}
                  >
                    {" "}
                    Performance · Creative · CRO · Retention
                  </div>

                  <a href={"#"} className={"btn btn-red"}>
                    {" "}
                    Read the full case study
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 · FILTERABLE CASE GRID ═══ */}

      <section
        className={"dark"}
        style={{ padding: "var(--sect) 0" }}
        id={"work"}
      >
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "840px" }}>
            <div className={"eyebrow"}> Explore the work</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Different growth systems. Different measures of success{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"filters rv"}>
            <div className={"fgroup"}>
              <span className={"fl"}> Unit</span>
              <button className={"chip on"} data-f={"unit"} data-v={"all"}>
                {" "}
                All
              </button>
              <button className={"chip"} data-f={"unit"} data-v={"commerce"}>
                {" "}
                Dare Commerce
              </button>
              <button className={"chip"} data-f={"unit"} data-v={"b2b"}>
                {" "}
                Dare B2B
              </button>
              <button
                className={"chip"}
                data-f={"unit"}
                data-v={"lead-generation"}
              >
                {" "}
                Lead Generation
              </button>
            </div>

            <div className={"fgroup"}>
              <span className={"fl"}> Capability</span>
              <button className={"chip on"} data-f={"cap"} data-v={"all"}>
                {" "}
                All
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"performance"}>
                {" "}
                Performance
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"seo"}>
                {" "}
                SEO
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"creative"}>
                {" "}
                Creative
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"cro"}>
                {" "}
                CRO
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"web"}>
                {" "}
                Web
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"retention"}>
                {" "}
                Retention
              </button>
              <button className={"chip"} data-f={"cap"} data-v={"crm"}>
                {" "}
                CRM
              </button>
            </div>

            <div className={"fcount"} id={"fcount"}>
              {" "}
              {caseStudies?.length ?? 0}{" "}
              {(caseStudies?.length ?? 0) === 1 ? "case study" : "case studies"}
            </div>
          </div>

          {(!caseStudies || caseStudies.length === 0) && (
            <div
              id="cmsEmpty"
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,.55)",
              }}
            >
              {caseStudies === null
                ? "Connect Sanity by setting NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local."
                : "No published case studies yet. Publish one from the Sanity Studio to see it here."}
            </div>
          )}
          <div className={"cgrid"} id={"cgrid"}>
            {" "}
            {caseStudies?.map((caseStudy) => renderCaseStudyCard(caseStudy))}
          </div>

          <p
            id={"fempty"}
            style={{
              display: "none",
              textAlign: "center",
              padding: "60px 0",
              color: "rgba(255,255,255,.45)",
              fontSize: "15px",
            }}
          >
            No case studies match that combination yet.
          </p>
        </div>
      </section>

      {/* ═══ 05 · COMMERCE RESULTS ═══ */}

      <section
        className={"ink"}
        style={{ padding: "var(--sect) 0" }}
        id={"commerce-numbers"}
      >
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "820px" }}>
            <div className={"eyebrow"}> Dare Commerce / The numbers</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Commerce growth has more than one scoreboard{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"matrix rv"}>
            <div className={"mx"}>
              <h5> Acquisition</h5>
              <ul>
                <li> Ad spend</li>
                <li> CAC</li>
                <li> MER</li>
                <li> New customers</li>
              </ul>
            </div>

            <div className={"mx"}>
              <h5> Conversion</h5>
              <ul>
                <li> CVR</li>
                <li> AOV</li>
                <li> Revenue per session</li>
              </ul>
            </div>

            <div className={"mx"}>
              <h5> Retention</h5>
              <ul>
                <li> Repeat rate</li>
                <li> LTV</li>
                <li> Returning customer revenue</li>
              </ul>
            </div>

            <div className={"mx"}>
              <h5> Organic</h5>
              <ul>
                <li> Organic revenue</li>
                <li> Non-brand clicks</li>
                <li> Search visibility</li>
              </ul>
            </div>
          </div>

          <div
            className={"pstats rv"}
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              marginTop: "clamp(16px,2vw,26px)",
            }}
          >
            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> 18×</span>
              </div>
              <div className={"pl2"}> Best revenue growth</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> +XX%</span>
              </div>
              <div className={"pl2"}> Conversion improvement</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> ₹XX Cr</span>
              </div>
              <div className={"pl2"}> Revenue generated</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> XX%</span>
              </div>
              <div className={"pl2"}> Repeat purchase lift</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 06 · COMMERCE MINI-CASE ═══ */}

      <section className={"dark"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Dare Commerce / Anatomy of a fix</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              One constraint, start to finish <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"mini rv"}>
            <div className={"mini-step"}>
              <div className={"ms"}> The constraint</div>

              <p>
                {" "}
                Paid acquisition was scaling faster than creative production
                could support.
              </p>
            </div>

            <div className={"mini-step"}>
              <div className={"ms"}> What we found</div>

              <p>
                {" "}
                Creative fatigue was pushing CPM and CAC up while the account
                leaned on too few winning concepts.
              </p>
            </div>

            <div className={"mini-step"}>
              <div className={"ms"}> What we changed</div>

              <div className={"tags"}>
                {" "}
                <span> Research</span> <span> Angles</span> <span> Hooks</span>{" "}
                <span> Production</span> <span> Testing</span>{" "}
                <span> Iteration</span>
              </div>
            </div>

            <div className={"mini-step result"}>
              <div className={"ms"}> Result</div>

              <div className={"mini-res"}>
                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX%</span>
                  </div>
                  <div className={"l"}> Lower CAC</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> X.X×</span>
                  </div>
                  <div className={"l"}> More winning creatives</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> ₹XX</span>
                  </div>
                  <div className={"l"}> Additional monthly revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 07 · B2B RESULTS ═══ */}

      <section
        className={"ink"}
        style={{ padding: "var(--sect) 0" }}
        id={"b2b-numbers"}
      >
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "840px" }}>
            <div className={"eyebrow"}> Dare B2B / The numbers</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              The B2B scoreboard starts where most marketing reports end{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"sb rv"}>
            <span> Search visibility</span> <i> →</i>
            <span> Qualified traffic</span> <i> →</i>
            <span> Lead</span> <i> →</i>
            <span> MQL</span> <i> →</i>
            <span> SQL</span> <i> →</i>
            <span> Opportunity</span> <i> →</i>
            <span> Pipeline</span> <i> →</i>
            <span className={"fin"}> Revenue</span>
          </div>

          <div
            className={"pstats rv"}
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              marginTop: "clamp(36px,4.2vw,56px)",
            }}
          >
            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> +XX%</span>
              </div>
              <div className={"pl2"}> Commercial search visibility</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> XX</span>
              </div>
              <div className={"pl2"}> Qualified enquiries</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> XX</span>
              </div>
              <div className={"pl2"}> SQLs generated</div>
            </div>

            <div className={"pstat"}>
              <div className={"pv"}>
                {" "}
                <span className={"tbd"}> ₹XX Cr</span>
              </div>
              <div className={"pl2"}> Pipeline influenced</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 08 · B2B MINI-CASE ═══ */}

      <section className={"dark"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Dare B2B / Anatomy of a fix</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Ranking is not the same as being found{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"mini rv"}>
            <div className={"mini-step"}>
              <div className={"ms"}> The constraint</div>

              <p>
                {" "}
                The company ranked, but not where buyers were actually
                searching.
              </p>
            </div>

            <div className={"mini-step"}>
              <div className={"ms"}> What we found</div>

              <p>
                {" "}
                Most organic traffic came from informational queries, while
                high-intent product and category searches were owned by
                competitors.
              </p>
            </div>

            <div className={"mini-step"}>
              <div className={"ms"}> What we changed</div>

              <div className={"tags"}>
                {" "}
                <span> Commercial keyword strategy</span>{" "}
                <span> Technical SEO</span> <span> Service architecture</span>{" "}
                <span> Industry pages</span> <span> Content</span>{" "}
                <span> Authority</span>
              </div>
            </div>

            <div className={"mini-step result"}>
              <div className={"ms"}> Result</div>

              <div className={"mini-res"}>
                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> +XX%</span>
                  </div>
                  <div className={"l"}> Commercial traffic</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"l"}> Qualified enquiries</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> ₹XX</span>
                  </div>
                  <div className={"l"}> Pipeline influenced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 09 · CAPABILITY PROOF ═══ */}

      <section
        className={"paper"}
        style={{ padding: "var(--sect) 0" }}
        id={"capability"}
      >
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "760px" }}>
            <div className={"eyebrow"}> Explore by capability</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Looking for something specific? <span className={"dot"}></span>
            </h2>
          </div>

          <div className={"capg"}>
            <div className={"capc rv"}>
              <h4> Performance Marketing</h4>

              <div className={"pair"}>
                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"l"}> Brands scaled</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> ₹XX Cr</span>
                  </div>
                  <div className={"l"}> Media managed</div>
                </div>
              </div>

              <a href={"#"}> View performance work →</a>
            </div>

            <div className={"capc rv"}>
              <h4> SEO</h4>

              <div className={"pair"}>
                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX%</span>
                  </div>
                  <div className={"l"}> Average organic growth</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"l"}> Commercial keywords moved</div>
                </div>
              </div>

              <a href={"#"}> View SEO work →</a>
            </div>

            <div className={"capc rv"}>
              <h4> Websites &amp; CRO</h4>

              <div className={"pair"}>
                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"l"}> Sites launched</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX%</span>
                  </div>
                  <div className={"l"}> Conversion improvement</div>
                </div>
              </div>

              <a href={"#"}> View web &amp; CRO work →</a>
            </div>

            <div className={"capc rv"}>
              <h4> Creative</h4>

              <div className={"pair"}>
                <div>
                  <div className={"v"}> 500+</div>
                  <div className={"l"}> Creatives produced</div>
                </div>

                <div>
                  <div className={"v"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"l"}> Markets and languages</div>
                </div>
              </div>

              <a href={"#"}> View creative work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10 · BEFORE / AFTER ═══ */}

      <section className={"dark"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "760px" }}>
            <div className={"eyebrow"}> Before / After</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Sometimes the result is easier to see{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"ba-grid"}>
            <div className={"slider rv"} id={"slider"}>
              <div className={"sl-pane before"}>
                <div className={"tg"}> Before</div>

                <div className={"dsc"}>
                  {" "}
                  Screenshot of the original site. Full-page capture, desktop.
                </div>
              </div>

              <div className={"sl-pane after"} id={"afterPane"}>
                <div className={"tg"}> After</div>

                <div className={"dsc"}>
                  {" "}
                  Screenshot of the rebuilt site. Same crop, same viewport.
                </div>
              </div>

              <div className={"sl-handle"} id={"slHandle"}></div>
            </div>

            <div className={"ba-list"}>
              <div className={"ba-item rv"}>
                <div className={"bl2"}> Creative system</div>

                <div className={"row2"}>
                  {" "}
                  <span className={"b4"}> 5 / month</span>{" "}
                  <span className={"ar2"}> →</span>{" "}
                  <span className={"af"}> 40 / month</span>
                </div>
              </div>

              <div className={"ba-item rv"}>
                <div className={"bl2"}> Conversion rate</div>

                <div className={"row2"}>
                  {" "}
                  <span className={"b4"}> 1.6%</span>{" "}
                  <span className={"ar2"}> →</span>{" "}
                  <span className={"af"}> 2.3%</span>
                </div>
              </div>

              <div className={"ba-item rv"}>
                <div className={"bl2"}> Organic visibility</div>

                <div className={"row2"}>
                  {" "}
                  <span className={"b4 tbd"}> XX</span>{" "}
                  <span className={"ar2"}> →</span>{" "}
                  <span className={"af tbd"}> XX</span>
                </div>
              </div>

              <div className={"ba-item rv"}>
                <div className={"bl2"}> Monthly revenue</div>

                <div className={"row2"}>
                  {" "}
                  <span className={"b4 tbd"}> ₹XX</span>{" "}
                  <span className={"ar2"}> →</span>{" "}
                  <span className={"af tbd"}> ₹XX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 11 · CLIENT VOICE ═══ */}

      <section className={"paper"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "760px" }}>
            <div className={"eyebrow"}> From the people we work with</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Results matter. So does how we get there{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"tgrid"}>
            <div className={"tcard rv"}>
              <div className={"role"}> Commerce Founder</div>

              <blockquote>
                {" "}
                &quot;Over the past five years, we&apos;ve seen exponential growth in
                enquiries, leads and order conversions. The technical clarity
                from day one was what made us trust them.&quot;
              </blockquote>

              <div className={"who2"}>
                <div className={"av"}></div>
                <div>
                  {" "}
                  <b> Vengat Raman Elumalai</b> <span> MD · EVR Power</span>
                </div>
              </div>
            </div>

            <div className={"tcard rv"}>
              <div className={"role"}> B2B Marketing Head</div>

              <blockquote
                className={"note-ph"}
                style={{
                  border: "0",
                  padding: "0",
                  fontStyle: "italic",
                  color: "var(--muted)",
                }}
              >
                {" "}
                Draft slot: a quote about lead quality, pipeline or search
                visibility. Specific beats warm.
              </blockquote>

              <div className={"who2"}>
                <div className={"av"}></div>
                <div>
                  {" "}
                  <b>
                    {" "}
                    <span className={"tbd"}> Name</span>
                  </b>{" "}
                  <span> Marketing Head · Company</span>
                </div>
              </div>
            </div>

            <div className={"tcard rv"}>
              <div className={"role"}> Founder / CEO</div>

              <blockquote
                className={"note-ph"}
                style={{
                  border: "0",
                  padding: "0",
                  fontStyle: "italic",
                  color: "var(--muted)",
                }}
              >
                {" "}
                Draft slot: a quote about Dare acting as a growth partner rather
                than a vendor.
              </blockquote>

              <div className={"who2"}>
                <div className={"av"}></div>
                <div>
                  {" "}
                  <b>
                    {" "}
                    <span className={"tbd"}> Name</span>
                  </b>{" "}
                  <span> Founder · Company</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 12 · THE PATTERN ═══ */}

      <section className={"ink"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> The pattern behind the work</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Different businesses. Same discipline{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"pat"}>
            <div className={"pstep rv"}>
              <div className={"pi"}> 01</div>
              <div className={"pt"}> Understand the business</div>
            </div>

            <div className={"pstep rv"}>
              <div className={"pi"}> 02</div>
              <div className={"pt"}> Identify the constraint</div>
            </div>

            <div className={"pstep rv"}>
              <div className={"pi"}> 03</div>
              <div className={"pt"}> Build the strategy</div>
            </div>

            <div className={"pstep rv"}>
              <div className={"pi"}> 04</div>
              <div className={"pt"}> Deploy specialists</div>
            </div>

            <div className={"pstep rv"}>
              <div className={"pi"}> 05</div>
              <div className={"pt"}> Measure business impact</div>
            </div>

            <div className={"pstep rv"}>
              <div className={"pi"}> 06</div>
              <div className={"pt"}> Find the next constraint</div>
            </div>
          </div>

          <div className={"qcontrast"}>
            <div className={"qc no rv"}>
              <div className={"lb"}> We don&apos;t start with</div>

              <p> &quot;Which service can we sell?&quot;</p>
            </div>

            <div className={"qc yes rv"}>
              <div className={"lb"}> We start with</div>

              <p> &quot;What is preventing the business from growing?&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 13 · MARKETS & INDUSTRIES ═══ */}

      <section className={"paper"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"mi-grid"}>
            <div className={"rv"}>
              <div className={"eyebrow"}> Built across markets</div>

              <h2 className={"d3"} style={{ marginTop: "16px" }}>
                {" "}
                Where the work has run <span className={"dot"}> .</span>
              </h2>

              <div className={"tagwall"} style={{ marginTop: "26px" }}>
                <span> India</span> <span> UAE</span> <span> Qatar</span>{" "}
                <span> United Kingdom</span>
              </div>
            </div>

            <div className={"rv"}>
              <div className={"eyebrow"}> Industries</div>

              <h2 className={"d3"} style={{ marginTop: "16px" }}>
                {" "}
                Experience across different buying behaviours{" "}
                <span className={"dot"}> .</span>
              </h2>

              <div className={"tagwall"} style={{ marginTop: "26px" }}>
                <span> Fashion</span> <span> Beauty</span>{" "}
                <span> Mother &amp; Baby</span> <span> FMCG</span>
                <span> Home &amp; Appliances</span> <span> Healthcare</span>{" "}
                <span> Manufacturing</span>
                <span> SaaS</span> <span> Professional Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 14 · TRANSPARENCY ═══ */}

      <section className={"dark"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "860px" }}>
            <div className={"eyebrow"}> Honestly</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Not every experiment wins <span className={"dot"}> .</span>
            </h2>

            <p
              className={"lead"}
              style={{ marginTop: "24px", maxWidth: "700px" }}
            >
              Growth isn&apos;t a straight line. Some creatives fail. Some channels
              plateau. Some hypotheses are wrong. What matters is how quickly we
              learn, what we do with the information, and whether the system
              gets stronger.
            </p>
          </div>

          <div className={"tl"}>
            <div className={"rv"}>
              {" "}
              <b> Test</b> <span> Small, fast, cheap to be wrong</span>
            </div>

            <div className={"rv"}>
              {" "}
              <b> Learn</b> <span> Write down what it told us</span>
            </div>

            <div className={"rv"}>
              {" "}
              <b> Iterate</b> <span> Change the input, not the target</span>
            </div>

            <div className={"rv"}>
              {" "}
              <b> Scale</b> <span> Fund only what earned it</span>
            </div>
          </div>

          <p
            className={"d3 rv"}
            style={{ marginTop: "clamp(36px,4.2vw,56px)", maxWidth: "780px" }}
          >
            The case studies above are the ones that worked. They exist because
            of the ones that <span className={"red"}> didn&apos;t</span> .
          </p>
        </div>
      </section>

      {/* ═══ 15 · FINAL CTA ═══ */}

      <section className={"final"} id={"diagnostic"}>
        <div className={"wrap"}>
          <div
            className={"eyebrow plain rv"}
            style={{ justifyContent: "center" }}
          >
            {" "}
            Your business won&apos;t look exactly like these
          </div>

          <h2 className={"rv"}> Good.</h2>

          <p className={"rv"}>
            {" "}
            The point isn&apos;t to copy someone else&apos;s growth strategy. It&apos;s to
            understand what&apos;s holding your business back, and build the right
            system around it.
          </p>

          <div className={"routes"}>
            <a href={"/dare-commerce#diagnostic"} className={"route rv"}>
              <div className={"rl3"}> D2C Brand</div>

              <div className={"rt3"}> Get a D2C Growth Diagnostic</div>

              <span className={"rg3"}>
                {" "}
                Start
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
              </span>
            </a>
            <a href={"/b2b#diagnostic"} className={"route rv"}>
              <div className={"rl3"}> B2B Company</div>

              <div className={"rt3"}> Get a B2B Growth Diagnostic</div>

              <span className={"rg3"}>
                {" "}
                Start
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
              </span>
            </a>
          </div>

          <p className={"fine rv"} style={{ marginTop: "26px" }}>
            {" "}
            Not sure which?{" "}
            <a
              href={"/#diagnostic"}
              style={{ borderBottom: "1px solid currentColor" }}
            >
              {" "}
              Talk to Dare →
            </a>
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
    </main>
  );
}
