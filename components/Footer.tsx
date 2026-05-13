"use client";
import { Shield, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";

const LINKS = {
  product: [
    { label: "Scanner Demo", href: "#scanner" },
    { label: "Features", href: "#features" },
    { label: "Statistics", href: "#stats" },
    { label: "Join Waitlist", href: "#waitlist" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  resources: [
    { label: "Scam Report Database", href: "#" },
    { label: "Student Safety Guide", href: "#" },
    { label: "Recruiter Checklist", href: "#" },
    { label: "Blog", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(0,217,255,0.08)] pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] to-[#030510] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.3)" }}>
                <Shield className="w-4 h-4 text-[#00D9FF]" />
              </div>
              <span className="font-bold text-lg"><span className="gradient-text">AI</span><span className="text-white"> Detector</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI-powered internship scam detection for students. Because your career deserves better than a Gmail from &ldquo;TechCorpHR.&rdquo;
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@aidetector.dev", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#00D9FF] transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-500 hover:text-[#00D9FF] text-sm transition-colors flex items-center gap-1.5 group">
                      {link.label}
                      {link.href.startsWith("http") && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-mono">
            © 2025 AI Internship Detector. Built for students, by students.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" style={{ boxShadow: "0 0 6px #00FF88" }} />
            <span className="text-gray-600 text-xs font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
