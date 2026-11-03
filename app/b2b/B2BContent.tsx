"use client";

import { useEffect, useRef } from "react";

export default function B2BContent() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );
    page.querySelectorAll<HTMLElement>(".rv").forEach((element, index) => {
      element.style.transitionDelay = String((index % 4) * 70) + "ms";
      revealObserver.observe(element);
    });

    const pipelineRows = Array.from(page.querySelectorAll<HTMLElement>(".prow[data-stage]"));
    let activeRow = 0;
    const pipelineTimer = pipelineRows.length
      ? window.setInterval(() => {
          pipelineRows.forEach((row) => row.classList.remove("live"));
          pipelineRows[activeRow % pipelineRows.length].classList.add("live");
          activeRow += 1;
        }, 620)
      : undefined;

    const countTimers = new Set<number>();
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          const target = Number.parseInt((element.textContent || "").replace(/,/g, ""), 10);
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
    page.querySelectorAll(".prow .pn").forEach((element) => countObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      if (pipelineTimer !== undefined) window.clearInterval(pipelineTimer);
      countTimers.forEach((timer) => window.clearInterval(timer));
    };
  }, []);

  return <div className="b2b-page" ref={pageRef}>

<div className="announce">Accepting a limited number of B2B growth partnerships for Q4 &nbsp;→</div>


<section className="hero">
  <div className="wrap">
    <div className="hero-grid">
      <div>
        <div className="eyebrow">Dare B2B / B2B Growth</div>
        <h1 className="d1">Build pipeline.<br />Not just leads<span className="dot">.</span></h1>
        <p className="hero-sub">
          We help B2B companies connect search, paid acquisition, content, conversion and revenue operations to turn market demand into qualified pipeline.
        </p>
        <div className="hero-cta">
          <a href="#diagnostic" className="btn btn-red">Get a B2B Growth Diagnostic
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#work" className="btn btn-ghost">See Our B2B Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
        <div className="hero-caps">
          <span>SEO</span><span>Paid Demand</span><span>Content</span><span>Website &amp; CRO</span><span>CRM</span><span>Attribution</span>
        </div>
      </div>

      <div className="pipe">
        <div className="pipe-hd">
          <div className="t">Pipeline View</div>
          <div className="st"><i></i><span>Live</span></div>
        </div>

        <div className="prow" data-stage=""><div className="pl">Market demand</div><div className="pbar" style={{ "width": "100%" }}></div><div className="pn">10,000</div></div>
        <div className="prow" data-stage=""><div className="pl">Search &amp; paid</div><div className="pbar" style={{ "width": "82%" }}></div><div className="pn">3,200</div></div>
        <div className="prow" data-stage=""><div className="pl">Website</div><div className="pbar" style={{ "width": "64%" }}></div><div className="pn">1,450</div></div>
        <div className="prow" data-stage=""><div className="pl">Lead</div><div className="pbar" style={{ "width": "48%" }}></div><div className="pn">210</div></div>
        <div className="prow" data-stage=""><div className="pl">MQL</div><div className="pbar" style={{ "width": "36%" }}></div><div className="pn">95</div></div>
        <div className="prow" data-stage=""><div className="pl">SQL</div><div className="pbar" style={{ "width": "26%" }}></div><div className="pn">41</div></div>
        <div className="prow" data-stage=""><div className="pl">Opportunity</div><div className="pbar" style={{ "width": "18%" }}></div><div className="pn">16</div></div>
        <div className="prow gold" data-stage=""><div className="pl">Closed won</div><div className="pbar" style={{ "width": "12%" }}></div><div className="pn">7</div></div>

        <div className="pipe-ft">Most agencies optimise the top. <b>We optimise the bottom.</b></div>
      </div>
    </div>
  </div>
</section>


<section className="icp paper">
  <div className="wrap">
    <div className="icp-grid">
      <div className="rv">
        <div className="eyebrow">Built for B2B</div>
        <h2 className="d3" style={{ "marginTop": "16px" }}>For companies that have something worth selling, and need more of the right buyers to find it<span className="dot">.</span></h2>
      </div>
      <div className="rv">
        <div className="icp-chips">
          <div className="icp-chip"><div className="n">Proven</div><div className="d">Product or service</div></div>
          <div className="icp-chip"><div className="n">Defined</div><div className="d">Ideal customer profile</div></div>
          <div className="icp-chip"><div className="n">Meaningful</div><div className="d">Deal value / ACV</div></div>
          <div className="icp-chip"><div className="n">In place</div><div className="d">Sales capability</div></div>
          <div className="icp-chip"><div className="n">Clear</div><div className="d">Growth ambition</div></div>
          <div className="icp-chip"><div className="n">India / GCC</div><div className="d">And international</div></div>
        </div>
        <p className="icp-out">If you&apos;re still validating whether the market wants what you sell, we&apos;re probably too early.</p>
      </div>
    </div>
  </div>
</section>


