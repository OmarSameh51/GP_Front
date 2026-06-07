"use client"

import { useAuthStore } from "@/store/auth"
import { HeroSection } from "./hero-section"
import { MetricsStrip } from "./metrics-strip"
import { RoadmapSection } from "./roadmap-section"
import { FeaturesSection } from "./features"
import { CTASection } from "./cta-section"
import { AuthenticatedHome } from "./authenticated-home"

function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MetricsStrip />
      <RoadmapSection />
      <FeaturesSection />
      <CTASection />
    </div>
  )
}

export function HomeContent() {
  const { user, isAuthenticated } = useAuthStore()

  if (isAuthenticated && user) return <AuthenticatedHome />

  return <LandingPage />
}
