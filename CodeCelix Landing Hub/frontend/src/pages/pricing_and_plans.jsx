import React, { useState } from "react";
import { Check, Shield, Download, Package, ChevronDown } from "lucide-react";

function Pricing_and_plans() {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [expandedService, setExpandedService] = useState(null);

  const basic_plan = [
    {
      Price_Range: "PKR 35,000 – 40,000",
      Content:
        "Designed to deliver intelligent, hands-free assistance with a sleek and durable build.",
    },
  ];

  const premium_plan = [
    {
      Content:
        "Unlock advanced AI-powered features with our Premium Plan, tailored for enhanced usability and future readiness:",
      Heading_with_content: [
        {
          Heading: "20+ Language Translation",
          Content:
            "Real-time multilingual translation to support global communication.",
        },
        {
          Heading: "AI Updates",
          Content:
            "Continuous improvements through regular AI model enhancements for better accuracy and performance.",
        },
        {
          Heading: "Future Cloud Sync",
          Content:
            "Secure cloud integration to store preferences, settings, and future data features seamlessly.",
        },
      ],
    },
  ];

  const after_sales_services = [
    {
      icon: Shield,
      title: "Warranty",
      content:
        "Official product warranty covering manufacturing defects and hardware reliability.",
    },
    {
      icon: Download,
      title: "Software Updates",
      content:
        "Regular system and security updates to keep your smart glasses up-to-date with the latest features.",
    },
    {
      icon: Package,
      title: "Accessories",
      content:
        "Availability of compatible accessories including frames, chargers, and protective components.",
    },
  ];

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Pricing & Plans
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Choose the perfect plan for your smart glasses experience
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm p-1.5 rounded-2xl inline-flex shadow-xl border border-purple-500/20">
            <button
              onClick={() => setSelectedPlan("basic")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedPlan === "basic"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "text-purple-200 hover:text-white"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setSelectedPlan("premium")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                selectedPlan === "premium"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "text-purple-200 hover:text-white"
              }`}
            >
              Premium
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                ⭐
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Basic Plan Card */}
          <div
            className={`transform transition-all duration-500 ${
              selectedPlan === "basic"
                ? "scale-105 opacity-100"
                : "scale-95 opacity-50 md:opacity-100"
            }`}
          >
            <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Basic Plan
                </h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  {basic_plan[0].Price_Range}
                </div>
                <p className="text-purple-200 leading-relaxed">
                  {basic_plan[0].Content}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-500/20 rounded-full p-1">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Core AI Features</p>
                    <p className="text-purple-300 text-sm">
                      Essential voice assistance and smart controls
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-500/20 rounded-full p-1">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Premium Build</p>
                    <p className="text-purple-300 text-sm">
                      Sleek and durable construction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-500/20 rounded-full p-1">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Standard Support</p>
                    <p className="text-purple-300 text-sm">
                      Basic warranty and customer service
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg">
                Get Started
              </button>
            </div>
          </div>

          {/* Premium Plan Card */}
          <div
            className={`transform transition-all duration-500 ${
              selectedPlan === "premium"
                ? "scale-105 opacity-100"
                : "scale-95 opacity-50 md:opacity-100"
            }`}
          >
            <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400/50 hover:border-purple-300/80 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 h-full">
              {/* Recommended Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  ⭐ RECOMMENDED
                </div>
              </div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Premium Plan
                </h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 mb-4">
                  Enhanced Features
                </div>
                <p className="text-purple-100 leading-relaxed">
                  {premium_plan[0].Content}
                </p>
              </div>

              <div className="space-y-4">
                {premium_plan[0].Heading_with_content.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {feature.Heading}
                      </p>
                      <p className="text-purple-200 text-sm">
                        {feature.Content}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">All Basic Features</p>
                    <p className="text-purple-200 text-sm">
                      Everything from the Basic plan included
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>

        {/* After-Sales Services Section */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            After-Sales Services
          </h2>
          <p className="text-purple-200 text-center mb-12 max-w-2xl mx-auto">
            We're committed to providing exceptional support long after your
            purchase
          </p>

          <div className="space-y-4 max-w-3xl mx-auto">
            {after_sales_services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === index;

              return (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:border-purple-400/40"
                >
                  <button
                    onClick={() => toggleService(index)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          isExpanded
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50"
                            : "bg-purple-500/20 group-hover:bg-purple-500/30"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-colors duration-300 ${
                            isExpanded
                              ? "text-white"
                              : "text-purple-400 group-hover:text-purple-300"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-purple-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-purple-200 leading-relaxed">
                        {service.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-purple-300 mb-6">
            Have questions? Our team is here to help you choose the right plan.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing_and_plans;