<section className="dark" style={{ "padding": "var(--sect) 0" }}>
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "880px" }}>
      <div className="eyebrow">The problem</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>More leads won&apos;t fix a broken revenue engine<span className="dot">.</span></h2>
      <p className="lead" style={{ "marginTop": "24px", "maxWidth": "700px" }}>
        Most B2B growth problems aren&apos;t caused by a lack of marketing activity. Companies are already running ads, publishing content, investing in SEO, rebuilding websites and asking sales teams to follow up. The problem is that these activities don&apos;t connect.
      </p>
    </div>

    <div className="stages" style={{ "gridTemplateColumns": "repeat(3,1fr)" }}>
      <div className="stage rv">
        <div className="rng">SEO</div>
        <div className="job">Produces</div>
        <ul><li>Traffic</li><li>A monthly report</li></ul>
      </div>
      <div className="stage rv">
        <div className="rng">Paid</div>
        <div className="job">Produces</div>
        <ul><li>Leads</li><li>A monthly report</li></ul>
      </div>
      <div className="stage rv">
        <div className="rng">Content</div>
        <div className="job">Produces</div>
        <ul><li>Engagement</li><li>A monthly report</li></ul>
      </div>
    </div>

    <p className="pos-close rv" style={{ "textAlign": "left", "marginTop": "clamp(40px,4.6vw,64px)", "maxWidth": "840px" }}>
      Three reports. No shared answer to the only question that matters: <span className="red">what happened to pipeline?</span>
    </p>
  </div>
</section>


<section className="ink" style={{ "padding": "var(--sect) 0" }}>
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "760px" }}>
      <div className="eyebrow">Sound familiar?</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>You&apos;ve probably said at least three of these<span className="dot">.</span></h2>
    </div>

    <div className="symp">
      <div className="sq rv"><div className="qm">&quot;</div><p>We generate leads. Sales says they&apos;re poor quality.</p></div>
      <div className="sq rv"><div className="qm">&quot;</div><p>Our SEO traffic is growing, but enquiries aren&apos;t.</p></div>
      <div className="sq rv"><div className="qm">&quot;</div><p>Google Ads works, but CPL keeps increasing.</p></div>
      <div className="sq rv"><div className="qm">&quot;</div><p>We publish content, but nobody knows if it influences revenue.</p></div>
      <div className="sq rv"><div className="qm">&quot;</div><p>Our website looks good but doesn&apos;t generate enough conversations.</p></div>
      <div className="sq rv"><div className="qm">&quot;</div><p>Marketing reports leads. Sales reports pipeline. The numbers never connect.</p></div>
    </div>

    <p className="d3 rv" style={{ "marginTop": "clamp(40px,4.6vw,62px)", "maxWidth": "820px" }}>
      These aren&apos;t six separate problems. They&apos;re symptoms of a <span className="red">disconnected B2B growth system</span>.
    </p>
  </div>
</section>


<section className="lever paper">
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "860px" }}>
      <div className="eyebrow">Our point of view</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>Your marketing funnel shouldn&apos;t end at a form submission<span className="dot">.</span></h2>
    </div>

    <div className="vs">
      <div className="vscol old rv">
        <h4>Old B2B marketing</h4>
        <div className="vstep"><span className="vd"></span><span>Ad / SEO</span></div>
        <div className="vstep"><span className="vd"></span><span>Landing page</span></div>
        <div className="vstep"><span className="vd"></span><span>Form submission</span></div>
        <div className="vstep"><span className="vd"></span><span>&quot;Lead generated&quot;</span></div>
        <div className="vstop">Marketing stops measuring here. Sales inherits the problem.</div>
      </div>

      <div className="vscol new rv">
        <h4>Dare B2B</h4>
        <div className="vstep"><span className="vd"></span><span>Demand</span></div>
        <div className="vstep"><span className="vd"></span><span>Visitor</span></div>
        <div className="vstep"><span className="vd"></span><span>Lead</span></div>
        <div className="vstep"><span className="vd"></span><span>MQL</span></div>
        <div className="vstep"><span className="vd"></span><span>SQL</span></div>
        <div className="vstep"><span className="vd"></span><span>Opportunity</span></div>
        <div className="vstep"><span className="vd"></span><span>Pipeline</span></div>
        <div className="vstep"><span className="vd"></span><span>Revenue</span></div>
        <div className="vstop">We build backwards from here.</div>
      </div>
    </div>

    <p className="d3 rv" style={{ "marginTop": "clamp(38px,4.4vw,58px)", "maxWidth": "800px" }}>
      Marketing shouldn&apos;t celebrate a lead that sales would never pursue.
    </p>
  </div>
</section>


