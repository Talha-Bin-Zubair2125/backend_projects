import React, { useState, useEffect } from "react";

function Partnerships() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const partnerships = [
    {
      title: "Schools & Universities",
      icon: "🎓",
      description:
        "Partnering with educational institutions to support inclusive learning, language accessibility, and assistive technology adoption for students and educators.",
      benefits: [
        "Inclusive Learning Support",
        "Language Accessibility",
        "Assistive Technology Integration",
        "Student & Educator Empowerment",
      ],
    },
    {
      title: "NGOs & Healthcare",
      icon: "🏥",
      description:
        "Working with non-governmental organizations and healthcare institutions to enhance communication support, rehabilitation services, and accessibility solutions for diverse communities.",
      benefits: [
        "Enhanced Communication",
        "Rehabilitation Services",
        "Accessibility Solutions",
        "Community Support",
      ],
    },
    {
      title: "Corporate CSR Programs",
      icon: "🤝",
      description:
        "Aligning with corporate social responsibility (CSR) initiatives to deploy smart technology solutions that promote inclusion, social welfare, and sustainable development.",
      benefits: [
        "Social Impact Initiatives",
        "Sustainable Development",
        "Technology for Good",
        "Inclusive Solutions",
      ],
    },
  ];

  // Partner logos
  const partnerLogos = [
    { name: "University of Technology", logo: "🎓" },
    { name: "Global Health Initiative", logo: "🏥" },
    { name: "Tech for Good Foundation", logo: "💡" },
    { name: "Education Access Alliance", logo: "📚" },
    { name: "Innovation Partners", logo: "🚀" },
    { name: "Healthcare Network", logo: "⚕️" },
    { name: "Social Impact Collective", logo: "🌍" },
    { name: "Digital Inclusion Fund", logo: "💻" },
  ];

  // Auto-scroll logos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % partnerLogos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [partnerLogos.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Strategic Partnerships
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Collaborating with leading institutions to create meaningful impact
            through innovative technology solutions
          </p>
        </div>

        {/* Partnership Cards with Flip Animation */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {partnerships.map((partnership, index) => (
            <div
              key={index}
              className="h-96 perspective-1000"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  flippedCard === index ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="h-full bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {partnership.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {partnership.title}
                    </h3>
                    <p className="text-purple-200 leading-relaxed">
                      {partnership.description}
                    </p>
                    <div className="mt-6 text-purple-400 text-sm font-semibold flex items-center gap-2">
                      <span>Hover to see benefits</span>
                      <svg
                        className="w-4 h-4 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="h-full bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      Key Benefits
                    </h3>
                    <div className="space-y-3">
                      {partnership.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="text-purple-100 font-medium">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Carousel */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Our Partners
          </h2>
          <p className="text-purple-200 text-center mb-12 max-w-2xl mx-auto">
            Trusted by leading organizations worldwide
          </p>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-8 h-32">
              {/* Create infinite scrolling effect -- used spread operator */}
              <div className="flex gap-8 animate-scroll">
                {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-40 h-24 bg-slate-800/50 rounded-2xl border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 flex items-center justify-center group hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                        {partner.logo}
                      </div>
                      <p className="text-xs text-purple-300 font-medium px-2">
                        {partner.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 via-purple-900/50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 via-purple-900/50 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl p-12 border-2 border-purple-400/50">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interested in Partnering?
            </h2>
            <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
              Join us in creating accessible technology solutions that make a
              real difference in people's lives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
                Become a Partner
              </button>
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800/70 border-2 border-purple-500/50 hover:border-purple-400/80 text-white font-semibold rounded-xl transition-all duration-300">
                Download Partnership Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default Partnerships;
