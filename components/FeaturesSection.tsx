"use client";
import { useEffect, useRef, useState } from "react";
import { Brain, Mail, BadgeCheck, Bell, Star, Shield, ArrowRight, X, CheckCircle, AlertTriangle, Zap } from "lucide-react";

// ── Per-feature modal content ────────────────────────────────────────────────
const FEATURE_DETAILS = {
  "AI Scam Detection": {
    howItWorks: "Our rule-based AI engine processes your input through 12 weighted detection patterns in under 3 seconds. Each pattern targets a distinct scam behaviour observed across 50,000+ real-world fake internship reports.",
    patterns: [
      { label: "Upfront payment requests", weight: "+30 pts", severity: "critical" },
      { label: "Registration / security deposit fee", weight: "+30 pts", severity: "critical" },
      { label: "Guaranteed income / easy money language", weight: "+25 pts", severity: "critical" },
      { label: "Unrealistic salary claims", weight: "+25 pts", severity: "high" },
      { label: "Free email domain (gmail, yahoo, etc.)", weight: "+20 pts", severity: "high" },
      { label: "WhatsApp-only contact method", weight: "+20 pts", severity: "high" },
      { label: "No skills / experience required", weight: "+15 pts", severity: "medium" },
      { label: "No interview required", weight: "+15 pts", severity: "medium" },
      { label: "Excessive urgency / pressure tactics", weight: "+10 pts", severity: "medium" },
    ],
    scoring: "Scores from 0–100. Below 20 = Safe. 20–44 = Suspicious. 45–69 = Likely Scam. 70+ = High Risk Scam.",
    future: "Future versions will integrate NLP models and a live scam database updated daily by our community.",
  },
  "Email Analysis": {
    howItWorks: "The engine checks every email address embedded in your pasted text. It validates the sender domain, cross-references it with known legitimate company domains, and flags patterns common in phishing campaigns.",
    patterns: [
      { label: "Free email domain used as official contact", weight: "High Risk", severity: "high" },
      { label: "Domain spoofing (e.g. amazon-jobs@gmail.com)", weight: "Critical", severity: "critical" },
      { label: "Generic HR alias (hr123@outlook.com)", weight: "Medium Risk", severity: "medium" },
      { label: "Mismatched sender name and domain", weight: "High Risk", severity: "high" },
      { label: "Lookalike domains (amaz0n.com, micros0ft.com)", weight: "Critical", severity: "critical" },
    ],
    scoring: "Legitimate companies use corporate domains (e.g. @amazon.com). Any recruiter using @gmail.com or @yahoo.com for official communication is a major red flag.",
    future: "Planned: DKIM/SPF validation, real-time domain registration age check, and email header spoofing detection.",
  },
  "Internship Verification": {
    howItWorks: "Before accepting any internship, our system cross-references the company name, domain, and recruiter identity against multiple trust databases including government business registries, LinkedIn company profiles, and our internal scam report archive.",
    patterns: [
      { label: "Company not found in business registry", weight: "High Risk", severity: "high" },
      { label: "Domain registered less than 6 months ago", weight: "Critical", severity: "critical" },
      { label: "Recruiter has no LinkedIn presence", weight: "Medium Risk", severity: "medium" },
      { label: "Company name matches known scam aliases", weight: "Critical", severity: "critical" },
      { label: "No company website or social presence", weight: "High Risk", severity: "high" },
    ],
    scoring: "Verified companies receive a green trust badge. Unverified companies are flagged with a warning. Known scam companies are immediately blocked with a red alert.",
    future: "Planned: One-click LinkedIn company verification, Whois domain lookup integration, and MCA/GST number validation for Indian companies.",
  },
  "Cyber Threat Alerts": {
    howItWorks: "Our threat intelligence system monitors job portals, social media, and community reports in real-time. When a new scam campaign is detected, alerts are pushed to all users in the relevant domain — engineering, finance, design, and more.",
    patterns: [
      { label: "Emerging scam campaigns by sector", weight: "Live", severity: "high" },
      { label: "Viral fake internship posts on Instagram / LinkedIn", weight: "Live", severity: "critical" },
      { label: "WhatsApp scam chain messages", weight: "Live", severity: "high" },
      { label: "Fake government internship schemes", weight: "Live", severity: "critical" },
      { label: "Seasonal scam spikes (April–June, Sept–Oct)", weight: "Periodic", severity: "medium" },
    ],
    scoring: "Alerts are categorized as Low, Medium, High, and Critical. Critical alerts trigger push notifications if you've enabled them in your profile.",
    future: "Planned: Browser extension with real-time page scanning, email client plugin for Gmail/Outlook, and WhatsApp bot integration.",
  },
  "Recruiter Trust Score": {
    howItWorks: "Every recruiter profile you interact with gets a dynamic trust score from 0–100. The score is computed from multiple signals: email domain quality, company legitimacy, job description patterns, and community-reported feedback.",
    patterns: [
      { label: "Corporate email domain", weight: "+40 pts", severity: "high" },
      { label: "Verified company LinkedIn page", weight: "+25 pts", severity: "high" },
      { label: "Clear interview and hiring process", weight: "+15 pts", severity: "medium" },
      { label: "Realistic compensation range", weight: "+10 pts", severity: "medium" },
      { label: "Positive community reports", weight: "+10 pts", severity: "medium" },
    ],
    scoring: "80–100: Highly Trusted. 60–79: Generally Safe. 40–59: Proceed with Caution. Below 40: Do Not Engage.",
    future: "Planned: Recruiter rating system, LinkedIn OAuth verification, and blockchain-anchored recruiter identity certificates.",
  },
  "Secure Student Protection": {
    howItWorks: "All text analysis runs entirely in your browser. Nothing you paste is ever sent to our servers. There is no account creation required, no tracking pixels, no analytics on your input data, and no third-party data sharing of any kind.",
    patterns: [
      { label: "Zero server-side processing of user input", weight: "Guaranteed", severity: "high" },
      { label: "No cookies or local storage for input data", weight: "Guaranteed", severity: "high" },
      { label: "No account or login required to use scanner", weight: "Guaranteed", severity: "medium" },
      { label: "Open-source detection rules (auditable)", weight: "Planned", severity: "medium" },
      { label: "GDPR and DPDP (India) compliant", weight: "Guaranteed", severity: "high" },
    ],
    scoring: "We operate on a strict zero-data-retention policy. Your safety and privacy are not a product feature — they are a design constraint that cannot be overridden.",
    future: "Planned: Public security audit, bug bounty programme, and independent privacy certification from a third-party auditor.",
  },
};

