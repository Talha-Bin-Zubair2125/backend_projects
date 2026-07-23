import { useState, useRef, useEffect } from "react";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 75 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.45 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d, i) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,255,${d.alpha})`;
        ctx.fill();
        dots.slice(i + 1, i + 6).forEach((d2) => {
          const dx = d.x - d2.x,
            dy = d.y - d2.y,
            dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(0,200,255,${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function TypingText({ words }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const cur = words[wordIdx];
    let t;
    if (!deleting && charIdx < cur.length)
      t = setTimeout(() => {
        setDisplay(cur.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 80);
    else if (!deleting && charIdx === cur.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => {
        setDisplay(cur.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 42);
    else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words]);
  return (
    <span className="line-accent">
      {display}
      <span className="tcursor" />
    </span>
  );
}

function Counter({ target, suffix = "", dur = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = null;
          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
            else setVal(target);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, dur]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

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

function OrbitRing({ radius, count, speed, dotColor }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: radius * 2,
            height: radius * 2,
            marginLeft: -radius,
            marginTop: -radius,
            borderRadius: "50%",
            animation: `spin ${speed}s linear ${-(i / count) * speed}s infinite`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: dotColor,
              boxShadow: `0 0 10px ${dotColor}`,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function HomePage({ onNav }) {
  useReveal();
  const [videoOpen, setVideoOpen] = useState(false);
  const services = [
    {
      icon: "🤖",
      name: "AI Automation",
      desc: "End-to-end workflow automation powered by LLMs and computer vision, reducing manual work by 90%.",
    },
    {
      icon: "📊",
      name: "Data Intelligence",
      desc: "Real-time analytics pipelines transforming raw data streams into decisive business intelligence.",
    },
    {
      icon: "🌐",
      name: "Digital Solutions",
      desc: "Full-stack web and mobile platforms built for global scale, sub-100ms performance, and elegance.",
    },
    {
      icon: "🔐",
      name: "Cybersecurity AI",
      desc: "Intelligent threat detection and automated incident response protecting your digital perimeter.",
    },
    {
      icon: "☁️",
      name: "Cloud Architecture",
      desc: "Resilient multi-cloud infrastructure with zero-downtime deployments and infinite horizontal scale.",
    },
    {
      icon: "🧠",
      name: "NLP & Conversational AI",
      desc: "Context-aware assistants and voice interfaces trained on your proprietary domain knowledge.",
    },
  ];
  const clients = [
    "NovaTech",
    "PulseAI",
    "Synk Corp",
    "HelixData",
    "Orion Labs",
    "QuantumX",
    "ArcBlue",
    "VectorIO",
    "NovaTech",
    "PulseAI",
    "Synk Corp",
    "HelixData",
    "Orion Labs",
    "QuantumX",
    "ArcBlue",
    "VectorIO",
  ];
  return (
    <div>
      <section className="hero">
        <ParticleCanvas />
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-badge">AI-Powered Solutions Platform v3.0</div>
          <h1 className="hero-headline">
            Build Smarter.
            <br />
            Scale Faster.
            <br />
            <TypingText
              words={[
                "Automate Everything.",
                "Dominate Markets.",
                "Transform Business.",
                "Power the Future.",
              ]}
            />
          </h1>
          <p className="hero-sub">
            We architect intelligent automation systems and digital solutions
            that compress decades of growth into years. Your competitive edge
            starts here.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onNav("about")}>
              Explore Platform
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="btn-secondary"
              onClick={() => setVideoOpen(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon
                  points="10,8 16,12 10,16"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div
            style={{
              width: 460,
              height: 460,
              position: "relative",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -60,
                borderRadius: "50%",
                border: "1px dashed rgba(0,200,255,.06)",
                animation: "spin 22s linear infinite reverse",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: "50%",
                border: "1px solid rgba(0,200,255,.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 30,
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg,transparent 0%,var(--cyan) 20%,transparent 40%,var(--cyan2) 60%,transparent 80%,var(--gold) 95%,transparent 100%)",
                animation: "spin 9s linear infinite",
                filter: "blur(1px)",
                opacity: 0.45,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 60,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(0,200,255,.13) 0%,rgba(0,200,255,.03) 50%,transparent 100%)",
                border: "1px solid rgba(0,200,255,.2)",
              }}
            />
            <OrbitRing
              radius={185}
              count={6}
              speed={11}
              dotColor="var(--cyan)"
            />
            <OrbitRing
              radius={135}
              count={4}
              speed={17}
              dotColor="var(--gold)"
            />
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {[
            { n: 500, s: "+", l: "Projects Delivered" },
            { n: 98, s: "%", l: "Client Retention" },
            { n: 12, s: "B+", l: "Data Points Processed" },
            { n: 47, s: "x", l: "Avg. ROI Multiplier" },
          ].map((x, i) => (
            <div
              key={i}
              className="stat-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="stat-num">
                <Counter target={x.n} suffix={x.s} />
              </div>
              <div className="stat-label">{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="reveal">
          <div className="section-label">// What We Build</div>
        </div>
        <div className="reveal">
          <h2 className="section-title" style={{ transitionDelay: ".1s" }}>
            Intelligence-First
            <br />
            Digital Solutions
          </h2>
        </div>
        <div className="reveal">
          <p className="section-sub" style={{ transitionDelay: ".2s" }}>
            Every platform we build is designed to learn, adapt, and outperform
            — from day one through decade one.
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={i}
              className="service-card reveal"
              style={{ transitionDelay: `${0.1 + i * 0.07}s` }}
            >
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
              <div className="service-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      <div className="clients-section">
        <div className="clients-label">
          Trusted by industry leaders worldwide
        </div>
        <div className="carousel-wrap">
          <div className="carousel-track">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="client-logo">
                <div className="client-dot" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="cta-section reveal">
        <div className="section-label">// Start Today</div>
        <h2 className="cta-title">
          Ready to Automate
          <br />
          Your Future?
        </h2>
        <p className="cta-sub">
          Join 500+ companies already using our platform to scale intelligently
          and outpace the competition.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-primary">Get Started Free</button>
          <button className="btn-secondary" onClick={() => onNav("about")}>
            Meet the Team →
          </button>
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

      {videoOpen && (
        <div className="modal-overlay" onClick={() => setVideoOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setVideoOpen(false)}>
              ✕
            </button>
            <div className="modal-inner">
              <div style={{ fontSize: 52, color: "var(--cyan)" }}>▶</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                  fontSize: 13,
                }}
              >
                Platform Demo Video
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(106,138,170,.45)",
                  textAlign: "center",
                  maxWidth: 320,
                }}
              >
                Connect your video source here to display the platform
                walkthrough
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
