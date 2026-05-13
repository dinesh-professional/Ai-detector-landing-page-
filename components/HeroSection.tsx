"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronRight, Zap, Eye } from "lucide-react";

const FLOATING_CARDS = [
  { icon: "⚠️", label: "Payment Requested", color: "#FF3B5C", delay: "0s" },
  { icon: "📧", label: "Free Email Domain", color: "#FF8C00", delay: "1.5s" },
  { icon: "💰", label: "Unrealistic Salary", color: "#FF3B5C", delay: "3s" },
];

const TERMINAL_LINES = [
  { text: "> Initializing AI threat scanner...", color: "#00D9FF", delay: 0 },
  { text: "> Analyzing recruiter profile...", color: "#9CA3AF", delay: 600 },
  { text: "> Scanning email domain: gmail.com [FREE DOMAIN]", color: "#FF8C00", delay: 1200 },
  { text: "> Detected: Payment request pattern", color: "#FF3B5C", delay: 1800 },
  { text: "> Salary claim exceeds industry benchmark by 340%", color: "#FF3B5C", delay: 2400 },
  { text: "> SCAM PROBABILITY: 92%", color: "#FF3B5C", delay: 3000 },
  { text: "> ⚠️  HIGH RISK — DO NOT PROCEED", color: "#FF3B5C", delay: 3600 },
];



function RadarAnimation() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[rgba(0,217,255,0.2)]"
          style={{
            inset: `${i * 16}px`,
          }}
        />
      ))}
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#00D9FF] glow-blue" />
      </div>
      {/* Sweep */}
      <div className="absolute inset-0 radar-sweep rounded-full overflow-hidden">
        {/* The trailing gradient cone */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "conic-gradient(from 270deg at 50% 50%, transparent 40%, rgba(0,217,255,0.1) 80%, rgba(0,217,255,0.6) 100%)" 
          }} 
        />

      </div>
      {/* Blip dots */}
      {[
        { top: "25%", left: "60%" },
        { top: "65%", left: "30%" },
        { top: "40%", left: "75%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#FF3B5C]"
          style={{
            top: pos.top,
            left: pos.left,
            boxShadow: "0 0 6px #FF3B5C",
            animation: `dangerPulse ${1.5 + i * 0.4}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay + 500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal w-full max-w-lg">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#FF3B5C]" />
        <div className="terminal-dot bg-[#FF8C00]" />
        <div className="terminal-dot bg-[#00FF88]" />
        <span className="ml-2 text-xs text-gray-500 font-mono">ai-scanner v2.4.1</span>
      </div>
      <div className="p-5 space-y-1.5 min-h-[240px]">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className="text-xs font-mono transition-opacity duration-300"
            style={{
              color: line.color,
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {line.text}
            {i === TERMINAL_LINES.length - 1 && visibleLines.includes(i) && (
              <span className="inline-block w-2 h-4 bg-[#FF3B5C] ml-1 align-middle animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 40%, #1a0533 0%, #050816 65%)" }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60 pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00D9FF] opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8B5CF6] blur-3xl pointer-events-none" style={{ opacity: 0.08 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="section-tag w-fit">
              <Shield className="w-3 h-3" />
              AI-Powered Threat Detection
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              <span className="text-white block">Detect Fake</span>
              <span className="gradient-text block">Internships</span>
              <span className="text-white block">Instantly.</span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Our AI scanner analyzes recruiter emails, job descriptions, and
              company profiles to expose scams before you send your resume — or
              your bank details.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#scanner" className="btn-primary text-base px-8 py-3.5">
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Analyze Internship
                </span>
              </a>
              <a href="#features" className="btn-outline text-base px-8 py-3.5 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                See How It Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { value: "94%", label: "Detection Rate" },
                { value: "50K+", label: "Scams Blocked" },
                { value: "< 3s", label: "Analysis Time" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-8"
          >
            {/* Radar */}
            <div className="glass-card rounded-2xl p-6 w-full max-w-xs mx-auto">
              <div className="text-center mb-4">
                <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-widest">
                  Live Threat Radar
                </span>
              </div>
              <RadarAnimation />
              <div className="mt-4 flex justify-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF3B5C] inline-block" />
                  <span className="text-gray-400">3 threats</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00D9FF] inline-block" />
                  <span className="text-gray-400">scanning</span>
                </span>
              </div>
            </div>

            {/* Terminal */}
            <TerminalCard />

            {/* Floating warning chips — desktop only */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              {FLOATING_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="absolute glass-card rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-mono"
                  style={{
                    top: `${10 + i * 30}%`,
                    right: i % 2 === 0 ? "-110px" : "auto",
                    left: i % 2 === 1 ? "-110px" : "auto",
                    border: `1px solid ${card.color}44`,
                    boxShadow: `0 0 15px ${card.color}22`,
                    animation: `float ${5 + i}s ease-in-out ${card.delay} infinite`,
                  }}
                >
                  <span>{card.icon}</span>
                  <span style={{ color: card.color }}>{card.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
