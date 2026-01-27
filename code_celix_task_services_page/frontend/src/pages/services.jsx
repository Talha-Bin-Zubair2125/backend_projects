import React, { useEffect, useState, useRef } from "react";
import "../style/services.css";

// Helper component for the typing effect
const Typewriter = ({ text, delay = 40, start = false }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (start && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, start]);

  return <span>{currentText}</span>;
};

const servicesData = [
  {
    id: 1,
    title: "Web Development",
    description: "Building Responsive, Modern Websites With Cutting-Edge Tech.",
    icon: "🌐",
    stat: 95,
    features: ["Seo Optimized", "Mobile First Design", "Pwa Ready"]
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Creating Dynamic React-Based UI Systems With Exceptional UX.",
    icon: "🎨",
    stat: 92,
    features: ["React And Next.js", "Framer Motion", "Tailwind Styling"]
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Developing Secure Apis And Robust Server Architectures.",
    icon: "⚙️",
    stat: 88,
    features: ["Node.js And Go", "Postgresql Storage", "Cloud Scaling"]
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Crafting Clean, Intuitive, And User-Centered Designs.",
    icon: "🧩",
    stat: 85,
    features: ["Figma Prototyping", "User Research", "Visual Identity"]
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" ref={sectionRef}>
      <div className="services-header">
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">
          <Typewriter 
            text="Transforming Ideas Into Digital Experiences" 
            start={isVisible} 
            delay={50} 
          />
        </p>
      </div>

      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className={`card-container ${isVisible ? "reveal" : ""}`}>
            <div className="service-card-inner">
              
              {/* FRONT SIDE */}
              <div className="card-front">
                <span className="icon-main">{service.icon}</span>
                <h3 className="service-card-title">{service.title}</h3>
                <div className="mini-divider"></div>
                
                <div className="description-container">
                   <p className="card-desc-text">
                    <Typewriter text={service.description} start={isVisible} delay={30} />
                  </p>
                </div>

                <span className="flip-hint">Details And Stats →</span>
              </div>

              {/* BACK SIDE */}
              <div className="card-back">
                <h4 className="features-heading">Key Features</h4>
                <ul className="features-list">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                
                <div className="stat-row">
                  <div className="donut-wrapper" style={{ "--target": isVisible ? service.stat : 0 }}>
                    <svg viewBox="0 0 36 36" className="donut-svg">
                      <circle className="donut-ring" cx="18" cy="18" r="15.915"></circle>
                      <circle className="donut-segment" cx="18" cy="18" r="15.915"></circle>
                    </svg>
                    <span className="donut-text">{service.stat}%</span>
                  </div>
                  <span className="stat-label">Success Rate</span>
                </div>

                <button className="request-btn" onClick={() => alert(`Request Sent For ${service.title}`)}>
                  Request Service
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}