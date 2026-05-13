"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, Shield, Loader2, Zap } from "lucide-react";

// ── Scam keyword rules ──────────────────────────────────────────────────────
const RULES: { pattern: RegExp; score: number; flag: string; severity: "critical" | "high" | "medium" }[] = [
  { pattern: /pay(ment|ing)?\s*(required|first|upfront|deposit)/i, score: 30, flag: "Requests upfront payment", severity: "critical" },
  { pattern: /registr(ation|er)\s*fee/i,                           score: 30, flag: "Registration fee demanded", severity: "critical" },
  { pattern: /gmail\.com|yahoo\.com|hotmail\.com|outlook\.com/i,   score: 20, flag: "Free email domain (not corporate)", severity: "high" },
  { pattern: /\$\s*[5-9]\d{3,}|\d{4,}\s*(per\s*month|\/mo)/i,    score: 25, flag: "Unrealistic salary promise", severity: "high" },
  { pattern: /no\s*(experience|skills?|qualification)/i,           score: 15, flag: "No skill requirements listed", severity: "medium" },
  { pattern: /whatsapp\s*(only|me|number|contact)/i,               score: 20, flag: "WhatsApp-only contact method", severity: "high" },
  { pattern: /urgent(ly)?|immediate(ly)?\s*join/i,                 score: 10, flag: "Excessive urgency pressure", severity: "medium" },
  { pattern: /easy\s*money|quick\s*cash|guaranteed\s*income/i,     score: 25, flag: "Easy money / guaranteed income", severity: "critical" },
  { pattern: /work\s*from\s*home.{0,30}no\s*experience/i,          score: 20, flag: "WFH + no experience combo", severity: "high" },
  { pattern: /send\s*(your\s*)?(resume|cv|aadhar|passport|id)/i,   score: 15, flag: "Requests personal documents upfront", severity: "high" },
  { pattern: /part.?time.{0,20}\d{4,}\s*(per\s*week|\/week)/i,    score: 20, flag: "Unrealistic part-time pay", severity: "high" },
  { pattern: /no\s*interview/i,                                    score: 15, flag: "No interview required", severity: "medium" },
];

const SAMPLE_SCAM = `Hi! I'm Sarah from InternPro Solutions. We found your profile on LinkedIn and you are SELECTED for our premium internship program!

Salary: $8,000/month — NO EXPERIENCE REQUIRED
Start immediately! No interview needed.

To confirm your spot, please pay a registration fee of $150 via WhatsApp only: +1-XXX-XXX-XXXX (sarahrecruiter@gmail.com)

HURRY — Only 3 spots left! Easy money guaranteed. Send your Aadhar/Passport to verify.`;

const SAMPLE_LEGIT = `Hi there! We came across your profile and are impressed by your skills.

We're hiring a Software Engineering Intern at Acme Corp for Summer 2025.
Compensation: $25/hour | Duration: 3 months | Location: Remote

Requirements: Python, REST APIs, 2+ years of coursework in CS.
Interview process: 2 technical rounds + HR call.

Apply at careers.acmecorp.com — No fees, no upfront payments.
Questions? Email internships@acmecorp.com`;

interface ScanResult {
  score: number;
  flags: { text: string; severity: "critical" | "high" | "medium" }[];
  riskLevel: "SAFE" | "SUSPICIOUS" | "LIKELY SCAM" | "HIGH RISK SCAM";
  recommendation: string;
}

function analyzeText(text: string): ScanResult {
  let score = 0;
  const flags: ScanResult["flags"] = [];

  for (const rule of RULES) {
    if (rule.pattern.test(text)) {
      score += rule.score;
      flags.push({ text: rule.flag, severity: rule.severity });
    }
  }

  score = Math.min(score, 100);

  const riskLevel: ScanResult["riskLevel"] =
    score < 20 ? "SAFE" :
    score < 45 ? "SUSPICIOUS" :
    score < 70 ? "LIKELY SCAM" : "HIGH RISK SCAM";

  const recommendation =
    score < 20
      ? "This opportunity appears legitimate. Always verify the company on LinkedIn and their official website before proceeding."
      : score < 45
      ? "Exercise caution. Research the company thoroughly, verify the recruiter's email domain, and never pay any fees."
      : score < 70
      ? "Multiple scam indicators found. Do NOT pay any fees. Report this to your college placement cell."
      : "DANGER: This is almost certainly a scam. Block the sender, report to cybercrime authorities, and warn others.";

  return { score, flags, riskLevel, recommendation };
}

function ScoreGauge({ score }: { score: number }) {
  const color = score < 20 ? "#00FF88" : score < 45 ? "#FF8C00" : "#FF3B5C";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease, stroke 0.5s ease", filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-500 font-mono">/ 100</span>
      </div>
    </div>
  );
}

