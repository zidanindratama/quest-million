import { AnalyticsSection } from "@/components/landing/analytics-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeatureSystemSection } from "@/components/landing/feature-system-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HostControlSection } from "@/components/landing/host-control-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProductTourSection } from "@/components/landing/product-tour-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustSection } from "@/components/landing/trust-section";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: absoluteUrl(),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
  };

  return (
    <div className="landing-theme min-h-screen overflow-hidden bg-[var(--qm-bg)] text-[var(--qm-fg)] transition-colors duration-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LandingNav />
      <main>
        <HeroSection />
        <TrustSection />
        <ProductTourSection />
        <AudienceSection />
        <FeatureSystemSection />
        <HostControlSection />
        <AnalyticsSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
