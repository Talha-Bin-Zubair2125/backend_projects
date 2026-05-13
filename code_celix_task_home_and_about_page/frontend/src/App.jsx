import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const ringTarget = useRef({ x: -100, y: -100 });
  const animRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      ringTarget.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    let cur = { x: -100, y: -100 };
    const lerp = (a, b, t) => a + (b - a) * t;
    const anim = () => {
      cur.x = lerp(cur.x, ringTarget.current.x, 0.12);
      cur.y = lerp(cur.y, ringTarget.current.y, 0.12);
      setRing({ x: cur.x, y: cur.y });
      animRef.current = requestAnimationFrame(anim);
    };
    animRef.current = requestAnimationFrame(anim);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => navigate("home")}>
          NEXA<span>CORE</span>
        </div>
        <div className="nav-links">
          <span
            className={`nav-link ${page === "home" ? "active" : ""}`}
            onClick={() => navigate("home")}
          >
            Home
          </span>
          <span
            className={`nav-link ${page === "about" ? "active" : ""}`}
            onClick={() => navigate("about")}
          >
            About Us
          </span>
          <span className="nav-link">Solutions</span>
          <span className="nav-link">Case Studies</span>
          <span className="nav-link">Blog</span>
          <button className="nav-cta">Get Demo</button>
        </div>
      </nav>

      <div style={{ paddingTop: 70 }}>
        {page === "home" ? <HomePage onNav={navigate} /> : <AboutPage />}
      </div>
    </>
  );
}

export default App;