export default function ScannerDemo() {
  const [text, setText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runScan = () => {
    if (!text.trim()) return;
    setResult(null);
    setScanning(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 18, 99));
    }, 120);

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setResult(analyzeText(text));
      setScanning(false);
    }, 2200);
  };

  const riskColors: Record<string, string> = {
    "SAFE": "#00FF88",
    "SUSPICIOUS": "#FF8C00",
    "LIKELY SCAM": "#FF3B5C",
    "HIGH RISK SCAM": "#FF3B5C",
  };

  return (
    <section id="scanner" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="section-tag mx-auto w-fit mb-6">
            <Zap className="w-3 h-3" /> Live AI Scanner Demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Paste Any{" "}
            <span className="gradient-text">Internship Offer</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our rule-based AI engine scans for 12+ scam patterns in real time.
            Try it — paste a suspicious email or use one of our examples.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* INPUT PANEL */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono text-[#00D9FF] uppercase tracking-widest">Input</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => { setText(SAMPLE_SCAM); setResult(null); }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[rgba(255,59,92,0.3)] text-[#FF3B5C] hover:bg-[rgba(255,59,92,0.1)] transition-colors"
                >
                  🚨 Scam Example
                </button>
                <button
                  onClick={() => { setText(SAMPLE_LEGIT); setResult(null); }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[rgba(0,255,136,0.3)] text-[#00FF88] hover:bg-[rgba(0,255,136,0.1)] transition-colors"
                >
                  ✅ Legit Example
                </button>
              </div>
            </div>

            <textarea
              id="scanner-input"
              value={text}
              onChange={(e) => { setText(e.target.value); setResult(null); }}
              placeholder="Paste internship description, recruiter email, or job offer here..."
              rows={12}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,217,255,0.15)] rounded-xl p-4 text-gray-300 placeholder-gray-600 text-sm font-mono resize-none focus:outline-none focus:border-[rgba(0,217,255,0.5)] transition-colors"
            />

            {/* Progress bar */}
            {scanning && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-gray-500">
                  <span>Analyzing patterns...</span>
                  <span>{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: "linear-gradient(90deg, #00D9FF, #8B5CF6)",
                      boxShadow: "0 0 10px rgba(0,217,255,0.5)",
                    }}
                  />
                </div>
              </div>
            )}

            <button
              id="scan-button"
              onClick={runScan}
              disabled={scanning || !text.trim()}
              className="w-full btn-primary py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {scanning ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Scanning...</>
                ) : (
                  <><Search className="w-5 h-5" /> Run AI Analysis</>
                )}
              </span>
            </button>
          </div>

          {/* RESULTS PANEL */}
          <div className="glass-card rounded-2xl p-6 min-h-[420px] flex flex-col">
            {!result && !scanning && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
                <div className="w-20 h-20 rounded-full border-2 border-[rgba(0,217,255,0.2)] flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm font-mono">
                  Results will appear here after scanning
                </p>
              </div>
            )}

            {scanning && (
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-2 border-[rgba(0,217,255,0.2)]" />
                  {/* Animated pulse rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-[rgba(0,217,255,0.4)] animate-ping" />
                  {/* Scan line inside the circle */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="scan-line" />
                  </div>
                  <Shield className="relative z-10 w-10 h-10 text-[#00D9FF]" />
                </div>
                <p className="text-[#00D9FF] font-mono text-sm animate-pulse">AI scanning in progress...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Score + Risk */}
                <div className="flex items-center gap-6">
                  <ScoreGauge score={result.score} />
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Risk Level</div>
                    <div
                      className="text-xl font-black font-mono"
                      style={{ color: riskColors[result.riskLevel] }}
                    >
                      {result.riskLevel}
                    </div>
                    <div className="text-xs text-gray-500">Scam Probability Score</div>
                  </div>
                </div>

                {/* Flags */}
                {result.flags.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">Red Flags Detected</div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {result.flags.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 rounded-lg p-2.5 text-sm"
                          style={{
                            background: f.severity === "critical"
                              ? "rgba(255,59,92,0.1)"
                              : f.severity === "high"
                              ? "rgba(255,140,0,0.1)"
                              : "rgba(255,200,0,0.08)",
                            border: `1px solid ${f.severity === "critical" ? "rgba(255,59,92,0.3)" : f.severity === "high" ? "rgba(255,140,0,0.3)" : "rgba(255,200,0,0.2)"}`,
                          }}
                        >
                          <AlertTriangle
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: f.severity === "critical" ? "#FF3B5C" : f.severity === "high" ? "#FF8C00" : "#FFD700" }}
                          />
                          <span className="text-gray-300">{f.text}</span>
                          <span
                            className="ml-auto text-xs px-2 py-0.5 rounded-full font-mono font-bold flex-shrink-0"
                            style={{
                              background: f.severity === "critical" ? "rgba(255,59,92,0.2)" : f.severity === "high" ? "rgba(255,140,0,0.2)" : "rgba(255,200,0,0.15)",
                              color: f.severity === "critical" ? "#FF3B5C" : f.severity === "high" ? "#FF8C00" : "#FFD700",
                            }}
                          >
                            {f.severity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#00FF88] text-sm">
                    <CheckCircle className="w-5 h-5" />
                    No red flags detected
                  </div>
                )}

                {/* Recommendation */}
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{
                    background: "rgba(0,217,255,0.05)",
                    border: "1px solid rgba(0,217,255,0.15)",
                  }}
                >
                  <div className="text-xs font-mono text-[#00D9FF] mb-2 uppercase tracking-widest">AI Recommendation</div>
                  <p className="text-gray-300">{result.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
