"use client";

import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import StepsSection from "@/components/StepsSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const handleAgendarClick = useCallback(() => {
    // Scroll to top and trigger the booking view in Hero
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Small delay to allow scroll, then trigger booking
    setTimeout(() => {
      const heroElement = document.getElementById("hero-section");
      if (heroElement) {
        heroElement.dispatchEvent(new CustomEvent("showBooking"));
      }
    }, 300);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#0A0A0A]">
      <Navbar onAgendarClick={handleAgendarClick} />
      <div id="hero-section">
        <Hero />
      </div>
      <TrustSection />
      <StepsSection />
      <FinalCTA onAgendarClick={handleAgendarClick} />
    </main>
  );
}
