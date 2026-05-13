"use client";
import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";

const STATS = [
  { value: 50000, suffix: "+", label: "Fake Internships Detected", color: "#FF3B5C" },
  { value: 120000, suffix: "+", label: "Students Protected", color: "#00D9FF" },
  { value: 2800000, suffix: "+", label: "Scam Reports Analyzed", color: "#8B5CF6" },
  { value: 94, suffix: "%", label: "Detection Accuracy Rate", color: "#00FF88" },
];

function AnimatedCounter({ target, suffix, color, active }: { target: number; suffix: string; color: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  const fmt = count >= 1000000 ? `${(count / 1000000).toFixed(1)}M` : count >= 1000 ? `${(count / 1000).toFixed(0)}K` : `${count}`;

  return (
    <span className="text-5xl sm:text-6xl font-black tabular-nums" style={{ color, textShadow: `0 0 30px ${color}66` }}>
      {fmt}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setActive(e.isIntersecting); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit mb-6"><TrendingUp className="w-3 h-3" /> By The Numbers</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Real impact. Measurable protection. No fluff.</p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="glass-card rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="mb-3">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} color={stat.color} active={active} />
              </div>
              <div className="text-gray-400 text-sm font-medium leading-snug">{stat.label}</div>
              <div className="mt-4 h-0.5 w-12 mx-auto rounded-full transition-all duration-500 group-hover:w-20"
                style={{ background: stat.color, boxShadow: `0 0 10px ${stat.color}` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