type FeatureTitle = keyof typeof FEATURE_DETAILS;

const FEATURES: { icon: React.ElementType; title: FeatureTitle; description: string; color: string; tag: string }[] = [
  { icon: Brain,      title: "AI Scam Detection",       description: "Proprietary AI engine analyzes 12+ scam patterns including payment demands, unrealistic promises, and suspicious keywords.", color: "#00D9FF", tag: "Core" },
  { icon: Mail,       title: "Email Analysis",           description: "Instantly flags free email domains, mismatched sender identities, and phishing signatures in recruiter communications.", color: "#8B5CF6", tag: "Popular" },
  { icon: BadgeCheck, title: "Internship Verification",  description: "Cross-references company names, domains, and recruiter profiles against known scam databases and industry benchmarks.", color: "#00FF88", tag: "Trust" },
  { icon: Bell,       title: "Cyber Threat Alerts",      description: "Real-time alerts for emerging internship scam trends in your domain — engineering, marketing, finance, and more.", color: "#FF8C00", tag: "Live" },
  { icon: Star,       title: "Recruiter Trust Score",    description: "Every recruiter gets a dynamic trust score based on email domain, company registration, and behaviour patterns.", color: "#FFD700", tag: "Score" },
  { icon: Shield,     title: "Secure Student Protection",description: "Zero data retention. Your pasted text is analyzed locally — we never store, sell, or share your personal information.", color: "#FF3B5C", tag: "Privacy" },
];

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#FF3B5C",
  high: "#FF8C00",
  medium: "#FFD700",
};

