"use client";

import { useEffect, useRef } from "react";

export default function LeadGenerationContent() {
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

    const funnelRows = Array.from(
      page.querySelectorAll<HTMLElement>(".lgrow[data-stage]"),
    );
    let activeRow = 0;
    const funnelInterval =
      funnelRows.length > 0
        ? window.setInterval(() => {
            funnelRows.forEach((row) => row.classList.remove("live"));
            funnelRows[activeRow % funnelRows.length].classList.add("live");
            activeRow += 1;
          }, 640)
        : undefined;

    const countTimers = new Set<number>();
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          const target = Number.parseInt(
            (element.textContent ?? "").replace(/,/g, ""),
            10,
          );
          if (Number.isNaN(target)) return;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 34));
          const timer = window.setInterval(() => {
            current = Math.min(current + step, target);
            element.textContent = current.toLocaleString("en-IN");
            if (current >= target) {
              window.clearInterval(timer);
              countTimers.delete(timer);
            }
          }, 28);
          countTimers.add(timer);
        });
      },
      { threshold: 0.5 },
    );
    page
      .querySelectorAll(".lgrow .lv")
      .forEach((element) => countObserver.observe(element));

    const industryTabs = Array.from(
      page.querySelectorAll<HTMLElement>(".itab"),
    );
    const industryPanels = Array.from(
      page.querySelectorAll<HTMLElement>(".ipanel"),
    );
    const onIndustryClick = (event: Event) => {
      const tab = event.currentTarget as HTMLElement;
      industryTabs.forEach((item) => item.classList.toggle("on", item === tab));
      industryPanels.forEach((panel) =>
        panel.classList.toggle("on", panel.dataset.p === tab.dataset.i),
      );
    };
    industryTabs.forEach((tab) =>
      tab.addEventListener("click", onIndustryClick),
    );

    const faqButtons = Array.from(page.querySelectorAll<HTMLElement>(".fq"));
    const onFaqClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      const item = button.parentElement;
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      page
        .querySelectorAll(".fitem")
        .forEach((faq) => faq.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    };
    faqButtons.forEach((button) =>
      button.addEventListener("click", onFaqClick),
    );

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      if (funnelInterval !== undefined) window.clearInterval(funnelInterval);
      countTimers.forEach((timer) => window.clearInterval(timer));
      industryTabs.forEach((tab) =>
        tab.removeEventListener("click", onIndustryClick),
      );
      faqButtons.forEach((button) =>
        button.removeEventListener("click", onFaqClick),
      );
    };
  }, []);

  return (
    <main className="leads-page" ref={pageRef}>
      <div className={"announce"}>
        {" "}
        Accepting a limited number of lead-generation partnerships for Q4  →
      </div>

      {/* ═══ 02 · HERO ═══ */}

      <section className={"hero"}>
        <div className={"wrap"}>
          <div className={"hero-grid"}>
            <div>
              <div className={"eyebrow"}>
                {" "}
                Dare Network / High-Ticket Lead Generation
              </div>

              <h1 className={"d1"}>
                {" "}
                More qualified customers. <br /> Not just more leads{" "}
                <span className={"dot"}> .</span>
              </h1>

              <p className={"hero-sub"}>
                We build lead-to-revenue systems for high-ticket service
                businesses, connecting paid acquisition, search, landing pages,
                qualification, CRM and follow-up to generate more qualified
                sales conversations.
              </p>

              <div className={"hero-cta"}>
                <a href={"#diagnostic"} className={"btn btn-red"}>
                  {" "}
                  Get a Lead Generation Diagnostic
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
                <a href={"#results"} className={"btn btn-ghost"}>
                  {" "}
                  See Our Lead Gen Work
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
                <span> Meta</span> <span> Google</span> <span> SEO</span>{" "}
                <span> Landing Pages</span> <span> CRM</span>{" "}
                <span> Automation</span> <span> CRO</span>
              </div>
            </div>

            <div className={"lgf"}>
              <div className={"lgf-hd"}>
                <div className={"t"}> Lead-to-Revenue View</div>

                <div className={"st"}>
                  {" "}
                  <i></i> <span> Live</span>
                </div>
              </div>

              <div className={"lgrow"} data-stage={""}>
                <div className={"ll"}> Visitors</div>
                <div className={"lgbar"} style={{ width: "100%" }}></div>
                <div className={"lv"}> 1,000</div>
              </div>

              <div className={"lgrow"} data-stage={""}>
                <div className={"ll"}> Leads</div>
                <div className={"lgbar"} style={{ width: "78%" }}></div>
                <div className={"lv"}> 200</div>
              </div>

              <div className={"lgrow"} data-stage={""}>
                <div className={"ll"}> Qualified</div>
                <div className={"lgbar"} style={{ width: "62%" }}></div>
                <div className={"lv"}> 85</div>
              </div>

              <div className={"lgrow"} data-stage={""}>
                <div className={"ll"}> Appointments</div>
                <div className={"lgbar"} style={{ width: "48%" }}></div>
                <div className={"lv"}> 42</div>
              </div>

              <div className={"lgrow"} data-stage={""}>
                <div className={"ll"}> Show-ups</div>
                <div className={"lgbar"} style={{ width: "36%" }}></div>
                <div className={"lv"}> 31</div>
              </div>

              <div className={"lgrow"} data-stage={""}>
                <div className={"ll"}> Customers</div>
                <div className={"lgbar"} style={{ width: "24%" }}></div>
                <div className={"lv"}> 12</div>
              </div>

              <div className={"lgrow gold"} data-stage={""}>
                <div className={"ll"}> Revenue</div>
                <div className={"lgbar"} style={{ width: "16%" }}></div>
                <div className={"lv tbd"}> ₹XX</div>
              </div>

              <div className={"lgf-ft"}>
                <div className={"vaxis"}> Volume falls</div>

                <div>
                  {" "}
                  Most agencies stop reporting at row 2.{" "}
                  <b> We report row 7.</b>
                </div>

                <div className={"vaxis"}> Value rises</div>
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
              <div className={"eyebrow"}> Built for high-ticket services</div>

              <h2 className={"d3"} style={{ marginTop: "16px" }}>
                {" "}
                When one customer is valuable, lead quality matters more{" "}
                <span className={"dot"}> .</span>
              </h2>

              <p className={"lead"} style={{ marginTop: "20px" }}>
                Built for service businesses where every new customer represents
                meaningful revenue, and where the journey from enquiry to sale
                needs qualification, follow-up or consultation.
              </p>
            </div>

            <div className={"rv"}>
              <div className={"icp-chips"}>
                <div className={"icp-chip"}>
                  <div className={"n"}> High</div>
                  <div className={"d"}> Customer value</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Proven</div>
                  <div className={"d"}> Service and demand</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> In place</div>
                  <div className={"d"}> Sales or consultation process</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Defined</div>
                  <div className={"d"}> Market</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Capacity</div>
                  <div className={"d"}> To fulfil more customers</div>
                </div>

                <div className={"icp-chip"}>
                  <div className={"n"}> Clear</div>
                  <div className={"d"}> Growth ambition</div>
                </div>
              </div>

              <div className={"route-note"}>
                <div className={"rnote"}>
                  {" "}
                  Need hundreds of low-value transactions? <b>
                    {" "}
                    Dare Commerce
                  </b>{" "}
                  is probably the better fit.
                </div>

                <div className={"rnote"}>
                  {" "}
                  Selling to businesses on long enterprise cycles?{" "}
                  <b> Dare B2B</b> is probably the better fit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 · THE PROBLEM ═══ */}

      <section className={"dark"} style={{ padding: "var(--sect) 0" }}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "880px" }}>
            <div className={"eyebrow"}> The lead gen problem</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Your cheapest lead may be your most expensive lead{" "}
              <span className={"dot"}> .</span>
            </h2>

            <p
              className={"lead"}
              style={{ marginTop: "24px", maxWidth: "700px" }}
            >
              It&apos;s easy to optimise campaigns for form submissions. It&apos;s much
              harder to optimise for people who are qualified, answer the phone,
              attend the appointment and actually become customers.
            </p>
          </div>

          <div className={"symp"}>
            <div className={"sq rv"}>
              <div className={"qm"}> &quot;</div>
              <p> We&apos;re getting leads, but most aren&apos;t serious.</p>
            </div>

            <div className={"sq rv"}>
              <div className={"qm"}> &quot;</div>
              <p> People submit the form and then stop answering.</p>
            </div>

            <div className={"sq rv"}>
              <div className={"qm"}> &quot;</div>
              <p> Our CPL looks good, but sales aren&apos;t increasing.</p>
            </div>

            <div className={"sq rv"}>
              <div className={"qm"}> &quot;</div>
              <p> We spend more on Meta but lead quality keeps dropping.</p>
            </div>

            <div className={"sq rv"}>
              <div className={"qm"}> &quot;</div>
              <p> Our team doesn&apos;t follow up consistently.</p>
            </div>

            <div className={"sq rv"}>
              <div className={"qm"}> &quot;</div>
              <p> We have thousands of old leads sitting in the CRM.</p>
            </div>
          </div>

          <p
            className={"d3 rv"}
            style={{ marginTop: "clamp(38px,4.4vw,58px)", maxWidth: "800px" }}
          >
            These aren&apos;t advertising problems. They&apos;re{" "}
            <span className={"red"}> lead-to-revenue problems</span> .
          </p>
        </div>
      </section>

      {/* ═══ 05 · POV ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "860px" }}>
            <div className={"eyebrow"}> Our point of view</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Lead generation shouldn&apos;t end at &quot;Lead Generated&quot;{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"vs2"}>
            <div className={"vcol old rv"}>
              <h4> The usual model</h4>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Meta / Google</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Landing page</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Form</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Lead generated</span>
              </div>

              <div className={"vs-report"}>
                <div className={"rl4"}> The monthly report</div>

                <div className={"rn"}> 487 leads  ·  ₹643 CPL</div>
              </div>
            </div>

            <div className={"vcol new rv"}>
              <h4> The Dare model</h4>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Meta / Google / SEO</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Lead</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Qualified?</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Contacted?</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Appointment?</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Show-up?</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Sale?</span>
              </div>

              <div className={"vs-step"}>
                {" "}
                <span className={"vd"}></span> <span> Revenue?</span>
              </div>

              <div className={"vs-report"}>
                <div className={"rl4"}> The report we care about</div>

                <div className={"rn"}> Cost per customer</div>
              </div>
            </div>
          </div>

          <p
            className={"d3 rv"}
            style={{ marginTop: "clamp(38px,4.4vw,58px)", maxWidth: "700px" }}
          >
            We care about the <span className={"red"}> second funnel</span> .
          </p>
        </div>
      </section>

      {/* ═══ 06 · THE SYSTEM ═══ */}

      <section
        className={"dark"}
        style={{ padding: "var(--sect) 0" }}
        id={"system"}
      >
        <div className={"wrap"}>
          <div
            className={"sys-head rv"}
            style={{
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto clamp(40px,4.6vw,64px)",
            }}
          >
            <div
              className={"eyebrow plain"}
              style={{ justifyContent: "center" }}
            >
              {" "}
              The Dare Lead-to-Revenue System
            </div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Attract → Convert → Qualify → Follow Up → Book → Close →{" "}
              <span className={"red"}> Learn</span>{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"lsys rv"}>
            <div className={"lcap rd"}> Market</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Attract</div>

            <div className={"lvl"}></div>

            <div className={"lbar"}></div>

            <div className={"lvl"}></div>

            <div className={"ltri"}>
              <div className={"lnode2"}>
                {" "}
                <b> Meta</b>
              </div>

              <div className={"lnode2"}>
                {" "}
                <b> Google</b>
              </div>

              <div className={"lnode2"}>
                {" "}
                <b> SEO</b>
              </div>
            </div>

            <div className={"lvl"}></div>

            <div className={"lbar"}></div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Convert  ·  Landing Page</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Lead</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Qualify  ·  CRM</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Follow Up</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Appointment</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Show-up</div>

            <div className={"lvl"}></div>

            <div className={"lcap ln"}> Sale</div>

            <div className={"lvl"}></div>

            <div className={"lcap wh"}> Revenue</div>

            <div className={"lfeedback"}>
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
              Sales data feeds straight back into acquisition
            </div>
          </div>

          <p
            className={"lead rv"}
            style={{
              textAlign: "center",
              marginTop: "clamp(28px,3.2vw,42px)",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Every stage has a job. Every stage can leak revenue. We look at the
            system, not just the ads.
          </p>
        </div>
      </section>

      {/* ═══ 07 · ATTRACT ═══ */}

      <section className={"lever paper"} id={"capabilities"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 01</div>

              <div className={"eyebrow"}> Attract</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Put the right offer in front of the right market{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              High-ticket acquisition isn&apos;t about reaching everybody. It&apos;s about
              reaching people with the right combination of need, intent,
              ability and timing.
            </p>
          </div>

          <div className={"cols3"}>
            <div className={"cap rv"}>
              <h4> Meta</h4>

              <ul>
                <li> Audience discovery</li>
                <li> Creative strategy</li>
                <li> Lead campaigns</li>
                <li> Landing-page campaigns</li>
                <li> Retargeting</li>
                <li> Lookalikes</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Google</h4>

              <ul>
                <li> Search campaigns</li>
                <li> High-intent keywords</li>
                <li> Local demand</li>
                <li> Competitor terms</li>
                <li> Performance Max</li>
                <li> Retargeting</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> SEO</h4>

              <ul>
                <li> Service searches</li>
                <li> Local SEO</li>
                <li> Commercial pages</li>
                <li> Location pages</li>
                <li> Educational demand</li>
                <li> Authority</li>
              </ul>
            </div>
          </div>

          <p
            className={"d4 rv"}
            style={{ marginTop: "clamp(34px,4vw,52px)", maxWidth: "760px" }}
          >
            Paid creates and captures demand today. Search compounds demand
            capture over time.
          </p>

          {/* creative that qualifies */}

          <div
            className={"rv"}
            style={{
              marginTop: "clamp(44px,5vw,72px)",
              paddingTop: "clamp(36px,4.2vw,56px)",
              borderTop: "1px solid var(--line-light)",
            }}
          >
            <div className={"eyebrow"}> Creative that qualifies</div>

            <h3
              className={"d3"}
              style={{ marginTop: "16px", maxWidth: "780px" }}
            >
              {" "}
              The ad shouldn&apos;t convince everyone. It should attract the right
              people <span className={"dot"}> .</span>
            </h3>

            <p
              className={"lead"}
              style={{ marginTop: "20px", maxWidth: "700px" }}
            >
              Strong lead-gen creative doesn&apos;t just increase clicks. It gives
              enough context that the wrong customer self-selects out and the
              right customer wants to know more.
            </p>

            <div
              className={"cap rv"}
              style={{
                marginTop: "26px",
                borderColor: "var(--line-light)",
                background: "#fff",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontFamily: "var(--ui)",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                Angles we test
              </h4>

              <ul>
                <li> Problem awareness</li>
                <li> Expert authority</li>
                <li> Outcome</li>
                <li> Education</li>
                <li> Myth-busting</li>

                <li> Testimonials</li>
                <li> Before / after where compliant</li>
                <li> Process</li>
                <li> Price and value framing</li>

                <li> FAQs</li>
                <li> Objection handling</li>
              </ul>
            </div>

            <div className={"flowline c7"}>
              <div className={"fnode"}>
                <div className={"fi"}> 01</div>
                <div className={"ft2"}> Customer insight</div>
              </div>

              <div className={"fnode"}>
                <div className={"fi"}> 02</div>
                <div className={"ft2"}> Angle</div>
              </div>

              <div className={"fnode"}>
                <div className={"fi"}> 03</div>
                <div className={"ft2"}> Hook</div>
              </div>

              <div className={"fnode"}>
                <div className={"fi"}> 04</div>
                <div className={"ft2"}> Creative</div>
              </div>

              <div className={"fnode"}>
                <div className={"fi"}> 05</div>
                <div className={"ft2"}> Lead</div>
              </div>

              <div className={"fnode"}>
                <div className={"fi"}> 06</div>
                <div className={"ft2"}> Lead quality</div>
              </div>

              <div className={"fnode end"}>
                <div className={"fi"}> 07</div>
                <div className={"ft2"}> Learn</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 08 · CONVERT ═══ */}

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 02</div>

              <div className={"eyebrow"}> Convert</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                The click isn&apos;t the conversion <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              For a high-ticket service, the landing experience has to create
              enough relevance, confidence and trust for someone to start a
              conversation. More traffic isn&apos;t always the answer.
            </p>
          </div>

          <div className={"flowline c9"}>
            <div className={"fnode"}>
              <div className={"ft2"}> Ad</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Message match</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Problem</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Solution</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Proof</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Trust</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Offer</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> CTA</div>
            </div>

            <div className={"fnode end"}>
              <div className={"ft2"}> Enquiry</div>
            </div>
          </div>

          <div
            className={"cols3"}
            style={{ marginTop: "clamp(30px,3.4vw,44px)" }}
          >
            <div className={"cap rv"}>
              <h4> Landing Pages</h4>

              <ul>
                <li> Messaging</li>
                <li> UX / UI</li>
                <li> Mobile</li>
                <li> Speed</li>
                <li> Forms</li>
                <li> WhatsApp</li>
                <li> Call CTAs</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> CRO</h4>

              <ul>
                <li> Heatmaps</li>
                <li> Funnel analysis</li>
                <li> A/B testing</li>
                <li> Form optimisation</li>
                <li> CTA testing</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Trust architecture</h4>

              <ul>
                <li> Testimonials</li>
                <li> Credentials</li>
                <li> Reviews</li>
                <li> Case studies</li>
                <li> FAQs</li>
                <li> Process</li>
                <li> Locations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 09 · QUALIFY ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 03</div>

              <div className={"eyebrow"}> Qualify</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Every lead shouldn&apos;t reach your sales team{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              Qualification protects sales time and gives marketing better
              information about what a valuable lead actually looks like.
            </p>
          </div>

          <div className={"flowline c5"}>
            <div className={"fnode"}>
              <div className={"fi"}> 01</div>
              <div className={"ft2"}> Leads</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 02</div>
              <div className={"ft2"}> ICP / eligibility</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 03</div>
              <div className={"ft2"}> Intent</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 04</div>
              <div className={"ft2"}> Timing</div>
            </div>

            <div className={"fnode end"}>
              <div className={"fi"}> 05</div>
              <div className={"ft2"}> Qualified lead</div>
            </div>
          </div>

          <div
            className={"cols3"}
            style={{ marginTop: "clamp(30px,3.4vw,44px)" }}
          >
            <div className={"cap rv"}>
              <h4> What we capture</h4>

              <ul>
                <li> Service required</li>
                <li> Location</li>
                <li> Budget</li>
                <li> Timeline</li>
                <li> Eligibility</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Category signals</h4>

              <ul>
                <li> Treatment interest</li>
                <li> Property preference</li>
                <li> Course preference</li>
                <li> Purchase intent</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> The metrics that replace CPL</h4>

              <ul>
                <li> Lead → Qualified Lead %</li>
                <li> Cost per Qualified Lead</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10 · FOLLOW UP ═══ */}

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 04</div>

              <div className={"eyebrow"}> Follow Up</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                The most expensive lead is the one nobody follows up with
                properly <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              A qualified enquiry has a short window of intent. Slow responses,
              inconsistent calling and weak follow-up waste demand you&apos;ve
              already paid to create.
            </p>
          </div>

          <div className={"flowline c7"}>
            <div className={"fnode"}>
              <div className={"fi"}> 01</div>
              <div className={"ft2"}> New lead</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 02</div>
              <div className={"ft2"}> Instant WhatsApp</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 03</div>
              <div className={"ft2"}> Sales alert</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 04</div>
              <div className={"ft2"}> Call attempt</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 05</div>
              <div className={"ft2"}> No answer?</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 06</div>
              <div className={"ft2"}> Follow-up sequence</div>
            </div>

            <div className={"fnode end"}>
              <div className={"fi"}> 07</div>
              <div className={"ft2"}> Appointment</div>
            </div>
          </div>

          <div
            className={"cols3"}
            style={{ marginTop: "clamp(30px,3.4vw,44px)" }}
          >
            <div className={"cap rv"}>
              <h4> Speed</h4>

              <ul>
                <li> Speed-to-lead</li>
                <li> Lead routing</li>
                <li> Sales alerts</li>
                <li> Lead ownership</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Automation</h4>

              <ul>
                <li> WhatsApp</li>
                <li> Email</li>
                <li> Call workflows</li>
                <li> Reminders</li>
                <li> Nurture</li>
              </ul>
            </div>

            <div className={"cap rv"}>
              <h4> Structure</h4>

              <ul>
                <li> Follow-up cadence</li>
                <li> CRM stages</li>
                <li> Escalation rules</li>
              </ul>
            </div>
          </div>

          <p
            className={"d3 rv"}
            style={{ marginTop: "clamp(36px,4.2vw,54px)", maxWidth: "700px" }}
          >
            Don&apos;t pay twice for a lead you{" "}
            <span className={"red"}> already have</span> .
          </p>
        </div>
      </section>

      {/* ═══ 11 · BOOK ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 05</div>

              <div className={"eyebrow"}> Book</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Leads don&apos;t pay invoices. Customers do{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              For most high-ticket categories there&apos;s a decisive intermediate
              step: the appointment. Consultation, discovery call, site visit,
              demo, viewing, assessment or counselling session.
            </p>
          </div>

          <div className={"flowline c5"}>
            <div className={"fnode"}>
              <div className={"ft2"}> Qualified leads</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Appointments</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Booking rate</div>
            </div>

            <div className={"fnode"}>
              <div className={"ft2"}> Show-ups</div>
            </div>

            <div className={"fnode end"}>
              <div className={"ft2"}> Show-up rate</div>
            </div>
          </div>

          <div
            className={"cap rv"}
            style={{
              marginTop: "clamp(30px,3.4vw,44px)",
              borderColor: "var(--line-light)",
              background: "#fff",
            }}
          >
            <h4
              style={{
                fontSize: "16px",
                fontFamily: "var(--ui)",
                fontWeight: "600",
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              {" "}
              What we build
            </h4>

            <ul>
              <li> Scheduling</li>
              <li> Reminders</li>
              <li> Confirmation flows</li>
              <li> Rescheduling</li>
              <li> No-show recovery</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 12 · CLOSE & LEARN ═══ */}

      <section className={"lever ink"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"lever-num"}> 06 / 07</div>

              <div className={"eyebrow"}> Close &amp; Learn</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Your sales team has data Meta doesn&apos;t{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              We don&apos;t run your sales team. But where the systems allow it, we
              want visibility into what happens after the appointment, because
              that&apos;s the only data that makes optimisation genuinely smarter.
            </p>
          </div>

          <div className={"flowline c6"}>
            <div className={"fnode"}>
              <div className={"fi"}> 01</div>
              <div className={"ft2"}> Marketing</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 02</div>
              <div className={"ft2"}> Leads</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 03</div>
              <div className={"ft2"}> Sales team</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 04</div>
              <div className={"ft2"}> Why they bought / didn&apos;t</div>
            </div>

            <div className={"fnode"}>
              <div className={"fi"}> 05</div>
              <div className={"ft2"}> CRM data</div>
            </div>

            <div className={"fnode end"}>
              <div className={"fi"}> 06</div>
              <div className={"ft2"}> Back to marketing</div>
            </div>
          </div>

          <div className={"kmet"}>
            <div className={"km rv"}>
              <div className={"kv"}>
                {" "}
                Which campaign generates customers, not leads?
              </div>
            </div>

            <div className={"km rv"}>
              <div className={"kv"}>
                {" "}
                Which creative produces qualified enquiries?
              </div>
            </div>

            <div className={"km rv"}>
              <div className={"kv"}>
                {" "}
                Which keyword produces higher-value customers?
              </div>
            </div>

            <div className={"km rv"}>
              <div className={"kv"}>
                {" "}
                Which locations and services actually close?
              </div>
            </div>

            <div className={"km rv"}>
              <div className={"kv"}>
                {" "}
                Why was the lead rejected, or why did they no-show?
              </div>
            </div>

            <div className={"km rv"}>
              <div className={"kv"}> What objection stopped the sale?</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 13 · SCOREBOARD (red band) ═══ */}

      <section className={"reset"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div
              className={"eyebrow plain"}
              style={{ color: "rgba(255,255,255,.8)" }}
            >
              {" "}
              What we measure
            </div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              CPL is only the first number <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"sbchain rv"}>
            <span> Ad spend</span> <i> →</i>
            <span> Leads</span> <i> →</i>
            <span className={"cost"}> CPL</span> <i> →</i>
            <span> Qualified leads</span> <i> →</i>
            <span className={"cost"}> CPQL</span> <i> →</i>
            <span> Appointments</span> <i> →</i>
            <span className={"cost"}> Cost / appointment</span> <i> →</i>
            <span> Show-ups</span> <i> →</i>
            <span className={"cost"}> Cost / show-up</span> <i> →</i>
            <span> Customers</span> <i> →</i>
            <span className={"cost"}> CAC</span> <i> →</i>
            <span> Revenue</span> <i> →</i>
            <span className={"fin"}> Marketing ROI</span>
          </div>

          <div className={"sbnote"}>
            <p className={"dim rv"}>
              {" "}
              Platform metrics help optimise campaigns.
            </p>

            <p className={"rv"}> Revenue metrics help optimise the business.</p>
          </div>
        </div>
      </section>

      {/* ═══ 14 · ECONOMICS ═══ */}

      <section className={"econ"} id={"results"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "820px" }}>
            <div className={"eyebrow"}> Make the economics tangible</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Cheap leads get expensive very quickly{" "}
              <span className={"dot"}> .</span>
            </h2>

            <p
              className={"lead"}
              style={{ marginTop: "22px", maxWidth: "620px" }}
            >
              {" "}
              Same spend. Same customer value. Very different businesses.
            </p>
          </div>

          <div className={"camp"}>
            <div className={"ccard rv"}>
              <div className={"ch"}> Campaign A</div>

              <div className={"crow"}>
                <div className={"cl"}> Spend</div>
                <div className={"cvv"}> ₹1,00,000</div>
              </div>

              <div className={"crow"}>
                <div className={"cl"}> Leads</div>
                <div className={"cvv"}> 200</div>
              </div>

              <div className={"crow"}>
                <div className={"cl"}> Cost per lead</div>
                <div className={"cvv"}> ₹500</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Qualified</div>
                <div className={"cvv"}> 20</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Appointments</div>
                <div className={"cvv"}> 10</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Show-ups</div>
                <div className={"cvv"}> 5</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Customers</div>
                <div className={"cvv"}> 2</div>
              </div>

              <div className={"ctot"}>
                <div className={"cl"}> Revenue</div>
                <div className={"cvv"}> ₹1.5L</div>
              </div>
            </div>

            <div className={"ccard win rv"}>
              <div className={"ch"}> Campaign B</div>

              <div className={"crow"}>
                <div className={"cl"}> Spend</div>
                <div className={"cvv"}> ₹1,00,000</div>
              </div>

              <div className={"crow"}>
                <div className={"cl"}> Leads</div>
                <div className={"cvv"}> 100</div>
              </div>

              <div className={"crow"}>
                <div className={"cl"}> Cost per lead</div>
                <div className={"cvv"}> ₹1,000</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Qualified</div>
                <div className={"cvv"}> 60</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Appointments</div>
                <div className={"cvv"}> 35</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Show-ups</div>
                <div className={"cvv"}> 25</div>
              </div>

              <div className={"crow hi"}>
                <div className={"cl"}> Customers</div>
                <div className={"cvv"}> 10</div>
              </div>

              <div className={"ctot"}>
                <div className={"cl"}> Revenue</div>
                <div className={"cvv"}> ₹7.5L</div>
              </div>
            </div>
          </div>

          <div className={"econ-close rv"}>
            <p className={"big"}>
              {" "}
              2× the CPL. <span className={"red"}> 5× the revenue.</span>
            </p>

            <p
              className={"lead"}
              style={{
                marginTop: "20px",
                maxWidth: "660px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Optimise for CPL and Campaign A wins. Optimise for the business
              and it isn&apos;t close.
            </p>

            <span className={"illus"}>
              {" "}
              Illustrative model · assumes ₹75,000 customer value
            </span>
          </div>
        </div>
      </section>

      {/* ═══ 15 · REACTIVATION ═══ */}

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"react"}>
            <div>
              <div className={"eyebrow rv"}>
                {" "}
                The database you already paid for
              </div>

              <h2 className={"d2 rv"} style={{ marginTop: "18px" }}>
                {" "}
                Your next customer may already be in your CRM{" "}
                <span className={"dot"}> .</span>
              </h2>

              <p
                className={"lead rv"}
                style={{ marginTop: "22px", maxWidth: "480px" }}
              >
                Before paying to acquire every new lead, it&apos;s worth asking what
                happened to the old ones.
              </p>

              <div className={"cap rv"} style={{ marginTop: "28px" }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--ui)",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  {" "}
                  Reactivation levers
                </h4>

                <ul>
                  <li> WhatsApp</li>
                  <li> Email</li>
                  <li> New offers</li>
                  <li> Educational nurture</li>
                  <li> Seasonal campaigns</li>
                  <li> Service segmentation</li>
                  <li> Unconverted consultations</li>
                  <li> No-show recovery</li>
                </ul>
              </div>
            </div>

            <div className={"dbstack"}>
              <div className={"dbrow rv"}>
                <div className={"dn2"}> 1,000</div>
                <div className={"dl"}>
                  {" "}
                  historical enquiries sitting untouched
                </div>
              </div>

              <div className={"dbrow rv"}>
                <div className={"dn2"}> 5,000</div>
                <div className={"dl"}> people who once raised their hand</div>
              </div>

              <div className={"dbrow rv"}>
                <div className={"dn2"}> 20,000+</div>
                <div className={"dl"}> leads you have already paid for</div>
              </div>

              <div
                className={"dbrow rv"}
                style={{
                  borderColor: "var(--red)",
                  background: "rgba(193,2,49,.12)",
                }}
              >
                <div className={"dn2"}> ₹0</div>
                <div className={"dl"}>
                  {" "}
                  additional media cost to reach them again
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 16 · INDUSTRIES (interactive) ═══ */}

      <section className={"lever paper"} id={"industries"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "860px" }}>
            <div className={"eyebrow"}> Who we build this for</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Same principles. Different buyer journeys{" "}
              <span className={"dot"}> .</span>
            </h2>

            <p
              className={"lead"}
              style={{ marginTop: "22px", maxWidth: "680px" }}
            >
              Strategy changes with buying behaviour, deal value, sales cycle
              and market. Select a category to see the journey we build around.
            </p>
          </div>

          <div className={"itabs rv"}>
            <button className={"itab on"} data-i={"health"}>
              {" "}
              Healthcare
            </button>
            <button className={"itab"} data-i={"aesthetics"}>
              {" "}
              Aesthetics
            </button>
            <button className={"itab"} data-i={"realestate"}>
              {" "}
              Real Estate
            </button>
            <button className={"itab"} data-i={"education"}>
              {" "}
              Education
            </button>
            <button className={"itab"} data-i={"prof"}>
              {" "}
              Professional Services
            </button>
            <button className={"itab"} data-i={"home"}>
              {" "}
              Home &amp; Lifestyle
            </button>
          </div>

          <div className={"ipanel on"} data-p={"health"}>
            <div className={"ipanel-grid"}>
              <div>
                <h3 className={"d4"}> Healthcare</h3>

                <div className={"ilist"} style={{ marginTop: "18px" }}>
                  {" "}
                  <span> IVF / fertility</span> <span> Dental clinics</span>{" "}
                  <span> Specialist clinics</span> <span> Hospitals</span>{" "}
                  <span> Hair restoration</span>
                </div>
              </div>

              <div>
                <div className={"micro"} style={{ marginBottom: "16px" }}>
                  {" "}
                  The journey we build
                </div>

                <div className={"ijourney"}>
                  {" "}
                  <b> Lead</b> <i> →</i> <b> Eligibility</b> <i> →</i>{" "}
                  <b> Consultation</b> <i> →</i> <b> Show-up</b> <i> →</i>{" "}
                  <b> Treatment</b>
                </div>
              </div>
            </div>
          </div>

          <div className={"ipanel"} data-p={"aesthetics"}>
            <div className={"ipanel-grid"}>
              <div>
                <h3 className={"d4"}> Aesthetics</h3>

                <div className={"ilist"} style={{ marginTop: "18px" }}>
                  {" "}
                  <span> Aesthetic clinics</span> <span> Skin and laser</span>{" "}
                  <span> Cosmetic procedures</span> <span> Wellness</span>
                </div>
              </div>

              <div>
                <div className={"micro"} style={{ marginBottom: "16px" }}>
                  {" "}
                  The journey we build
                </div>

                <div className={"ijourney"}>
                  {" "}
                  <b> Lead</b> <i> →</i> <b> Consultation</b> <i> →</i>{" "}
                  <b> Show-up</b> <i> →</i> <b> Treatment</b> <i> →</i>{" "}
                  <b> Repeat</b>
                </div>
              </div>
            </div>
          </div>

          <div className={"ipanel"} data-p={"realestate"}>
            <div className={"ipanel-grid"}>
              <div>
                <h3 className={"d4"}> Real Estate</h3>

                <div className={"ilist"} style={{ marginTop: "18px" }}>
                  {" "}
                  <span> Residential projects</span>{" "}
                  <span> Premium properties</span>{" "}
                  <span> Luxury real estate</span>{" "}
                  <span> Property investment</span>
                </div>
              </div>

              <div>
                <div className={"micro"} style={{ marginBottom: "16px" }}>
                  {" "}
                  The journey we build
                </div>

                <div className={"ijourney"}>
                  {" "}
                  <b> Lead</b> <i> →</i> <b> Qualification</b> <i> →</i>{" "}
                  <b> Site visit</b> <i> →</i> <b> Negotiation</b> <i> →</i>{" "}
                  <b> Booking</b>
                </div>
              </div>
            </div>
          </div>

          <div className={"ipanel"} data-p={"education"}>
            <div className={"ipanel-grid"}>
              <div>
                <h3 className={"d4"}> Education</h3>

                <div className={"ilist"} style={{ marginTop: "18px" }}>
                  {" "}
                  <span> Executive education</span> <span> Study abroad</span>{" "}
                  <span> Premium programmes</span>{" "}
                  <span> Professional education</span>
                </div>
              </div>

              <div>
                <div className={"micro"} style={{ marginBottom: "16px" }}>
                  {" "}
                  The journey we build
                </div>

                <div className={"ijourney"}>
                  {" "}
                  <b> Lead</b> <i> →</i> <b> Counselling</b> <i> →</i>{" "}
                  <b> Application</b> <i> →</i> <b> Enrolment</b>
                </div>
              </div>
            </div>
          </div>

          <div className={"ipanel"} data-p={"prof"}>
            <div className={"ipanel-grid"}>
              <div>
                <h3 className={"d4"}> Professional Services</h3>

                <div className={"ilist"} style={{ marginTop: "18px" }}>
                  {" "}
                  <span> Consulting</span> <span> Legal</span>{" "}
                  <span> Financial services</span> <span> Immigration</span>{" "}
                  <span> Corporate services</span>
                </div>
              </div>

              <div>
                <div className={"micro"} style={{ marginBottom: "16px" }}>
                  {" "}
                  The journey we build
                </div>

                <div className={"ijourney"}>
                  {" "}
                  <b> Lead</b> <i> →</i> <b> Qualification</b> <i> →</i>{" "}
                  <b> Discovery</b> <i> →</i> <b> Proposal</b> <i> →</i>{" "}
                  <b> Client</b>
                </div>
              </div>
            </div>
          </div>

          <div className={"ipanel"} data-p={"home"}>
            <div className={"ipanel-grid"}>
              <div>
                <h3 className={"d4"}> Home &amp; Lifestyle</h3>

                <div className={"ilist"} style={{ marginTop: "18px" }}>
                  {" "}
                  <span> Interior design</span> <span> Architecture</span>{" "}
                  <span> Premium renovation</span>{" "}
                  <span> Solar and energy</span>{" "}
                  <span> High-value home services</span>
                </div>
              </div>

              <div>
                <div className={"micro"} style={{ marginBottom: "16px" }}>
                  {" "}
                  The journey we build
                </div>

                <div className={"ijourney"}>
                  {" "}
                  <b> Lead</b> <i> →</i> <b> Qualification</b> <i> →</i>{" "}
                  <b> Site survey</b> <i> →</i> <b> Quote</b> <i> →</i>{" "}
                  <b> Project</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 17 · PROOF ═══ */}

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"lever-head"} style={{ alignItems: "end" }}>
            <div className={"rv"}>
              <div className={"eyebrow"}> Selected work</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Results beyond the form fill <span className={"dot"}> .</span>
              </h2>
            </div>

            <div className={"rv"} style={{ justifySelf: "end" }}>
              <a href={"#"} className={"link-u"}>
                {" "}
                View all lead gen work
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
                  Clinic environment or CRM appointment board. Real, not stock.
                </div>
              </div>

              <div className={"cb"}>
                <div className={"cn"}> Aesthetics / Healthcare</div>

                <div
                  className={"constraint2"}
                  style={{
                    borderLeft: "2px solid var(--red)",
                    paddingLeft: "13px",
                  }}
                >
                  <div
                    className={"cl2"}
                    style={{
                      fontSize: "9.5px",
                      fontWeight: "700",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.36)",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                    The constraint
                  </div>

                  <div
                    className={"cx2"}
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.45",
                      color: "rgba(255,255,255,.82)",
                      fontWeight: "300",
                    }}
                  >
                    {" "}
                    Leads arrived, but consultations were not being attended.
                  </div>
                </div>

                <div className={"res"}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"rl"}> Qualified consultations</div>
                </div>

                <div className={"res"} style={{ border: "0", paddingTop: "0" }}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> XX%</span>
                  </div>
                  <div className={"rl"}> Show-up rate</div>
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
                  View case study →
                </a>
              </div>
            </article>

            <article className={"case rv"}>
              <div className={"ph shot"}>
                <div className={"tag"}> Image</div>
                <div className={"desc"}>
                  {" "}
                  Project creative or site-visit footage still.
                </div>
              </div>

              <div className={"cb"}>
                <div className={"cn"}> Real Estate</div>

                <div
                  className={"constraint2"}
                  style={{
                    borderLeft: "2px solid var(--red)",
                    paddingLeft: "13px",
                  }}
                >
                  <div
                    className={"cl2"}
                    style={{
                      fontSize: "9.5px",
                      fontWeight: "700",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.36)",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                    The constraint
                  </div>

                  <div
                    className={"cx2"}
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.45",
                      color: "rgba(255,255,255,.82)",
                      fontWeight: "300",
                    }}
                  >
                    {" "}
                    High enquiry volume, very low site-visit conversion.
                  </div>
                </div>

                <div className={"res"}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"rl"}> Site visits</div>
                </div>

                <div className={"res"} style={{ border: "0", paddingTop: "0" }}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> ₹XX Cr</span>
                  </div>
                  <div className={"rl"}> Bookings influenced</div>
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
                  View case study →
                </a>
              </div>
            </article>

            <article className={"case rv"}>
              <div className={"ph shot"}>
                <div className={"tag"}> Image</div>
                <div className={"desc"}>
                  {" "}
                  Campus, counselling session or programme creative.
                </div>
              </div>

              <div className={"cb"}>
                <div className={"cn"}> Education</div>

                <div
                  className={"constraint2"}
                  style={{
                    borderLeft: "2px solid var(--red)",
                    paddingLeft: "13px",
                  }}
                >
                  <div
                    className={"cl2"}
                    style={{
                      fontSize: "9.5px",
                      fontWeight: "700",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.36)",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                    The constraint
                  </div>

                  <div
                    className={"cx2"}
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.45",
                      color: "rgba(255,255,255,.82)",
                      fontWeight: "300",
                    }}
                  >
                    {" "}
                    Enquiries that never reached a counselling conversation.
                  </div>
                </div>

                <div className={"res"}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"rl"}> Qualified applications</div>
                </div>

                <div className={"res"} style={{ border: "0", paddingTop: "0" }}>
                  <div className={"rv2"}>
                    {" "}
                    <span className={"tbd"}> XX</span>
                  </div>
                  <div className={"rl"}> Enrolments</div>
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
                  View case study →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══ 18 · WHY DARE ═══ */}

      <section className={"lever ink"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Why Dare</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Because acquisition doesn&apos;t stop at acquisition{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"why"}>
            <div className={"wcard rv"}>
              <div className={"wi"}> 01</div>
              <div className={"wt"}> Paid + Organic</div>
              <div className={"wd"}>
                {" "}
                We capture immediate demand and compound it over time.
              </div>
            </div>

            <div className={"wcard rv"}>
              <div className={"wi"}> 02</div>
              <div className={"wt"}> Creative + Media</div>
              <div className={"wd"}>
                {" "}
                Creative strategy isn&apos;t separated from performance data.
              </div>
            </div>

            <div className={"wcard rv"}>
              <div className={"wi"}> 03</div>
              <div className={"wt"}> Acquisition + CRO</div>
              <div className={"wd"}>
                {" "}
                We work on what happens after the click, not just before it.
              </div>
            </div>

            <div className={"wcard rv"}>
              <div className={"wi"}> 04</div>
              <div className={"wt"}> Marketing + CRM</div>
              <div className={"wd"}>
                {" "}
                We connect acquisition with qualification and follow-up.
              </div>
            </div>

            <div className={"wcard rv"}>
              <div className={"wi"}> 05</div>
              <div className={"wt"}> Leads + Revenue</div>
              <div className={"wd"}>
                {" "}
                We push measurement down the funnel wherever your systems allow.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 19 · OPERATING MODEL + 90 DAYS ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"lever-head"}>
            <div className={"rv"}>
              <div className={"eyebrow"}> How we work</div>

              <h2 className={"d2"} style={{ marginTop: "16px" }}>
                {" "}
                Specialists around one customer-acquisition system{" "}
                <span className={"dot"}> .</span>
              </h2>
            </div>

            <p className={"lead rv"}>
              {" "}
              Your Growth Lead owns the acquisition strategy. Specialists own
              their channels. Data from your lead and sales process decides what
              we optimise next.
            </p>
          </div>

          <div className={"pod rv"}>
            <div className={"pod-top"}> Your Business</div>

            <div className={"vlnl"}></div>

            <div className={"pod-lead"}> Growth Lead</div>

            <div className={"vlnl"}></div>

            <div className={"pod-bar"}></div>

            <div className={"vlnl"}></div>

            <div
              className={"pod-spokes"}
              style={{ gridTemplateColumns: "repeat(5,1fr)" }}
            >
              <div className={"pspoke"}>
                {" "}
                <b> Meta</b>
              </div>

              <div className={"pspoke"}>
                {" "}
                <b> Google</b>
              </div>

              <div className={"pspoke"}>
                {" "}
                <b> SEO</b>
              </div>

              <div className={"pspoke"}>
                {" "}
                <b> Creative</b>
              </div>

              <div className={"pspoke"}>
                {" "}
                <b> CRO</b>
              </div>
            </div>

            <div className={"vlnl"}></div>

            <div className={"pod-bar"}></div>

            <div className={"vlnl"}></div>

            <div className={"pod-top"}> CRM / Data  ·  Lead Operations</div>

            <div className={"vlnl"}></div>

            <div className={"pod-bot"}> Revenue</div>
          </div>
        </div>
      </section>

      <section className={"lever dark"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "820px" }}>
            <div className={"eyebrow"}> The first 90 days</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Diagnose. Build. Optimise for quality{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"days"}>
            <div className={"day rv"}>
              <div className={"day-hd"}>
                <div className={"dr"}> Days 1–30</div>
                <div className={"dt"}> Diagnose the funnel</div>
              </div>

              <div className={"day-bd"}>
                <ul>
                  <li> Offer and customer economics</li>
                  <li> Historical campaigns</li>
                  <li> Lead quality</li>
                  <li> Creative</li>
                  <li> Search demand</li>
                  <li> Landing pages</li>
                  <li> CRM and follow-up</li>
                  <li> Appointment and sales rates</li>
                </ul>
              </div>

              <div className={"day-out"}>
                <div className={"ol"}> Output</div>
                <div className={"ov"}> Lead-to-Revenue Diagnostic</div>
              </div>
            </div>

            <div className={"day rv"}>
              <div className={"day-hd"}>
                <div className={"dr"}> Days 31–60</div>
                <div className={"dt"}> Build the engine</div>
              </div>

              <div className={"day-bd"}>
                <ul>
                  <li> Campaign architecture</li>
                  <li> Creative pipeline</li>
                  <li> Landing pages</li>
                  <li> Tracking</li>
                  <li> CRM stages</li>
                  <li> Lead qualification</li>
                  <li> WhatsApp automation</li>
                  <li> Follow-up process</li>
                </ul>
              </div>

              <div className={"day-out"}>
                <div className={"ol"}> Output</div>
                <div className={"ov"}> Acquisition Operating System</div>
              </div>
            </div>

            <div className={"day rv"}>
              <div className={"day-hd"}>
                <div className={"dr"}> Days 61–90</div>
                <div className={"dt"}> Optimise for quality</div>
              </div>

              <div className={"day-bd"}>
                <ul>
                  <li> Scale winning campaigns</li>
                  <li> Improve CPQL</li>
                  <li> Test offers</li>
                  <li> Improve conversion</li>
                  <li> Analyse appointments</li>
                  <li> Feed sales data back</li>
                  <li> Reactivate old leads</li>
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
            <span className={"red"}>
              {" "}
              Improve every conversion between spend and revenue.
            </span>
          </p>
        </div>
      </section>

      {/* ═══ 20 · FIT ═══ */}

      <section className={"lever paper"}>
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "800px" }}>
            <div className={"eyebrow"}> Fit matters</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              This isn&apos;t built for every service business{" "}
              <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"fit-grid"}>
            <div className={"fitcol yes rv"}>
              <h4> Strong fit if</h4>

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
                  One new customer is worth meaningful revenue.
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
                  Your service has already proven demand.
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
                  You can fulfil more customers.
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
                  Someone is responsible for handling leads.
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
                  You&apos;re willing to improve the follow-up process.
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
                  You&apos;re prepared to share sales outcomes.
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
                  You have enough media budget to test properly.
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
                  You want growth, not just cheap leads.
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
                  You haven&apos;t validated the service yet.
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
                  You don&apos;t have anyone to follow up leads.
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
                  Your only KPI is CPL.
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
                  You want guaranteed lead quantities.
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
                  You expect every lead to convert.
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
                  You won&apos;t share what happens after leads are generated.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 21 · FAQ ═══ */}

      <section
        className={"lever paper"}
        id={"faqs"}
        style={{ paddingTop: "0" }}
      >
        <div className={"wrap"}>
          <div className={"rv"} style={{ maxWidth: "760px" }}>
            <div className={"eyebrow"}> Questions founders ask</div>

            <h2 className={"d2"} style={{ marginTop: "18px" }}>
              {" "}
              Before you enquire <span className={"dot"}> .</span>
            </h2>
          </div>

          <div className={"faq rv"}>
            <div className={"fitem"}>
              <button className={"fq"}>
                {" "}
                How much should we spend on advertising?
              </button>

              <div className={"fa"}>
                <p>
                  {" "}
                  It depends on your market, customer value, existing conversion
                  rates and growth target. We set the testing budget during the
                  diagnostic rather than prescribing the same number to every
                  business.
                </p>
              </div>
            </div>

            <div className={"fitem"}>
              <button className={"fq"}> Do you guarantee leads?</button>

              <div className={"fa"}>
                <p>
                  {" "}
                  No. We build and optimise acquisition systems, but guaranteed
                  lead volumes usually require compromising either quality or
                  the definition of a &quot;lead.&quot;
                </p>
              </div>
            </div>

            <div className={"fitem"}>
              <button className={"fq"}> Do you handle sales calls?</button>

              <div className={"fa"}>
                <p>
                  {" "}
                  Our role is marketing and lead-to-revenue infrastructure. We
                  help improve lead routing, qualification, follow-up and
                  measurement. Your team remains responsible for closing.
                </p>
              </div>
            </div>

            <div className={"fitem"}>
              <button className={"fq"}>
                {" "}
                Can you work with our existing CRM?
              </button>

              <div className={"fa"}>
                <p>
                  {" "}
                  Usually yes, depending on the CRM and how it&apos;s set up. We
                  first assess how leads are currently captured, routed and
                  tracked before recommending changes.
                </p>
              </div>
            </div>

            <div className={"fitem"}>
              <button className={"fq"}> Do you work only with Meta Ads?</button>

              <div className={"fa"}>
                <p>
                  {" "}
                  No. Depending on demand and category, the mix may include
                  Meta, Google Search, SEO, retargeting and other relevant
                  channels.
                </p>
              </div>
            </div>

            <div className={"fitem"}>
              <button className={"fq"}> How quickly can this work?</button>

              <div className={"fa"}>
                <p>
                  {" "}
                  Paid acquisition generates signals quickly, but a reliable
                  lead-to-revenue system needs enough data to evaluate lead
                  quality, appointment rates and sales outcomes. SEO and organic
                  acquisition operate on longer timelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 22 · FINAL CTA ═══ */}

      <section className={"final"} id={"diagnostic"}>
        <div className={"wrap"}>
          <div
            className={"eyebrow plain rv"}
            style={{ justifyContent: "center" }}
          >
            {" "}
            High-Ticket Lead Generation
          </div>

          <h2 className={"rv"}>
            {" "}
            Don&apos;t just generate more leads. <br /> Build a better path to
            revenue.
          </h2>

          <p className={"rv"}>
            {" "}
            We&apos;ll look at your acquisition, lead quality, landing experience,
            follow-up and conversion process to identify where growth is being
            lost.
          </p>

          <div
            className={"hero-cta rv"}
            style={{
              justifyContent: "center",
              marginTop: "clamp(32px,3.8vw,48px)",
            }}
          >
            <a href={"#"} className={"btn btn-white"}>
              {" "}
              Get a Lead Generation Diagnostic
              <svg
                width={"15"}
                height={"15"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
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
            <a
              href={"#results"}
              className={"btn"}
              style={{
                border: "1px solid rgba(255,255,255,.45)",
                color: "#fff",
              }}
            >
              {" "}
              See Our Lead Gen Work
              <svg
                width={"15"}
                height={"15"}
                viewBox={"0 0 14 14"}
                fill={"none"}
              >
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
          </div>

          <p className={"fine rv"}>
            {" "}
            For established high-ticket service businesses ready to build a more
            predictable customer acquisition engine.
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
    </main>
  );
}