<section className="sys dark" id="system" style={{ "background": "var(--black)" }}>
  <div className="wrap">
    <div className="sys-head rv">
      <div className="eyebrow plain" style={{ "justifyContent": "center" }}>The Dare B2B System</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>Demand → Capture → Convert → Qualify → <span className="red">Pipeline</span><span className="dot">.</span></h2>
    </div>

    <div className="rsys rv" style={{ "background": "rgba(255,255,255,.03)", "borderColor": "var(--line-dark)", "boxShadow": "none" }}>
      <div className="rcap rd">Market</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>Create Demand</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rbar" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>

      <div className="rtri">
        <div className="rnode" style={{ "background": "rgba(255,255,255,.04)", "borderColor": "var(--line-dark)" }}><b style={{ "color": "#fff" }}>Content</b><span style={{ "color": "rgba(255,255,255,.45)" }}>Educate the market</span></div>
        <div className="rnode" style={{ "background": "rgba(255,255,255,.04)", "borderColor": "var(--line-dark)" }}><b style={{ "color": "#fff" }}>Founder POV</b><span style={{ "color": "rgba(255,255,255,.45)" }}>Build familiarity</span></div>
        <div className="rnode" style={{ "background": "rgba(255,255,255,.04)", "borderColor": "var(--line-dark)" }}><b style={{ "color": "#fff" }}>Paid</b><span style={{ "color": "rgba(255,255,255,.45)" }}>Amplify reach</span></div>
      </div>

      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rbar" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>Capture Demand</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>

      <div className="rduo">
        <div className="rnode" style={{ "background": "rgba(255,255,255,.04)", "borderColor": "var(--line-dark)" }}><b style={{ "color": "#fff" }}>SEO</b><span style={{ "color": "rgba(255,255,255,.45)" }}>Own the result</span></div>
        <div className="rnode" style={{ "background": "rgba(255,255,255,.04)", "borderColor": "var(--line-dark)" }}><b style={{ "color": "#fff" }}>Paid Search</b><span style={{ "color": "rgba(255,255,255,.45)" }}>Buy the intent</span></div>
      </div>

      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>Website</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>Convert</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>Qualify</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>CRM</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap ln" style={{ "borderColor": "var(--line-dark)", "color": "#fff", "background": "rgba(255,255,255,.05)" }}>Opportunity</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap rd">Pipeline</div>
      <div className="rv-line" style={{ "background": "var(--line-dark)" }}></div>
      <div className="rcap dk" style={{ "background": "#fff", "color": "var(--red)" }}>Revenue</div>
    </div>

    <p className="lead rv" style={{ "textAlign": "center", "marginTop": "clamp(30px,3.4vw,44px)", "maxWidth": "640px", "marginLeft": "auto", "marginRight": "auto" }}>
      Every capability has a role. Every role connects to a commercial outcome.
    </p>
  </div>
</section>


<section className="lever paper" id="capabilities">
  <div className="wrap">
    <div className="lever-head">
      <div className="rv">
        <div className="lever-num">01</div>
        <div className="eyebrow">Create Demand</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>Be known before the buyer is ready to buy<span className="dot">.</span></h2>
      </div>
      <p className="lead rv">Not every buyer searching your category is ready to speak to sales today, and many of your future buyers aren&apos;t searching yet. Demand creation builds familiarity and category relevance before the buying conversation begins.</p>
    </div>

    <div className="cols3">
      <div className="cap rv">
        <h4>Content</h4>
        <ul><li>Thought leadership</li><li>Industry insights</li><li>Buyer education</li><li>Research</li><li>Case studies</li><li>Expert content</li></ul>
      </div>
      <div className="cap rv">
        <h4>Founder-led distribution</h4>
        <ul><li>LinkedIn</li><li>Expert POV</li><li>Founder content</li><li>Executive positioning</li></ul>
      </div>
      <div className="cap rv">
        <h4>Paid distribution</h4>
        <ul><li>LinkedIn</li><li>Meta where relevant</li><li>Video amplification</li><li>Retargeting</li></ul>
      </div>
    </div>

    <p className="d3 rv" style={{ "marginTop": "clamp(36px,4.2vw,56px)", "maxWidth": "700px" }}>
      The objective isn&apos;t impressions. It&apos;s becoming <span className="red">familiar to the right market</span>.
    </p>
  </div>
</section>


