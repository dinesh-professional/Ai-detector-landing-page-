import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import ScannerDemo from "@/components/ScannerDemo";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative bg-[#050816] min-h-screen">
      <Navbar />
      <HeroSection />

      <ScannerDemo />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
