"use client";
import { useEffect, type CSSProperties } from 'react';

function App() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* Reveal on scroll */
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll<HTMLElement>('.rv').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    /* Hero constellation: scattered → connected system */
    const constelTimer = setTimeout(() => {
      const constel = document.getElementById('constel');
      if (constel) constel.classList.add('go');
    }, 260);
    cleanups.push(() => clearTimeout(constelTimer));

    /* Count-up on the stat block */
    const timers = new Set<ReturnType<typeof setInterval>>();
    const nio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          nio.unobserve(e.target);
          const el = e.target as HTMLElement;
          const em = el.querySelector('em');
          const suffix = em ? em.textContent ?? '' : '';
          const target = parseInt(el.textContent ?? '', 10);
          if (Number.isNaN(target)) return;
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 38));
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) {
              cur = target;
              clearInterval(t);
              timers.delete(t);
            }
            el.innerHTML = cur + '<em>' + suffix + '</em>';
          }, 26);
          timers.add(t);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll<HTMLElement>('.stat .n').forEach((n) => nio.observe(n));
    cleanups.push(() => {
      nio.disconnect();
      timers.forEach((t) => clearInterval(t));
    });

    /* Header background solidifies past hero */
    const onScroll = () => {
      const h = document.querySelector('header');
      if (h) h.style.background = window.scrollY > 40 ? 'rgba(0,0,0,.94)' : 'rgba(0,0,0,.82)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const nodeStyle = (
    x: string,
    y: string,
    sx: string,
    sy: string,
    delay: string,
  ): CSSProperties =>
    ({
      ['--sx' as any]: sx,
      ['--sy' as any]: sy,
      ['--x' as any]: x,
      ['--y' as any]: y,
      transitionDelay: delay,
    } as CSSProperties);

  return (
    <>
      {/* ═══════════ ANNOUNCEMENT ═══════════ */}
      <div className="announce">
        <a href="#diagnostic">Accepting a limited number of growth partnerships for Q4 &nbsp;→</a>
      </div>

      {/* ═══════════ 02 · HERO ═══════════ */}
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow plain hero-eyebrow" style={{ justifyContent: 'center' }}>
            Dare Network &nbsp;/&nbsp; Growth Systems
          </div>

          {/* Disconnected capabilities → connected system */}
          <div className="constel" id="constel">
            <svg viewBox="0 0 900 300" preserveAspectRatio="none" aria-hidden="true">
              <line className="ln" x1="450" y1="112" x2="450" y2="30" style={{ animationDelay: '.75s' }} />
              <line className="ln" x1="330" y1="130" x2="105" y2="92" style={{ animationDelay: '.83s' }} />
              <line className="ln" x1="570" y1="130" x2="795" y2="92" style={{ animationDelay: '.91s' }} />
              <line className="ln" x1="330" y1="170" x2="105" y2="208" style={{ animationDelay: '.99s' }} />
              <line className="ln" x1="570" y1="170" x2="795" y2="208" style={{ animationDelay: '1.07s' }} />
              <line className="ln" x1="450" y1="188" x2="450" y2="270" style={{ animationDelay: '1.15s' }} />
            </svg>
            <div className="node" style={nodeStyle('50%', '8%', '47%', '47%', '.05s')}>
              Creative
            </div>
            <div className="node" style={nodeStyle('10%', '30%', '42%', '52%', '.13s')}>
              Paid
            </div>
            <div className="node" style={nodeStyle('90%', '30%', '57%', '45%', '.21s')}>
              SEO
            </div>
            <div className="node" style={nodeStyle('10%', '70%', '44%', '56%', '.29s')}>
              Web
            </div>
            <div className="node" style={nodeStyle('90%', '70%', '59%', '54%', '.37s')}>
              Retention
            </div>
            <div className="node" style={nodeStyle('50%', '92%', '53%', '43%', '.45s')}>
              CRO
            </div>
            <div className="core">
              DARE<span className="p">.</span>
            </div>
          </div>

          <h1 className="d1">
            We build growth systems<span className="dot">.</span>
          </h1>

          <p className="hero-sub">
            For D2C brands and B2B companies that have outgrown disconnected marketing. Dare brings strategy,
            acquisition, creative, search, conversion and technology together around one objective:{' '}
            <b>business growth.</b>
          </p>

          <div className="hero-cta">
            <a href="#commerce" className="btn btn-red">
              Explore Dare Commerce
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="/b2b" className="btn btn-ghost">
              Explore B2B
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="hero-markets">
            <span>India</span>
            <span>GCC</span>
            <span>UK</span>
            <span>Global</span>
          </div>
        </div>
      </section>

      {/* ═══════════ 03 · CREDIBILITY ═══════════ */}
      <section className="cred">
        <div className="wrap">
          <p className="cred-h rv">
            Trusted to solve growth problems across markets<span className="dot">.</span>
          </p>

          <div className="logos rv">
            <div className="cell">
              <span>Luker</span>
            </div>
            <div className="cell">
              <span>MYOP</span>
            </div>
            <div className="cell">
              <span>Vismay</span>
            </div>
            <div className="cell">
              <span>SSKL</span>
            </div>
            <div className="cell">
              <span>Arabian Aroma</span>
            </div>
            <div className="cell">
              <span>Hive</span>
            </div>
            <div className="cell">
              <span>YadaSutra</span>
            </div>
            <div className="cell">
              <span>Yalla Toys</span>
            </div>
            <div className="cell">
              <span>EVR</span>
            </div>
            <div className="cell">
              <span>Autosmart</span>
            </div>
            <div className="cell">
              <span>Natural Remedies</span>
            </div>
            <div className="cell">
              <span>Ewaan Tech</span>
            </div>
          </div>

          <div className="stats rv">
            <div className="stat">
              <div className="n">
                40<em>+</em>
              </div>
              <div className="l">Brands worked with</div>
            </div>
            <div className="stat">
              <div className="n">
                92<em>%</em>
              </div>
              <div className="l">Client retention</div>
            </div>
            <div className="stat">
              <div className="n">
                500<em>+</em>
              </div>
              <div className="l">Ads shipped</div>
            </div>
            <div className="stat">
              <div className="n">
                10<em>+</em>
              </div>
              <div className="l">Markets active</div>
            </div>
          </div>
        </div>
      </section>

      {/* ticker */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <div className="ticker-item">
            Performance <span className="g">✳</span> Creative <span className="g">✦</span> SEO{' '}
            <span className="g">❤</span> CRO <span className="g">✳</span> Retention <span className="g">✦</span>{' '}
            Pipeline <span className="g">❤</span>
          </div>
          <div className="ticker-item">
            Performance <span className="g">✳</span> Creative <span className="g">✦</span> SEO{' '}
            <span className="g">❤</span> CRO <span className="g">✳</span> Retention <span className="g">✦</span>{' '}
            Pipeline <span className="g">❤</span>
          </div>
        </div>
      </div>

      {/* ═══════════ 04 · THE PROBLEM ═══════════ */}
      <section className="problem on-paper">
        <div className="wrap">
          <div className="sect-head rv">
            <div className="eyebrow">The Problem</div>
            <h2 className="d2">
              Growth gets harder when marketing works in silos<span className="dot">.</span>
            </h2>
          </div>

          <div className="silo rv">
            <div className="silo-col">
              <div className="hd">Channel Set A</div>
              <div className="bd">
                <span className="silo-chip">Paid</span>
                <span className="silo-chip">Creative</span>
              </div>
              <div className="ft">Agency A</div>
            </div>
            <div className="silo-col">
              <div className="hd">Channel Set B</div>
              <div className="bd">
                <span className="silo-chip">SEO</span>
                <span className="silo-chip">Content</span>
              </div>
              <div className="ft">Agency B</div>
            </div>
            <div className="silo-col">
              <div className="hd">Channel Set C</div>
              <div className="bd">
                <span className="silo-chip">Web</span>
                <span className="silo-chip">CRM</span>
              </div>
              <div className="ft">Internal Team</div>
            </div>
          </div>

          <div className="silo-cap rv">
            <div>Different teams.</div>
            <div>Different targets.</div>
            <div>Different reports.</div>
            <div>No shared growth system.</div>
          </div>

          <p className="problem-close rv">
            The problem isn&apos;t always that one channel isn&apos;t working. It&apos;s that nobody is looking at how
            the entire growth engine works <span className="red">together</span>.
          </p>
        </div>
      </section>

      {/* ═══════════ 05 · DARE'S POV ═══════════ */}
      <section className="pov">
        <div className="wrap">
          <div className="pov-h rv">
            <div className="eyebrow plain" style={{ justifyContent: 'center', marginBottom: '22px' }}>
              Our Point of View
            </div>
            <h2 className="d2">
              We don&apos;t think in channels.
              <br />
              We think in <span className="red">constraints</span>.
            </h2>
            <p className="lead" style={{ maxWidth: '640px', margin: '28px auto 0' }}>
              Every business has a constraint holding back its next stage of growth. Our job is to find it. Then solve
              it.
            </p>
          </div>

          <div className="pov-list rv">
            <span>Acquisition</span>
            <span>Creative</span>
            <span>Organic visibility</span>
            <span>Conversion</span>
            <span>Retention</span>
            <span>Lead quality</span>
            <span>The website</span>
            <span>Measurement</span>
          </div>

          <div className="flow rv">
            <div className="flow-row">
              <div className="flow-node key">Business</div>
            </div>
            <div className="flow-arrow">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                <path d="M6 0v20M1 15l5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </div>
            <div className="flow-row">
              <div className="flow-node">Growth Target</div>
            </div>
            <div className="flow-arrow">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                <path d="M6 0v20M1 15l5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </div>
            <div className="flow-row">
              <div className="flow-node q">What is the constraint?</div>
            </div>
            <div className="flow-arrow">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                <path d="M6 0v20M1 15l5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </div>

            <div className="flow-tri">
              <div className="flow-branch">
                <div className="top">Acquisition</div>
                <div className="stack">
                  <span>Creative</span>
                  <span>Search</span>
                  <span>Media</span>
                </div>
              </div>
              <div className="flow-branch">
                <div className="top">Conversion</div>
                <div className="stack">
                  <span>Web</span>
                  <span>Experience</span>
                  <span>Testing</span>
                </div>
              </div>
              <div className="flow-branch">
                <div className="top">Retention</div>
                <div className="stack">
                  <span>CRM</span>
                  <span>Data</span>
                  <span>Lifecycle</span>
                </div>
              </div>
            </div>

            <div className="flow-loop">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M14 8A6 6 0 1 1 8 2M14 2v4h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Next constraint &nbsp;→&nbsp; Scale
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 06 · THE BIG SPLIT ═══════════ */}
      <section className="split" id="work">
        <div className="wrap">
          <div className="split-h rv">
            <div className="eyebrow">Two business models. Two growth systems.</div>
            <h2 className="d2" style={{ marginTop: '18px' }}>
              D2C isn&apos;t B2B.
              <br />
              So why would the growth strategy be the same?
            </h2>
          </div>

          <div className="split-grid">
            {/* COMMERCE */}
            <article className="prac rv" id="commerce">
              <div className="prac-top">
                <div className="prac-badge">For D2C / E-commerce</div>
                <div className="prac-name">
                  Dare <b>Commerce</b>
                </div>
                <div className="prac-claim">
                  Build profitable, scalable commerce growth<span className="dot">.</span>
                </div>
              </div>
              <div className="prac-body">
                <p className="prac-desc">
                  We connect acquisition, creative, organic growth, conversion and retention to find and remove the
                  constraints holding your brand back.
                </p>
                <div className="chain">
                  <b>Acquire</b>
                  <i>→</i>
                  <b>Convert</b>
                  <i>→</i>
                  <b>Retain</b>
                  <i>→</i>
                  <b>Scale</b>
                </div>
                <div className="caps">
                  <span>Performance Marketing</span>
                  <span>Creative</span>
                  <span>E-commerce SEO</span>
                  <span>CRO</span>
                  <span>Retention</span>
                  <span>Shopify</span>
                </div>
              </div>
              <div className="prac-foot">
                <a href="#" className="btn btn-red">
                  Explore Dare Commerce
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            {/* B2B */}
            <article className="prac dark rv" id="b2b">
              <div className="prac-top">
                <div className="prac-badge">For B2B Companies</div>
                <div className="prac-name">
                  Dare <b>B2B</b>
                </div>
                <div className="prac-claim">
                  Turn market demand into qualified pipeline<span className="dot">.</span>
                </div>
              </div>
              <div className="prac-body">
                <p className="prac-desc">
                  We connect search, paid acquisition, content, conversion and revenue operations to create a more
                  predictable B2B growth engine.
                </p>
                <div className="chain">
                  <b>Demand</b>
                  <i>→</i>
                  <b>Capture</b>
                  <i>→</i>
                  <b>Convert</b>
                  <i>→</i>
                  <b>Qualify</b>
                  <i>→</i>
                  <b>Pipeline</b>
                </div>
                <div className="caps">
                  <span>B2B SEO</span>
                  <span>Paid Demand</span>
                  <span>Content</span>
                  <span>Website &amp; CRO</span>
                  <span>CRM</span>
                  <span>Attribution</span>
                </div>
              </div>
              <div className="prac-foot">
                <a href="/b2b" className="btn btn-white">
                  Explore B2B
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════ 07 · COMMERCE PROOF ═══════════ */}
      <section className="proof dark">
        <div className="wrap">
          <div className="proof-head rv">
            <div>
              <div className="eyebrow">Dare Commerce / Selected Work</div>
              <h2 className="d2" style={{ marginTop: '18px' }}>
                Growth you can measure<span className="dot">.</span>
              </h2>
            </div>
            <a href="#" className="link-u">
              All Commerce work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="cases">
            <article className="case rv">
              <div className="ph shot">
                <div className="tag">Image</div>
                <div className="desc">Case hero — product/creative still or store screen. 16:10, dark-friendly.</div>
              </div>
              <div className="cbody">
                <div className="sector">Mother &amp; Baby</div>
                <div className="ct">Scaling monthly revenue through structured creative testing</div>
                <div className="metrics">
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">₹XXL → ₹XXL</span>
                    </div>
                    <div className="ml">Monthly revenue</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX%</span>
                    </div>
                    <div className="ml">Growth</div>
                  </div>
                </div>
                <div className="svcs">Meta · Google · Creative · CRO</div>
                <a href="#" className="go">
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article className="case rv">
              <div className="ph shot">
                <div className="tag">Image</div>
                <div className="desc">Case hero — apparel campaign creative or PDP screen.</div>
              </div>
              <div className="cbody">
                <div className="sector">Apparel</div>
                <div className="ct">Rebuilding acquisition around repeat-purchase economics</div>
                <div className="metrics">
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">₹XXL → ₹XXL</span>
                    </div>
                    <div className="ml">Monthly revenue</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">X.Xx</span>
                    </div>
                    <div className="ml">Blended ROAS</div>
                  </div>
                </div>
                <div className="svcs">Performance · Creative · Retention</div>
                <a href="#" className="go">
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article className="case rv">
              <div className="ph shot">
                <div className="tag">Image</div>
                <div className="desc">Case hero — GCC market creative, ideally Arabic variant.</div>
              </div>
              <div className="cbody">
                <div className="sector">GCC Commerce</div>
                <div className="ct">Entering the Gulf with region-native creative and channels</div>
                <div className="metrics">
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">X.Xx</span>
                    </div>
                    <div className="ml">Revenue growth</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX%</span>
                    </div>
                    <div className="ml">CAC improvement</div>
                  </div>
                </div>
                <div className="svcs">Meta · Snapchat · Creative · CRO</div>
                <a href="#" className="go">
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════ 08 · B2B PROOF ═══════════ */}
      <section className="proof light">
        <div className="wrap">
          <div className="proof-head rv">
            <div>
              <div className="eyebrow">Dare B2B / Selected Work</div>
              <h2 className="d2" style={{ marginTop: '18px' }}>
                Visibility is useful. Pipeline is better<span className="dot">.</span>
              </h2>
            </div>
            <a href="#" className="link-u">
              All B2B work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="cases">
            <article className="case rv">
              <div className="ph shot">
                <div className="tag">Image</div>
                <div className="desc">Case hero — site redesign or dashboard view.</div>
              </div>
              <div className="cbody">
                <div className="sector">Manufacturing</div>
                <div className="ct">Rebuilding organic search around commercial intent</div>
                <div className="metrics">
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX%</span>
                    </div>
                    <div className="ml">Organic growth</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX</span>
                    </div>
                    <div className="ml">Qualified opportunities</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">₹XX</span>
                    </div>
                    <div className="ml">Pipeline influenced</div>
                  </div>
                </div>
                <div className="svcs">SEO · Content · Website</div>
                <a href="#" className="go">
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article className="case rv">
              <div className="ph shot">
                <div className="tag">Image</div>
                <div className="desc">Case hero — SaaS product UI or campaign asset.</div>
              </div>
              <div className="cbody">
                <div className="sector">SaaS</div>
                <div className="ct">Shifting paid spend from lead volume to lead quality</div>
                <div className="metrics">
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX%</span>
                    </div>
                    <div className="ml">Cost per SQL reduction</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">X.Xx</span>
                    </div>
                    <div className="ml">Demo-to-opportunity rate</div>
                  </div>
                </div>
                <div className="svcs">Paid Demand · CRO · Attribution</div>
                <a href="#" className="go">
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article className="case rv">
              <div className="ph shot">
                <div className="tag">Image</div>
                <div className="desc">Case hero — services/consulting brand asset.</div>
              </div>
              <div className="cbody">
                <div className="sector">Professional Services</div>
                <div className="ct">Making the website the strongest part of the funnel</div>
                <div className="metrics">
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX%</span>
                    </div>
                    <div className="ml">Enquiry rate lift</div>
                  </div>
                  <div className="metric">
                    <div className="mv">
                      <span className="tbd">XX</span>
                    </div>
                    <div className="ml">Qualified enquiries / month</div>
                  </div>
                </div>
                <div className="svcs">Website · CRO · Content</div>
                <a href="#" className="go">
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════ 09 · ONE NETWORK / OPERATING MODEL ═══════════ */}
      <section className="model">
        <div className="wrap">
          <div className="model-grid">
            <div className="org rv">
              <div className="org-top">Growth Strategy</div>
              <div className="vline"></div>
              <div className="org-bar"></div>
              <div className="vline"></div>
              <div className="org-spokes">
                <div>Paid</div>
                <div>Creative</div>
                <div>SEO</div>
                <div>Web</div>
                <div>CRM</div>
              </div>
              <div className="vline"></div>
              <div className="org-bar"></div>
              <div className="vline"></div>
              <div className="org-data">Shared Data Layer</div>
              <div className="vline"></div>
              <div className="org-bot">Business Growth</div>
            </div>

            <div>
              <div className="eyebrow rv">How the work runs</div>
              <h2 className="d2 rv" style={{ marginTop: '18px' }}>
                One network<span className="dot">.</span>
                <br />
                Specialist depth<span className="dot">.</span>
              </h2>
              <p className="lead rv" style={{ marginTop: '24px', maxWidth: '520px' }}>
                Dare brings specialist teams together around the problem that needs solving, rather than forcing every
                client through the same service package.
              </p>

              <div className="model-pts">
                <div className="model-pt rv">
                  <div className="k">01</div>
                  <div>
                    <h4>One strategic lead. Not five account managers.</h4>
                    <p>
                      A single person owns the commercial direction and is accountable for the growth target, whatever
                      mix of specialists the work requires.
                    </p>
                  </div>
                </div>
                <div className="model-pt rv">
                  <div className="k">02</div>
                  <div>
                    <h4>Specialist pods, assembled to the constraint.</h4>
                    <p>
                      Teams are staffed against the problem in front of us. When the constraint moves, the team
                      composition moves with it.
                    </p>
                  </div>
                </div>
                <div className="model-pt rv">
                  <div className="k">03</div>
                  <div>
                    <h4>One data layer. One report.</h4>
                    <p>
                      Every channel reports into the same commercial model, so performance is read against the business
                      rather than against itself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 10 · BUYECOMADS.AI ═══════════ */}
      <section className="beca">
        <div className="wrap">
          <div className="beca-grid">
            <div>
              <div className="eyebrow rv">Built inside the Dare ecosystem</div>
              <h2 className="d2 rv" style={{ marginTop: '18px' }}>
                Creative volume without creative chaos<span className="dot">.</span>
              </h2>
              <p className="lead rv" style={{ marginTop: '24px', maxWidth: '520px' }}>
                Performance teams need more creative than traditional production models can efficiently deliver.
                That&apos;s why we built{' '}
                <b style={{ color: 'var(--red)', fontWeight: 600 }}>BuyEcomAds.ai</b> — our performance creative company
                built around faster ideation, production and iteration.
              </p>
              <div className="rv" style={{ marginTop: '32px' }}>
                <a href="#" className="btn btn-red">
                  Explore BuyEcomAds.ai
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 11L11 3M5 3h6v6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <p className="beca-note rv">An independent company within the Dare ecosystem.</p>
            </div>

            <div className="loop rv">
              <div className="loop-item">
                <div className="idx">1</div>
                <div className="lbl">Performance data</div>
              </div>
              <div className="loop-sep"></div>
              <div className="loop-item">
                <div className="idx">2</div>
                <div className="lbl">Insights</div>
              </div>
              <div className="loop-sep"></div>
              <div className="loop-item">
                <div className="idx">3</div>
                <div className="lbl">New angles</div>
              </div>
              <div className="loop-sep"></div>
              <div className="loop-item hot">
                <div className="idx">4</div>
                <div className="lbl">BuyEcomAds.ai</div>
              </div>
              <div className="loop-sep"></div>
              <div className="loop-item">
                <div className="idx">5</div>
                <div className="lbl">Creatives</div>
              </div>
              <div className="loop-sep"></div>
              <div className="loop-item">
                <div className="idx">6</div>
                <div className="lbl">Test</div>
              </div>
              <div className="loop-sep"></div>
              <div className="loop-item">
                <div className="idx">7</div>
                <div className="lbl">Learn</div>
              </div>
              <div className="loop-back">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M14 8A6 6 0 1 1 8 2M14 2v4h-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Back into performance data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 11 · OPERATING PRINCIPLES ═══════════ */}
      <section className="princ">
        <div className="wrap">
          <div className="sect-head rv" style={{ marginBottom: 'clamp(40px,4.6vw,66px)' }}>
            <div className="eyebrow">How we think</div>
            <h2 className="d2" style={{ marginTop: '18px' }}>
              The principles behind the work<span className="dot">.</span>
            </h2>
          </div>

          <div className="p-row rv">
            <div className="num">01</div>
            <h3>Growth is a system.</h3>
            <p>Channels don&apos;t grow companies independently. The compounding happens in how they connect.</p>
          </div>
          <div className="p-row rv">
            <div className="num">02</div>
            <h3>Revenue is the scoreboard.</h3>
            <p>
              Clicks, traffic, leads and ROAS matter only in the context of the business they&apos;re supposed to be
              growing.
            </p>
          </div>
          <div className="p-row rv">
            <div className="num">03</div>
            <h3>Find the constraint.</h3>
            <p>The biggest opportunity isn&apos;t always where the biggest budget sits. Usually it isn&apos;t.</p>
          </div>
          <div className="p-row rv">
            <div className="num">04</div>
            <h3>Specialists need orchestration.</h3>
            <p>Deep expertise matters. So does having one commercial direction that all of it answers to.</p>
          </div>
          <div className="p-row rv">
            <div className="num">05</div>
            <h3>Learning compounds.</h3>
            <p>Test → Learn → Systemise → Scale. The advantage is in the loop, not in any single campaign.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ 12 · MARKETS ═══════════ */}
      <section className="mkt">
        <div className="wrap">
          <div className="sect-head rv" style={{ maxWidth: '760px' }}>
            <div className="eyebrow">Built across markets</div>
            <h2 className="d2" style={{ marginTop: '18px' }}>
              Growth doesn&apos;t copy-paste across borders<span className="dot">.</span>
            </h2>
            <p className="lead" style={{ marginTop: '24px' }}>
              Consumer behaviour, media economics, search behaviour, pricing and buying cycles change across markets.
              The strategy should too.
            </p>
          </div>

          <div className="mkt-grid rv">
            <div className="mkt-cell">
              <div className="flagbox"></div>
              <div className="mn">India</div>
              <div className="md">Meta-led acquisition, Tier 1–2 expansion, COD economics.</div>
            </div>
            <div className="mkt-cell">
              <div className="flagbox"></div>
              <div className="mn">UAE</div>
              <div className="md">TikTok and Meta, premium positioning, bilingual creative.</div>
            </div>
            <div className="mkt-cell">
              <div className="flagbox"></div>
              <div className="mn">Saudi</div>
              <div className="md">Snapchat-first reach, Arabic creative, local logistics.</div>
            </div>
            <div className="mkt-cell">
              <div className="flagbox"></div>
              <div className="mn">Qatar</div>
              <div className="md">Compact high-value market, precision over scale.</div>
            </div>
            <div className="mkt-cell">
              <div className="flagbox"></div>
              <div className="mn">United Kingdom</div>
              <div className="md">Mature search landscape, higher CPMs, brand-led buying.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 13 · DARE INTELLIGENCE ═══════════ */}
      <section className="intel" id="intelligence">
        <div className="wrap">
          <div className="proof-head rv" style={{ marginBottom: 0 }}>
            <div>
              <div className="eyebrow">Dare Intelligence</div>
              <h2 className="d2" style={{ marginTop: '18px' }}>
                What we&apos;re learning while doing the work<span className="dot">.</span>
              </h2>
            </div>
          </div>

          <div className="intel-grid">
            <article className="intel-card rv">
              <div className="strm">Commerce</div>
              <div className="ph" style={{ minHeight: '150px', borderRadius: '12px' }}>
                <div className="tag">Image</div>
                <div className="desc">Featured insight visual, 16:9.</div>
              </div>
              <div className="ttl">Why your Meta account may not be your scaling problem</div>
              <a href="#" className="link-u" style={{ alignSelf: 'flex-start', fontSize: '13.5px' }}>
                Read
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h11M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <div className="meta">Explore Commerce Insights →</div>
            </article>

            <article className="intel-card rv">
              <div className="strm">B2B</div>
              <div className="ph" style={{ minHeight: '150px', borderRadius: '12px' }}>
                <div className="tag">Image</div>
                <div className="desc">Featured insight visual, 16:9.</div>
              </div>
              <div className="ttl">Why B2B SEO should be measured against pipeline</div>
              <a href="#" className="link-u" style={{ alignSelf: 'flex-start', fontSize: '13.5px' }}>
                Read
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h11M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <div className="meta">Explore B2B Insights →</div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════ 14 · PEOPLE ═══════════ */}
      <section className="people" id="people">
        <div className="wrap">
          <div className="people-grid">
            <div className="ph rv">
              <div className="tag">Photography</div>
              <div className="desc">
                Real team photograph, shot on location in the Bengaluru office. No stock. Portrait or 4:5 crop.
              </div>
            </div>
            <div>
              <div className="eyebrow rv">The people</div>
              <h2 className="d2 rv" style={{ marginTop: '18px' }}>
                Built by operators<span className="dot">.</span>
              </h2>
              <p className="d4 rv" style={{ marginTop: '22px', color: 'rgba(255,255,255,.86)', maxWidth: '540px' }}>
                Strategy gets better when the people making it understand execution.
              </p>
              <p className="lead rv" style={{ marginTop: '24px', maxWidth: '520px' }}>
                Dare Network is a team of growth strategists, media buyers, SEO specialists, designers, developers,
                content strategists and operators working across India and international markets.
              </p>
              <div className="rv" style={{ marginTop: '34px' }}>
                <a href="#" className="btn btn-ghost">
                  Meet Dare
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 15 · QUALIFICATION ═══════════ */}
      <section className="qual">
        <div className="wrap">
          <div className="qual-grid">
            <div>
              <div className="eyebrow rv">Fit</div>
              <h2 className="d2 rv" style={{ marginTop: '18px' }}>
                We may not be the right growth partner for everyone<span className="dot">.</span>
              </h2>
            </div>

            <div>
              <p className="lead rv" style={{ marginBottom: '26px' }}>
                Dare tends to work best with businesses that:
              </p>
              <div className="qual-list">
                <div className="qual-item rv">
                  <div className="tick">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.2l2.6 2.6L10 3.4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Have already proven there is demand.</span>
                </div>
                <div className="qual-item rv">
                  <div className="tick">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.2l2.6 2.6L10 3.4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Have ambitious but commercially grounded growth targets.</span>
                </div>
                <div className="qual-item rv">
                  <div className="tick">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.2l2.6 2.6L10 3.4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Are willing to fix problems beyond just advertising.</span>
                </div>
                <div className="qual-item rv">
                  <div className="tick">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.2l2.6 2.6L10 3.4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Value strategy as much as execution.</span>
                </div>
                <div className="qual-item rv">
                  <div className="tick">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.2l2.6 2.6L10 3.4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Want a partner that will challenge assumptions.</span>
                </div>
              </div>
              <p className="qual-out rv">
                If you&apos;re looking only for the cheapest execution partner, we&apos;re probably not the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 16 · FINAL CTA ═══════════ */}
      <section className="final" id="diagnostic">
        <div className="wrap">
          <div className="eyebrow plain rv" style={{ justifyContent: 'center', color: 'rgba(255,255,255,.85)' }}>
            The next stage of growth
          </div>
          <h2 className="rv">What&apos;s holding yours back?</h2>
          <p className="rv">
            Tell us where the business is today and where you&apos;re trying to take it. We&apos;ll help identify where
            the real growth opportunity may be.
          </p>

          <div className="routes">
            <a href="#" className="route rv">
              <div className="rl">I run a D2C brand</div>
              <div className="rt">Get a D2C Growth Diagnostic</div>
              <span className="rg">
                Start
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h11M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a href="#" className="route rv">
              <div className="rl">I run a B2B company</div>
              <div className="rt">Get a B2B Growth Diagnostic</div>
              <span className="rg">
                Start
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h11M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 17 · FOOTER ═══════════ */}
      
    </>
  );
}

export default App;