<section className="lever dark">
  <div className="wrap">
    <div className="lever-head">
      <div className="rv">
        <div className="lever-num">02</div>
        <div className="eyebrow">Capture Demand</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>When buyers start looking, you need to be there<span className="dot">.</span></h2>
      </div>
      <p className="lead rv">B2B search volume is small compared with consumer search. But one commercially relevant query can be worth an entire quarter. We don&apos;t build B2B SEO around traffic. We build it around commercial intent.</p>
    </div>

    <div className="queries">
      <div className="query rv">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span>industrial packaging manufacturer</span><span className="badge">High intent</span>
      </div>
      <div className="query rv">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span>enterprise HR software India</span><span className="badge">High intent</span>
      </div>
      <div className="query rv">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span>commercial solar EPC company</span><span className="badge">High intent</span>
      </div>
      <div className="query rv">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span>transformer manufacturer</span><span className="badge">High intent</span>
      </div>
    </div>

    <p className="d4 rv" style={{ "marginTop": "clamp(38px,4.4vw,56px)", "marginBottom": "6px" }}>One search. Two outcomes<span className="dot">.</span></p>
    <div className="serp">
      <div className="serp-card win rv">
        <div className="who">You own the result</div>
        <div className="url">yourcompany.com › solutions › industrial</div>
        <div className="ttl">Industrial Packaging Manufacturer | Custom Solutions</div>
        <div className="snip">Buyer lands on a page built for their industry, sees relevant proof, and starts a conversation.</div>
      </div>
      <div className="serp-card rv">
        <div className="who">A competitor owns it</div>
        <div className="url">competitor.com › products</div>
        <div className="ttl">Packaging Solutions for Industry</div>
        <div className="snip">The same buyer, the same intent, the same budget. It simply goes somewhere else.</div>
      </div>
    </div>

    <div className="cols3" style={{ "marginTop": "clamp(36px,4.2vw,56px)" }}>
      <div className="cap rv">
        <h4>B2B SEO</h4>
        <ul><li>Commercial keyword strategy</li><li>Solution pages</li><li>Industry pages</li><li>Technical SEO</li><li>Authority</li><li>AI-search discoverability</li></ul>
      </div>
      <div className="cap rv">
        <h4>Paid Search</h4>
        <ul><li>Google Search</li><li>Category demand</li><li>Competitor terms</li><li>High-intent campaigns</li><li>Retargeting</li></ul>
      </div>
      <div className="cap rv">
        <h4>Discoverability</h4>
        <ul><li>Schema</li><li>Entity building</li><li>Comparison content</li><li>Answer surfaces</li></ul>
      </div>
    </div>

    <div className="rv" style={{ "marginTop": "34px", "display": "flex", "gap": "24px", "flexWrap": "wrap" }}>
      <a href="#" className="link-u">Explore B2B SEO
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <a href="#" className="link-u">Explore Paid Demand
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  </div>
</section>


<section className="lever paper">
  <div className="wrap">
    <div className="lever-head">
      <div className="rv">
        <div className="lever-num">03</div>
        <div className="eyebrow">Convert</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>Traffic doesn&apos;t create pipeline. Conversion does<span className="dot">.</span></h2>
      </div>
      <p className="lead rv">Your website has one job: help the right buyer understand why they should continue the conversation. A B2B website shouldn&apos;t just explain the company. It should help buyers make a decision.</p>
    </div>

    <div className="funnel rv" style={{ "gridTemplateColumns": "repeat(6,1fr)" }}>
      <div className="fstep"><div className="fh">Right buyer</div><div className="fb"><span>ICP match</span></div></div>
      <div className="fstep"><div className="fh">Landing page</div><div className="fb"><span>Relevance</span></div></div>
      <div className="fstep"><div className="fh">Proof</div><div className="fb"><span>Case studies</span><span>Clients</span></div></div>
      <div className="fstep"><div className="fh">Trust</div><div className="fb"><span>Credentials</span><span>Specificity</span></div></div>
      <div className="fstep"><div className="fh">CTA</div><div className="fb"><span>Low friction</span></div></div>
      <div className="fstep"><div className="fh">Conversation</div><div className="fb"><span>Qualified</span></div></div>
    </div>

    <div className="cols3" style={{ "marginTop": "clamp(30px,3.4vw,44px)" }}>
      <div className="cap rv">
        <h4>B2B Websites</h4>
        <ul><li>Positioning</li><li>Information architecture</li><li>UX / UI</li><li>Development</li><li>SEO architecture</li></ul>
      </div>
      <div className="cap rv">
        <h4>Conversion</h4>
        <ul><li>Landing pages</li><li>Forms</li><li>CTA strategy</li><li>Proof architecture</li><li>Optimisation</li></ul>
      </div>
      <div className="cap rv">
        <h4>Messaging</h4>
        <ul><li>Industry relevance</li><li>Use cases</li><li>Buyer pain points</li><li>Value proposition</li></ul>
      </div>
    </div>

    <div className="rv" style={{ "marginTop": "34px" }}>
      <a href="#" className="link-u">Explore B2B Websites &amp; CRO
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  </div>
</section>


