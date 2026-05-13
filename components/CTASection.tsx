"use client";
import { useState } from "react";
import { Zap, CheckCircle, Mail } from "lucide-react";

const PERKS = ["Free forever for students", "No credit card required", "Early access to browser extension", "Priority support"];

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); }
  };

  return (
    <section id="waitlist" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="section-tag mx-auto w-fit mb-8"><Zap className="w-3 h-3" /> Early Access</div>
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
          Never Fall for a
          <br />
          <span className="gradient-text-danger">Scam Again.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Join 12,000+ students on the waitlist. Get early access to the full platform, browser extension, and real-time scam alerts.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(0,217,255,0.2)] text-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-[rgba(0,217,255,0.5)] transition-colors"
              />
            </div>
            <button type="submit" className="btn-primary px-7 py-3.5 text-sm whitespace-nowrap">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Join Waitlist</span>
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 mb-8 py-6">
            <CheckCircle className="w-12 h-12 text-[#00FF88]" style={{ filter: "drop-shadow(0 0 15px #00FF88)" }} />
            <p className="text-[#00FF88] font-semibold text-lg">You&apos;re on the list!</p>
            <p className="text-gray-400 text-sm">We&apos;ll notify you at <strong className="text-gray-300">{email}</strong> when early access opens.</p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="w-4 h-4 text-[#00D9FF]" />
              {perk}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
