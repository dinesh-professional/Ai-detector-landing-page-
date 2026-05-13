"use client";
import { Building2, GraduationCap, Users, Globe } from "lucide-react";

const LOGOS = [
  { name: "IIT Delhi", icon: GraduationCap },
  { name: "IIM Ahmedabad", icon: Building2 },
  { name: "BITS Pilani", icon: GraduationCap },
  { name: "NIT Trichy", icon: Users },
  { name: "Symbiosis", icon: Globe },
  { name: "Manipal University", icon: GraduationCap },
  { name: "Christ University", icon: Building2 },
];

export default function TrustedBy() {
  return (
    <section className="relative py-14 px-4 sm:px-6 lg:px-8 border-y border-[rgba(0,217,255,0.06)]">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-mono text-gray-600 uppercase tracking-widest mb-8">
          Trusted by students from top institutions
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {LOGOS.map(({ name, icon: Icon }) => (
            <div key={name} className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors duration-300 group">
              <Icon className="w-4 h-4 group-hover:text-[#00D9FF] transition-colors" />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