<section className="lever dark">
  <div className="wrap">
    <div className="lever-head">
      <div className="rv">
        <div className="lever-num">04</div>
        <div className="eyebrow">Qualify</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>Not every lead deserves a sales call<span className="dot">.</span></h2>
      </div>
      <p className="lead rv">Generating 500 leads means very little if only five belong to your ICP. Lead volume is easy to celebrate. Lead quality is harder to fake.</p>
    </div>

    <div className="qfun">
      <div className="qstep rv" style={{ "width": "100%" }}><div className="qn">500</div><div className="ql">Leads</div></div>
      <div className="qdrop"><svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M6 0v16M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.3" /></svg></div>
      <div className="qstep rv" style={{ "width": "84%" }}><div className="qn">120</div><div className="ql">ICP matches</div></div>
      <div className="qdrop"><svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M6 0v16M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.3" /></svg></div>
      <div className="qstep rv" style={{ "width": "68%" }}><div className="qn">60</div><div className="ql">MQLs</div></div>
      <div className="qdrop"><svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M6 0v16M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.3" /></svg></div>
      <div className="qstep rv" style={{ "width": "54%" }}><div className="qn">30</div><div className="ql">SQLs</div></div>
      <div className="qdrop"><svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M6 0v16M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.3" /></svg></div>
      <div className="qstep rv" style={{ "width": "42%" }}><div className="qn">12</div><div className="ql">Opportunities</div></div>
      <div className="qdrop"><svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M6 0v16M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.3" /></svg></div>
      <div className="qstep end rv" style={{ "width": "34%" }}><div className="qn"><span className="tbd">₹XX</span></div><div className="ql">Pipeline</div></div>
    </div>

    <div className="cols3" style={{ "marginTop": "clamp(38px,4.4vw,58px)" }}>
      <div className="cap rv">
        <h4>Firmographic</h4>
        <ul><li>Company size</li><li>Industry</li><li>Geography</li></ul>
      </div>
      <div className="cap rv">
        <h4>Commercial</h4>
        <ul><li>Need</li><li>Deal potential</li><li>Budget signal</li></ul>
      </div>
      <div className="cap rv">
        <h4>Behavioural</h4>
        <ul><li>Buying intent</li><li>Timing</li><li>Engagement depth</li></ul>
      </div>
    </div>
  </div>
</section>


<section className="lever ink">
  <div className="wrap">
    <div className="lever-head">
      <div className="rv">
        <div className="lever-num">05</div>
        <div className="eyebrow">Connect</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>Marketing shouldn&apos;t lose visibility the moment sales takes over<span className="dot">.</span></h2>
      </div>
      <p className="lead rv">Where the data allows, we connect acquisition activity to CRM outcomes, so decisions are based on what becomes pipeline rather than what becomes a form fill.</p>
    </div>

    <div className="loopg">
      <div className="lnode rv"><div className="li">01</div><div className="lt">Marketing</div></div>
      <div className="lnode rv"><div className="li">02</div><div className="lt">Lead</div></div>
      <div className="lnode rv"><div className="li">03</div><div className="lt">CRM</div></div>
      <div className="lnode rv"><div className="li">04</div><div className="lt">MQL → SQL</div></div>
      <div className="lnode rv"><div className="li">05</div><div className="lt">Opportunity</div></div>
      <div className="lnode rv"><div className="li">06</div><div className="lt">Closed won</div></div>
    </div>

    <div className="cols3" style={{ "marginTop": "clamp(36px,4.2vw,54px)" }}>
      <div className="cap rv">
        <h4>Architecture</h4>
        <ul><li>CRM setup</li><li>Lifecycle stages</li><li>Lead routing</li><li>Lead-source tracking</li></ul>
      </div>
      <div className="cap rv">
        <h4>Automation</h4>
        <ul><li>Nurture</li><li>Scoring</li><li>Handoff triggers</li><li>Alerts</li></ul>
      </div>
      <div className="cap rv">
        <h4>Reporting</h4>
        <ul><li>Dashboarding</li><li>Attribution</li><li>Cohort views</li><li>Pipeline reporting</li></ul>
      </div>
    </div>
  </div>
</section>


<section className="reset">
  <div className="wrap">
    <div className="reset-grid">
      <div className="rv">
        <h5>Stop asking only</h5>
        <ul className="stop"><li>How many leads did we get?</li></ul>
      </div>
      <div className="rv">
        <h5>Start asking</h5>
        <ul className="start">
          <li>How many were qualified?</li>
          <li>How many became opportunities?</li>
          <li>How much pipeline did marketing create?</li>
          <li>What did it cost to create an SQL?</li>
          <li>Which channels influence closed revenue?</li>
        </ul>
      </div>
    </div>

    <div className="board-row rv">
      <div className="bl">The Dare B2B Scoreboard</div>
      <span className="bx">Search visibility</span><span className="ar">→</span>
      <span className="bx">Qualified traffic</span><span className="ar">→</span>
      <span className="bx">MQL</span><span className="ar">→</span>
      <span className="bx">SQL</span><span className="ar">→</span>
      <span className="bx">Opportunity</span><span className="ar">→</span>
      <span className="bx">Pipeline</span><span className="ar">→</span>
      <span className="bx fin">Revenue</span>
    </div>
  </div>
</section>