// ── Modal ─────────────────────────────────────────────────────────────────────
function FeatureModal({
  feature,
  onClose,
}: {
  feature: (typeof FEATURES)[0];
  onClose: () => void;
}) {
  const detail = FEATURE_DETAILS[feature.title];
  const Icon = feature.icon;

  // close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: "rgba(8, 8, 28, 0.95)",
          border: `1px solid ${feature.color}44`,
          boxShadow: `0 0 60px ${feature.color}22, 0 0 120px ${feature.color}11`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-5"
          style={{
            background: "rgba(8,8,28,0.98)",
            borderBottom: `1px solid ${feature.color}22`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}33` }}
            >
              <Icon className="w-5 h-5" style={{ color: feature.color }} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">{feature.title}</h3>
              <span className="text-xs font-mono mt-0.5 block" style={{ color: feature.color }}>
                {feature.tag} Feature
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-8">
          {/* How it works */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4" style={{ color: feature.color }} />
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest">How It Works</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{detail.howItWorks}</p>
          </div>

          {/* Detection patterns */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4" style={{ color: feature.color }} />
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Detection Patterns</h4>
            </div>
            <div className="space-y-2">
              {detail.patterns.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: `${SEVERITY_COLORS[p.severity]}0d`,
                    border: `1px solid ${SEVERITY_COLORS[p.severity]}22`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: SEVERITY_COLORS[p.severity], boxShadow: `0 0 6px ${SEVERITY_COLORS[p.severity]}` }}
                    />
                    <span className="text-gray-300">{p.label}</span>
                  </div>
                  <span
                    className="flex-shrink-0 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: `${SEVERITY_COLORS[p.severity]}18`,
                      color: SEVERITY_COLORS[p.severity],
                      border: `1px solid ${SEVERITY_COLORS[p.severity]}33`,
                    }}
                  >
                    {p.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scoring */}
          <div
            className="rounded-xl p-4"
            style={{ background: `${feature.color}08`, border: `1px solid ${feature.color}22` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" style={{ color: feature.color }} />
              <h4 className="font-semibold text-sm uppercase tracking-widest" style={{ color: feature.color }}>
                Scoring Logic
              </h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{detail.scoring}</p>
          </div>

          {/* Coming Soon */}
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-[rgba(139,92,246,0.15)] text-[#8B5CF6] border border-[rgba(139,92,246,0.3)]">
                COMING SOON
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{detail.future}</p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 flex justify-end gap-3 px-6 py-4"
          style={{ background: "rgba(8,8,28,0.98)", borderTop: `1px solid ${feature.color}22` }}
        >
          <button
            onClick={onClose}
            className="btn-outline text-sm py-2 px-5"
          >
            Close
          </button>
          <a href="#scanner" onClick={onClose} className="btn-primary text-sm py-2 px-5">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Try Scanner
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
  onLearnMore,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  onLearnMore: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { setVisible(e.isIntersecting); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-6 group relative overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Hover glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${feature.color}12, transparent 70%)` }}
      />

      <div className="relative z-10 flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}33`, boxShadow: `0 0 20px ${feature.color}22` }}
        >
          <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{ color: feature.color }} />
        </div>
        <span
          className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
          style={{ background: `${feature.color}18`, color: feature.color, border: `1px solid ${feature.color}33` }}
        >
          {feature.tag}
        </span>
      </div>

      <h3 className="relative z-10 text-lg font-bold text-white mb-2">{feature.title}</h3>
      <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{feature.description}</p>

      {/* Learn more — always visible, clickable */}
      <button
        onClick={onLearnMore}
        className="relative z-10 mt-5 flex items-center gap-1.5 text-xs font-mono font-semibold cursor-pointer group/btn"
        style={{ color: feature.color }}
        aria-label={`Learn more about ${feature.title}`}
      >
        <span className="border-b border-transparent group-hover/btn:border-current transition-colors duration-200">
          Learn more
        </span>
        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<(typeof FEATURES)[0] | null>(null);

  return (
    <>
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a0520] to-[#050816] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-tag mx-auto w-fit mb-6">
              <Shield className="w-3 h-3" /> Protection Suite
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
              Everything You Need to Stay <span className="gradient-text">Safe</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Six layers of AI-powered protection built specifically for students navigating the minefield of online internship applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                feature={f}
                index={i}
                onLearnMore={() => setActiveFeature(f)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal portal */}
      {activeFeature && (
        <FeatureModal
          feature={activeFeature}
          onClose={() => setActiveFeature(null)}
        />
      )}
    </>
  );
}
