"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How does the AI detection work?", a: "Our engine uses a curated set of 12+ rule-based patterns trained on thousands of real scam reports. It scans for red flags like payment requests, free email domains, unrealistic salary claims, WhatsApp-only contact, and urgency pressure — assigning a weighted scam probability score from 0–100." },
  { q: "Is my data stored or shared?", a: "Absolutely not. All analysis happens client-side in your browser. We don't send your pasted text to any server, store it in a database, or share it with third parties. Zero data retention is a core design principle, not a marketing claim." },
  { q: "Can legitimate companies verify themselves on the platform?", a: "We're building a Verified Employer Registry for the full product launch. Companies will be able to submit their domain, LinkedIn profile, and registration documents to receive a verified badge — visible to students scanning their offers." },
  { q: "Is the tool free to use?", a: "The scanner demo is completely free with no account required. The full product (browser extension, bulk scanning, alerts) will launch on a freemium model — free tier for individual students, paid plans for institutions and placement cells." },
  { q: "How accurate is the detection?", a: "Our rule-based engine has a 94% detection rate on tested scam samples. However, sophisticated scams evolve constantly. We recommend always combining AI analysis with your own research — check the company on LinkedIn, verify their domain on Whois, and never pay fees." },
  { q: "What types of scams does it catch?", a: "Payment/registration fee scams, phishing recruiter emails, fake WFH internships, MLM schemes disguised as internships, identity theft requests, unrealistic salary offers, and WhatsApp-only recruitment schemes. We're continuously adding new patterns." },
];

function FAQItem({ item }: { item: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${open ? "neon-border" : ""}`}>
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm sm:text-base group-hover:text-[#00D9FF] transition-colors">
          {item.q}
        </span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-transform duration-300 ${open ? "rotate-180 text-[#00D9FF]" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-64" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit mb-6"><HelpCircle className="w-3 h-3" /> FAQ</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-gray-400">Everything you need to know about AI Internship Detector.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((item, i) => <FAQItem key={i} item={item} />)}
        </div>
      </div>
    </section>
  );
}
