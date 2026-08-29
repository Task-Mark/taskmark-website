import { ContactForm } from "@/components/landing/contact-form"
import { ContributeSection } from "@/components/landing/contribute-section"
import { DocsCtaSection } from "@/components/landing/docs-cta-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { LandingHero } from "@/components/landing/landing-hero"
import { LiveBoardSection } from "@/components/landing/live-board-section"
import { OpenSourceSection } from "@/components/landing/open-source-section"
import { PurposeSection } from "@/components/landing/purpose-section"

export default function HomePage() {
  return (
    <div>
      <LandingHero />
      <PurposeSection />
      <LiveBoardSection />
      <FeaturesSection />
      <OpenSourceSection />
      <DocsCtaSection />
      <ContributeSection />
      <ContactForm />
    </div>
  )
}