<section className="econ">
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "820px" }}>
      <div className="eyebrow">Why CPL is a misleading target</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>100 leads isn&apos;t necessarily better than 30<span className="dot">.</span></h2>
    </div>

    <div className="camp">
      <div className="ccard rv">
        <div className="ch">Campaign A</div>
        <div className="crow"><div className="cl">Leads</div><div className="cvv">100</div></div>
        <div className="crow"><div className="cl">Cost per lead</div><div className="cvv">₹1,000</div></div>
        <div className="crow"><div className="cl">Spend</div><div className="cvv">₹1L</div></div>
        <div className="crow hi"><div className="cl">SQLs</div><div className="cvv">5</div></div>
        <div className="crow hi"><div className="cl">Opportunities</div><div className="cvv">1</div></div>
        <div className="ctot"><div className="cl">Pipeline created</div><div className="cvv">₹10L</div></div>
      </div>

      <div className="ccard win rv">
        <div className="ch">Campaign B</div>
        <div className="crow"><div className="cl">Leads</div><div className="cvv">30</div></div>
        <div className="crow"><div className="cl">Cost per lead</div><div className="cvv">₹2,500</div></div>
        <div className="crow"><div className="cl">Spend</div><div className="cvv">₹75K</div></div>
        <div className="crow hi"><div className="cl">SQLs</div><div className="cvv">12</div></div>
        <div className="crow hi"><div className="cl">Opportunities</div><div className="cvv">5</div></div>
        <div className="ctot"><div className="cl">Pipeline created</div><div className="cvv">₹50L</div></div>
      </div>
    </div>

    <div className="econ-close rv">
      <p className="big">Higher CPL. Less spend. <span className="red">5× the pipeline.</span></p>
      <p className="lead" style={{ "marginTop": "20px", "maxWidth": "660px", "marginLeft": "auto", "marginRight": "auto" }}>
        That&apos;s why optimising B2B campaigns purely around cost per lead can lead you in exactly the wrong direction.
      </p>
      <span className="illus">Illustrative model, not client data</span>
    </div>
  </div>
</section>


<section className="lever dark" id="work">
  <div className="wrap">
    <div className="lever-head" style={{ "alignItems": "end" }}>
      <div className="rv">
        <div className="eyebrow">Selected B2B Work</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>Different markets. Same objective<span className="dot">.</span></h2>
      </div>
      <div className="rv" style={{ "justifySelf": "end" }}>
        <a href="#" className="link-u">View All B2B Work
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>

    <div className="cases">
      <article className="case rv">
        <div className="ph shot"><div className="tag">Image</div><div className="desc">Search console growth, ranking page or the built site. Real screenshots.</div></div>
        <div className="cb">
          <div className="cn">Case 01 / Manufacturing</div>
          <div className="constraint"><div className="cl">The problem</div><div className="cx">Low commercial search visibility</div></div>
          <p className="note-ph">Draft: technical SEO, commercial pages, content, authority. Describe the order.</p>
          <div className="res"><div className="rv2"><span className="tbd">XX%</span></div><div className="rl">Organic growth</div></div>
          <div className="res" style={{ "border": "0", "paddingTop": "0" }}><div className="rv2"><span className="tbd">₹XX</span></div><div className="rl">Pipeline influenced</div></div>
          <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start", "color": "var(--red)", "border": "0", "padding": "0" }}>View Case Study →</a>
        </div>
      </article>

      <article className="case rv">
        <div className="ph shot"><div className="tag">Image</div><div className="desc">Landing page set or CRM dashboard view.</div></div>
        <div className="cb">
          <div className="cn">Case 02 / B2B Services</div>
          <div className="constraint"><div className="cl">The problem</div><div className="cx">Lead volume without lead quality</div></div>
          <p className="note-ph">Draft: paid search, landing pages, CRM. Describe the order.</p>
          <div className="res"><div className="rv2"><span className="tbd">XX%</span></div><div className="rl">Cost per SQL reduction</div></div>
          <div className="res" style={{ "border": "0", "paddingTop": "0" }}><div className="rv2"><span className="tbd">XX</span></div><div className="rl">Opportunities / quarter</div></div>
          <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start", "color": "var(--red)", "border": "0", "padding": "0" }}>View Case Study →</a>
        </div>
      </article>

      <article className="case rv">
        <div className="ph shot"><div className="tag">Image</div><div className="desc">Website rebuild before/after or enterprise brand asset.</div></div>
        <div className="cb">
          <div className="cn">Case 03 / Enterprise</div>
          <div className="constraint"><div className="cl">The problem</div><div className="cx">A website that explained instead of converting</div></div>
          <p className="note-ph">Draft: positioning, IA, proof architecture, CRO. Describe the order.</p>
          <div className="res"><div className="rv2"><span className="tbd">XX%</span></div><div className="rl">Enquiry rate lift</div></div>
          <div className="res" style={{ "border": "0", "paddingTop": "0" }}><div className="rv2"><span className="tbd">₹XX</span></div><div className="rl">Pipeline influenced</div></div>
          <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start", "color": "var(--red)", "border": "0", "padding": "0" }}>View Case Study →</a>
        </div>
      </article>
    </div>
  </div>
</section>


