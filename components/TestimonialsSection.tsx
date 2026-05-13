"use client";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "CS Student, Delhi University", avatar: "PS", quote: "The scanner flagged a 'Microsoft internship' that was actually a scam. It spotted the Gmail address instantly. Literally saved me from a ₹5000 registration fee trap.", stars: 5, color: "#00D9FF" },
  { name: "Arjun Mehta", role: "Final Year, IIT Bombay", avatar: "AM", quote: "I was about to apply to a job offering $10,000/month with no experience required. The AI gave it 87% scam score in seconds. Legit tool.", stars: 5, color: "#8B5CF6" },
  { name: "Sarah Chen", role: "MBA Graduate, BITS Pilani", avatar: "SC", quote: "Multiple companies were offering 'paid internships' through WhatsApp only. This tool flagged all of them as high-risk. My placement cell now recommends it.", stars: 5, color: "#00FF88" },
  { name: "Rahul Verma", role: "Engineering Intern, Pune", avatar: "RV", quote: "The red flag for 'no interview required' saved me. Any legit company does interviews. Simple logic, but I needed the AI to point it out. Highly recommend.", stars: 5, color: "#FF8C00" },
  { name: "Ananya Iyer", role: "Design Student, NID", avatar: "AI", quote: "I checked 6 internship offers from Instagram DMs — 5 were flagged as scams. The 1 that passed? Turned out to be a real startup. This tool is genuinely useful.", stars: 5, color: "#FFD700" },
  { name: "Vikram Singh", role: "BCom, Symbiosis", avatar: "VS", quote: "Finance internship scams are rampant. The detector caught 'guaranteed returns' language immediately and saved me from a Ponzi scheme disguised as a job.", stars: 5, color: "#FF3B5C" },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
          ))}
        </div>
        <Quote className="w-5 h-5 text-gray-700 group-hover:text-gray-500 transition-colors" />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-2 border-t border-[rgba(255,255,255,0.05)]">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `${t.color}22`, color: t.color, border: `1px solid ${t.color}44` }}>
          {t.avatar}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{t.name}</div>
          <div className="text-gray-500 text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#080518] to-[#050816] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit mb-6"><Star className="w-3 h-3" /> Student Reviews</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Real Students. <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Thousands of students have already avoided scams using our platform.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>
    </section>
  );
}
