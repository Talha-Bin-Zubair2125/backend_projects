import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (e) =>
        e.forEach((x) => {
          if (x.isIntersecting) x.target.classList.add("visible");
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

export default function AboutPage() {
  useReveal();
  const timeline = [
    {
      year: "2018",
      title: "The Founding Vision",
      desc: "Three engineers left Silicon Valley to solve enterprise automation from first principles. NexaCore was born in a garage with one client and an audacious thesis.",
      badge: "Origin Story",
    },
    {
      year: "2019",
      title: "First AI Product Ships",
      desc: "Launched NexaBrain v1 — a workflow automation engine processing 10M events/day. Onboarded 12 enterprise clients in the first 6 months of launch.",
      badge: "Product Launch",
    },
    {
      year: "2021",
      title: "Series A: $24M Raised",
      desc: "Led by Andreessen Horowitz with participation from 8 strategic angels. Expanded to 3 continents and 80 team members. Revenue crossed $5M ARR.",
      badge: "Fundraising",
    },
    {
      year: "2022",
      title: "AI Platform v2.0 Released",
      desc: "Multi-modal intelligence platform combining NLP, computer vision, and predictive analytics in a single developer-friendly API surface.",
      badge: "Platform Milestone",
    },
    {
      year: "2024",
      title: "500+ Enterprises Served",
      desc: "Surpassed 500 enterprise customers. $50M ARR. Named to Forbes AI 50. Offices now open in London, Singapore, and Dubai.",
      badge: "Scale",
    },
  ];
  const team = [
    {
      name: "Aria Chen",
      role: "CEO & Co-Founder",
      emoji: "👩‍💻",
      bg: "linear-gradient(135deg,#0d2030,#060e18)",
      bio: "Former ML lead at OpenAI. Built 3 AI companies. Obsessed with systems that scale across industries.",
    },
    {
      name: "Marcus Webb",
      role: "CTO & Co-Founder",
      emoji: "👨‍🔬",
      bg: "linear-gradient(135deg,#1a0d22,#0e0815)",
      bio: "PhD Computer Science, Stanford. 12 patents in distributed systems and ML inference.",
    },
    {
      name: "Sofia Navarro",
      role: "Chief Product Officer",
      emoji: "👩‍🎨",
      bg: "linear-gradient(135deg,#0d2018,#080f0f)",
      bio: "Ex-Stripe and Figma. Transforms complex AI capabilities into delightful user experiences.",
    },
    {
      name: "James Okafor",
      role: "VP Engineering",
      emoji: "🧑‍💻",
      bg: "linear-gradient(135deg,#1e1a0d,#100e05)",
      bio: "Scaled engineering orgs from 10 to 300+ at Twilio and Cloudflare. Zero-downtime advocate.",
    },
  ];
  const values = [
    {
      n: "01",
      name: "Intelligence First",
      desc: "Every product decision starts with: how can AI make this 10x better than any human alternative?",
    },
    {
      n: "02",
      name: "Radical Transparency",
      desc: "We share failures as loudly as successes. Clients get real-time visibility into every project milestone.",
    },
    {
      n: "03",
      name: "Long-Term Thinking",
      desc: "We optimize for decade-long relationships, not quarterly revenue. Our incentives align completely with yours.",
    },
    {
      n: "04",
      name: "Security by Design",
      desc: "Privacy and security are foundational constraints baked into every architectural decision and line of code.",
    },
    {
      n: "05",
      name: "Relentless Iteration",
      desc: "We ship fast and improve faster. Weekly product updates driven entirely by usage analytics and customer feedback.",
    },
    {
      n: "06",
      name: "Human + Machine",
      desc: "Our AI amplifies human judgment rather than replacing it. The best outcomes emerge from this synthesis.",
    },
  ];
  return (
    <div>
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
          <div className="about-tag reveal">About NexaCore</div>
          <h1 className="about-headline reveal">
            We Build the
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,var(--cyan),var(--cyan2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligence Layer
            </span>
            <br />
            of Modern Business
          </h1>
          <p className="about-sub reveal">
            NexaCore is a team of researchers, engineers, and designers obsessed
            with turning artificial intelligence into genuine competitive
            advantage for our clients.
          </p>
        </div>
      </section>

      <section className="mv-section">
        <div className="reveal">
          <div className="section-label">// Our Purpose</div>
        </div>
        <div className="reveal">
          <h2 className="section-title">Mission &amp; Vision</h2>
        </div>
        <div className="mv-grid">
          <div className="mv-card reveal">
            <span className="mv-icon">🎯</span>
            <div className="mv-lbl">Mission</div>
            <h3 className="mv-title">Democratize AI-Powered Automation</h3>
            <p className="mv-text">
              We exist to make enterprise-grade AI automation accessible to
              every business — removing barriers of cost, complexity, and talent
              scarcity that have historically limited transformation.
            </p>
            <ul className="mv-list">
              <li>Reduce automation costs by 90% vs. traditional approaches</li>
              <li>Deploy production AI in days, not months</li>
              <li>Make every business process measurably intelligent</li>
            </ul>
          </div>
          <div className="mv-card gold reveal">
            <span className="mv-icon">🔭</span>
            <div className="mv-lbl">Vision</div>
            <h3 className="mv-title">A World Where AI Works For Everyone</h3>
            <p className="mv-text">
              A future where AI amplifies human workers rather than replacing
              them. Where small teams achieve the output of enterprises, and
              intelligent systems handle the repetitive so humans focus on the
              creative.
            </p>
            <ul className="mv-list">
              <li>100% of routine work automated by 2030</li>
              <li>AI that explains its decisions with full transparency</li>
              <li>Borderless access to digital transformation tools</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "80px 0",
        }}
      >
        <div style={{ padding: "0 80px", marginBottom: 48 }}
          className="timeline-header">
          <div className="section-label reveal">// Company History</div>
          <h2 className="section-title reveal">Our Journey</h2>
          <p className="section-sub reveal" style={{ marginBottom: 0 }}>
            Six years of relentless building, shipping, learning, and scaling.
          </p>
        </div>

        <div className="timeline-wrap">
          {/* Vertical line */}
          <div className="timeline-line" />

          {timeline.map((t, i) => (
            <div
              key={i}
              className="reveal timeline-item"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Dot on the line */}
              <div
                className="timeline-dot"
                style={{
                  background: i === timeline.length - 1 ? "var(--cyan)" : "var(--bg)",
                }}
              />

              {/* Year */}
              <div className="timeline-year">{t.year}</div>

              {/* Content */}
              <div className="timeline-content">
                <div className="timeline-title">{t.title}</div>
                <div className="timeline-desc">{t.desc}</div>
                <div className="timeline-badge">{t.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <div className="reveal">
          <div className="section-label">// The People</div>
        </div>
        <div className="reveal">
          <h2 className="section-title">Leadership Team</h2>
        </div>
        <div className="reveal">
          <p className="section-sub" style={{ marginBottom: 0 }}>
            World-class engineers, researchers, and operators united by a single
            obsession: making AI work in the real world.
          </p>
        </div>
        <div className="team-grid">
          {team.map((m, i) => (
            <div
              key={i}
              className="team-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="team-photo">
                <div className="team-photo-bg" style={{ background: m.bg }}>
                  {m.emoji}
                </div>
                <div className="team-overlay" />
              </div>
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-bio">{m.bio}</div>
                <div className="team-socials">
                  {["in", "tw", "gh"].map((s) => (
                    <div key={s} className="team-social">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="values-section">
        <div className="reveal">
          <div className="section-label">// How We Work</div>
        </div>
        <div className="reveal">
          <h2 className="section-title">Core Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div
              key={i}
              className="value-card reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="value-num">{v.n}</div>
              <div className="value-name">{v.name}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section reveal">
        <div className="section-label">// Join Us</div>
        <h2 className="cta-title">
          Work With a Team
          <br />
          That Ships Intelligence
        </h2>
        <p className="cta-sub">
          Whether you're hiring, partnering, or building — let's create
          something extraordinary together.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-primary">View Open Roles</button>
          <button className="btn-secondary">Partner With Us →</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-copy">
          © 2024 NEXACORE AI. All rights reserved.
        </div>
        <div className="footer-links">
          {["Privacy", "Terms", "Security", "Status"].map((l) => (
            <a key={l} href="#" className="footer-link">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