<section className="lever paper">
  <div className="wrap">
    <div className="lever-head">
      <div className="rv">
        <div className="eyebrow">How we work</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>Specialists around one revenue objective<span className="dot">.</span></h2>
      </div>
      <p className="lead rv">Specialists own their disciplines. The Growth Lead owns the commercial direction, and is accountable for pipeline rather than for channel metrics.</p>
    </div>

    <div className="pod rv">
      <div className="pod-top">Your Business</div>
      <div className="vlnl"></div>
      <div className="pod-lead">B2B Growth Lead</div>
      <div className="vlnl"></div>
      <div className="pod-bar"></div>
      <div className="vlnl"></div>
      <div className="pod-spokes">
        <div className="pspoke"><b>SEO</b><span>Organic demand</span></div>
        <div className="pspoke"><b>Paid</b><span>Intent capture</span></div>
        <div className="pspoke"><b>Content</b><span>Demand creation</span></div>
      </div>
      <div className="vlnl"></div>
      <div className="pod-bar"></div>
      <div className="vlnl"></div>
      <div className="pod-spokes" style={{ "gridTemplateColumns": "1fr 1fr", "maxWidth": "620px", "margin": "0 auto" }}>
        <div className="pspoke"><b>Web / CRO</b><span>Conversion</span></div>
        <div className="pspoke"><b>CRM / Data</b><span>Qualification</span></div>
      </div>
      <div className="vlnl"></div>
      <div className="pod-bot">Pipeline</div>
    </div>
  </div>
</section>


<section className="lever dark">
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "820px" }}>
      <div className="eyebrow">The first 90 days</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>Understand. Build. Activate<span className="dot">.</span></h2>
    </div>

    <div className="days">
      <div className="day rv">
        <div className="day-hd"><div className="dr">Days 1–30</div><div className="dt">Understand the revenue engine</div></div>
        <div className="day-bd">
          <ul><li>ICP and offers</li><li>Deal value and sales cycle</li><li>Search demand</li><li>Paid performance</li><li>Website</li><li>Content</li><li>CRM and attribution</li><li>Competitors</li></ul>
        </div>
        <div className="day-out"><div className="ol">Output</div><div className="ov">Revenue Opportunity Map</div></div>
      </div>

      <div className="day rv">
        <div className="day-hd"><div className="dr">Days 31–60</div><div className="dt">Build the foundation</div></div>
        <div className="day-bd">
          <ul><li>SEO architecture</li><li>Campaign structure</li><li>Landing pages</li><li>Tracking</li><li>Content priorities</li><li>Conversion fixes</li><li>CRM alignment</li></ul>
        </div>
        <div className="day-out"><div className="ol">Output</div><div className="ov">B2B Growth Operating Plan</div></div>
      </div>

      <div className="day rv">
        <div className="day-hd"><div className="dr">Days 61–90</div><div className="dt">Activate demand</div></div>
        <div className="day-bd">
          <ul><li>Launch campaigns</li><li>Publish commercial pages</li><li>Deploy content</li><li>Improve conversion</li><li>Build authority</li><li>Measure lead quality</li><li>Connect sales feedback</li></ul>
        </div>
        <div className="day-out"><div className="ol">Output</div><div className="ov">Pipeline Growth Roadmap</div></div>
      </div>
    </div>

    <p className="day-after rv">Month 4+ &nbsp;·&nbsp; <span className="red">Learn. Compound. Expand.</span></p>
  </div>
</section>


<section className="lever ink">
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "840px" }}>
      <div className="eyebrow">The feedback loop</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>Your sales team knows things your marketing dashboard doesn&apos;t<span className="dot">.</span></h2>
    </div>

    <div className="loopg" style={{ "gridTemplateColumns": "repeat(5,1fr)" }}>
      <div className="lnode rv"><div className="li">01</div><div className="lt">Marketing</div></div>
      <div className="lnode rv"><div className="li">02</div><div className="lt">Leads</div></div>
      <div className="lnode rv"><div className="li">03</div><div className="lt">Sales</div></div>
      <div className="lnode rv"><div className="li">04</div><div className="lt">Qualification data</div></div>
      <div className="lnode rv"><div className="li">05</div><div className="lt">Why we won / lost</div></div>
    </div>
    <div className="cloop-back rv">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M14 8A6 6 0 1 1 8 2M14 2v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      Straight back into marketing
    </div>

    <div className="loop-qs">
      <div className="rv">Which industries convert?</div>
      <div className="rv">Which job titles become opportunities?</div>
      <div className="rv">Which objections keep appearing?</div>
      <div className="rv">Which lead sources actually close?</div>
    </div>

    <p className="d3 rv" style={{ "marginTop": "clamp(36px,4.2vw,54px)", "maxWidth": "640px" }}>
      Sales feedback should <span className="red">change marketing</span>. On most accounts, it never reaches it.
    </p>
  </div>
</section>


