import React, { useState, useEffect } from "react";

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [subtitleText, setSubtitleText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Mic Captures Speech",
      description: "Advanced microphone technology captures your voice with crystal-clear precision, filtering background noise for optimal clarity.",
      icon: "🎤",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "AI Converts Speech to Text",
      description: "Our powerful AI engine processes your speech in real-time, converting it to accurate text using advanced natural language processing.",
      icon: "🤖",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      title: "Subtitles + Emojis Appear on AR Lens",
      description: "Text and contextual emojis are instantly displayed on your AR lens, creating an immersive and engaging experience.",
      icon: "👓",
      color: "from-pink-500 to-orange-500"
    }
  ];

  // Simulate subtitle typing effect
  const sampleText = "Hello! Welcome to the future of communication! 👋";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Subtitle preview animation
  useEffect(() => {
    let index = 0;
    setSubtitleText("");
    setShowEmoji(false);

    const typingInterval = setInterval(() => {
      if (index < sampleText.length) {
        setSubtitleText(sampleText.slice(0, index + 1));
        index++;
        
        // Show emoji when reaching the end
        if (index === sampleText.length - 1) {
          setTimeout(() => setShowEmoji(true), 300);
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [activeStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            How It Works
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Experience seamless communication in three simple steps
          </p>
        </div>

        {/* Animated Flow Steps */}
        <div className="relative mb-20">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1">
            <div className="relative h-full max-w-4xl mx-auto px-20">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full opacity-30"></div>
              
              {/* Animated flowing dots */}
              <div className="absolute top-1/2 left-0 w-full h-2 -mt-1">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 w-3 h-3 bg-white rounded-full animate-flow-1 shadow-lg shadow-blue-500/50"></div>
                  <div className="absolute top-0 w-3 h-3 bg-white rounded-full animate-flow-2 shadow-lg shadow-purple-500/50"></div>
                  <div className="absolute top-0 w-3 h-3 bg-white rounded-full animate-flow-3 shadow-lg shadow-pink-500/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Step Card */}
                <div
                  className={`w-full max-w-sm transition-all duration-700 ${
                    activeStep === index
                      ? "scale-110 opacity-100"
                      : "scale-95 opacity-60"
                  }`}
                >
                  <div className={`relative bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border-2 transition-all duration-500 ${
                    activeStep === index
                      ? "border-purple-400/80 shadow-2xl shadow-purple-500/50"
                      : "border-purple-500/20"
                  }`}>
                    {/* Step Number Badge */}
                    <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-500 ${
                      activeStep === index ? "scale-125 animate-pulse" : ""
                    }`}>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`text-7xl mb-6 mt-4 text-center transition-all duration-500 ${
                      activeStep === index ? "animate-bounce-slow" : ""
                    }`}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-purple-200 text-center leading-relaxed">
                      {step.description}
                    </p>

                    {/* Active Indicator */}
                    {activeStep === index && (
                      <div className="mt-6 flex justify-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow (between steps, hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-32 transform translate-x-full">
                    <div className={`transition-all duration-500 ${
                      activeStep === index ? "opacity-100 scale-110" : "opacity-40"
                    }`}>
                      <svg
                        className="w-16 h-16 text-purple-400 animate-arrow-move"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle Preview Section */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Live Preview
          </h2>
          <p className="text-purple-200 text-center mb-12 max-w-2xl mx-auto">
            See how subtitles appear in real-time on your AR lens
          </p>

          {/* AR Lens Simulation */}
          <div className="relative max-w-4xl mx-auto">
            {/* Glasses Frame */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-3xl p-12 border-4 border-purple-500/30 backdrop-blur-sm">
              {/* Lens Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
              
              {/* Subtitle Display Area */}
              <div className="relative min-h-32 flex items-center justify-center">
                <div className="text-center">
                  {/* Typing Text */}
                  <p className="text-2xl md:text-3xl font-semibold text-white mb-4 min-h-[2.5rem]">
                    {subtitleText}
                    <span className="animate-blink">|</span>
                  </p>

                  {/* Emoji Animation */}
                  {showEmoji && (
                    <div className="flex justify-center gap-2 animate-fade-in-up">
                      <span className="text-4xl animate-wave">👋</span>
                      <span className="text-4xl animate-bounce-emoji" style={{ animationDelay: "0.1s" }}>✨</span>
                      <span className="text-4xl animate-bounce-emoji" style={{ animationDelay: "0.2s" }}>🎉</span>
                    </div>
                  )}
                </div>
              </div>

              {/* AR Indicators */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <div className="text-xs text-green-400 font-semibold">ACTIVE</div>
              </div>
            </div>

            {/* Floating Features */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <div className="bg-purple-900/40 backdrop-blur-md rounded-2xl p-4 border border-purple-500/30 animate-float">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-xs text-purple-200 font-semibold">Real-time</p>
              </div>
            </div>

            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <div className="bg-pink-900/40 backdrop-blur-md rounded-2xl p-4 border border-pink-500/30 animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-3xl mb-2">🌐</div>
                <p className="text-xs text-pink-200 font-semibold">20+ Languages</p>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`transition-all duration-300 ${
                  activeStep === index
                    ? "w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500"
                    : "w-3 h-3 bg-purple-500/30 hover:bg-purple-500/50"
                } rounded-full`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
            Experience It Yourself
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes flow-1 {
          0%, 100% { left: 0%; }
          50% { left: 100%; }
        }

        @keyframes flow-2 {
          0%, 100% { left: 0%; }
          50% { left: 100%; }
        }

        @keyframes flow-3 {
          0%, 100% { left: 0%; }
          50% { left: 100%; }
        }

        .animate-flow-1 {
          animation: flow-1 3s ease-in-out infinite;
        }

        .animate-flow-2 {
          animation: flow-2 3s ease-in-out infinite 1s;
        }

        .animate-flow-3 {
          animation: flow-3 3s ease-in-out infinite 2s;
        }

        @keyframes arrow-move {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }

        .animate-arrow-move {
          animation: arrow-move 1.5s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }

        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          display: inline-block;
          transform-origin: 70% 70%;
        }

        @keyframes bounce-emoji {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-bounce-emoji {
          animation: bounce-emoji 1s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes float {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default HowItWorks;