<section className="lever paper">
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "840px" }}>
      <div className="eyebrow">B2B across markets</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>Buying behaviour changes across borders too<span className="dot">.</span></h2>
      <p className="lead" style={{ "marginTop": "24px", "maxWidth": "680px" }}>
        International B2B growth needs more than duplicating the same campaign in another country.
      </p>
    </div>

    <div className="mk-grid">
      <div className="mk-var rv"><h4>Search demand</h4><p>Query language, volume and the mix of branded versus category search shift market to market. The keyword set is not translatable.</p></div>
      <div className="mk-var rv"><h4>Cost per click</h4><p>Auction density and competitor spend change what a qualified click costs, and therefore which channel is viable.</p></div>
      <div className="mk-var rv"><h4>Buying cycles</h4><p>Procurement timelines, tender processes and budget calendars differ enough to change campaign pacing entirely.</p></div>
      <div className="mk-var rv"><h4>Decision structures</h4><p>Committee size, seniority of the first contact and the role of distributors or agents all vary by market.</p></div>
      <div className="mk-var rv"><h4>Trust signals</h4><p>Certifications, local presence, references and language expectations carry different weight in the Gulf than in the UK.</p></div>
      <div className="mk-var rv"><h4>Sales expectations</h4><p>Response speed, formality and the expected path from enquiry to meeting are not universal.</p></div>
    </div>

    <div className="mk-flags rv">
      <span>India</span><span>UAE</span><span>Qatar</span><span>United Kingdom</span><span className="tbd" style={{ "borderStyle": "dashed" }}>+ verified markets</span>
    </div>
  </div>
</section>


<section className="lever dark" id="insights">
  <div className="wrap">
    <div className="lever-head" style={{ "alignItems": "end" }}>
      <div className="rv">
        <div className="eyebrow">Dare B2B Intelligence</div>
        <h2 className="d2" style={{ "marginTop": "16px" }}>What we&apos;re learning about building B2B growth engines<span className="dot">.</span></h2>
      </div>
      <div className="rv" style={{ "justifySelf": "end" }}>
        <a href="#" className="link-u">Explore B2B Insights
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>

    <div className="icards" style={{ "gridTemplateColumns": "repeat(4,1fr)" }}>
      <article className="icard rv">
        <div className="k">SEO</div>
        <div className="ph" style={{ "minHeight": "110px", "borderRadius": "11px" }}><div className="tag">Image</div></div>
        <div className="t">Why B2B SEO should be measured against pipeline</div>
        <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start" }}>Read →</a>
      </article>
      <article className="icard rv">
        <div className="k">Paid</div>
        <div className="ph" style={{ "minHeight": "110px", "borderRadius": "11px" }}><div className="tag">Image</div></div>
        <div className="t">Why reducing CPL can make a B2B campaign worse</div>
        <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start" }}>Read →</a>
      </article>
      <article className="icard rv">
        <div className="k">Website</div>
        <div className="ph" style={{ "minHeight": "110px", "borderRadius": "11px" }}><div className="tag">Image</div></div>
        <div className="t">Why most B2B websites are built to explain, not convert</div>
        <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start" }}>Read →</a>
      </article>
      <article className="icard rv">
        <div className="k">Revenue</div>
        <div className="ph" style={{ "minHeight": "110px", "borderRadius": "11px" }}><div className="tag">Image</div></div>
        <div className="t">The metrics between lead and closed-won that teams ignore</div>
        <a href="#" className="link-u" style={{ "fontSize": "13.5px", "alignSelf": "flex-start" }}>Read →</a>
      </article>
    </div>
  </div>
</section>


<section className="lever paper">
  <div className="wrap">
    <div className="rv" style={{ "maxWidth": "800px" }}>
      <div className="eyebrow">Fit matters</div>
      <h2 className="d2" style={{ "marginTop": "18px" }}>We&apos;re not the right growth partner for every B2B company<span className="dot">.</span></h2>
    </div>

    <div className="fit-grid">
      <div className="fitcol yes rv">
        <h4>Strong fit</h4>
        <ul>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Proven product or service.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Defined ICP.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Meaningful deal value.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Existing sales capability.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Management committed to growth.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Willingness to improve the website or process when required.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Enough patience for channels like SEO to compound.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Willingness to share sales feedback.</li>
        </ul>
      </div>

      <div className="fitcol no rv">
        <h4>Probably not a fit</h4>
        <ul>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg></span>You only want a database of leads.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg></span>Your only KPI is the cheapest possible CPL.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg></span>There is no process for sales follow-up.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg></span>Product-market fit is still unclear.</li>
          <li><span className="ic"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg></span>You expect SEO to generate pipeline in 30 days.</li>
        </ul>
      </div>
    </div>
  </div>
</section>


<section className="final" id="diagnostic">
  <div className="wrap">
    <div className="eyebrow plain rv" style={{ "justifyContent": "center" }}>Dare B2B</div>
    <h2 className="rv">Your next customer may already be looking for you.</h2>
    <p className="rv">Let&apos;s find out where demand exists, where you&apos;re losing it, and what it would take to turn more of it into qualified pipeline.</p>
    <div className="hero-cta rv" style={{ "justifyContent": "center", "marginTop": "clamp(32px,3.8vw,48px)" }}>
      <a href="#" className="btn btn-white">Get a B2B Growth Diagnostic
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <a href="#work" className="btn" style={{ "border": "1px solid rgba(255,255,255,.45)", "color": "#fff" }}>See Our B2B Work
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
    <p className="fine rv">For established B2B companies ready to build a more predictable growth engine.</p>
  </div>
</section>




</div>;
}
