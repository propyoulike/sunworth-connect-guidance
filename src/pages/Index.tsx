import { useRef } from "react";
import Hero from "@/components/Hero";
import EmotionalUSPs from "@/components/EmotionalUSPs";
import MasterPlan from "@/components/MasterPlan";
import FloorPlans from "@/components/FloorPlans";
import Amenities from "@/components/Amenities";
import Views from "@/components/Views";
import Location from "@/components/Location";
import Connectivity from "@/components/Connectivity";
import Homes from "@/components/Homes";
import ConstructionStatus from "@/components/ConstructionStatus";
import CustomerSpeaks from "@/components/CustomerSpeaks";
import Brochure from "@/components/Brochure";
import LeadForm from "@/components/LeadForm";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ProvidentSection from "@/components/ProvidentSection";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen smooth-scroll">
      {/* Hero Section */}
      <Hero onCtaClick={scrollToForm} />

      {/* Lead Form - Top (visible on mobile after hero) */}
      <section className="py-12 bg-muted/30 lg:hidden">
        <div className="container mx-auto px-4">
          <LeadForm />
        </div>
      </section>

      {/* Emotional USPs 
      <EmotionalUSPs /> */}

      {/* Master Plan */}
      <MasterPlan onCtaClick={scrollToForm} />

      {/* Floor Plans */}
      <FloorPlans onCtaClick={scrollToForm} />

      {/* Amenities */}
      <Amenities onCtaClick={scrollToForm} />

      {/* Views */}
      <Views onCtaClick={scrollToForm} />

      {/* Location & Neighbourhood */}
      <Location onCtaClick={scrollToForm} />

      {/* Construction Status */}
      <ConstructionStatus onCtaClick={scrollToForm} />

      {/* Customer Testimonials */}
      <CustomerSpeaks onCtaClick={scrollToForm} />

      {/* Brochure Download */}
      <Brochure onCtaClick={scrollToForm} />

      {/* Lead Form - Mid Page */}
      <section ref={formRef} className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* About Provident */}
      <ProvidentSection />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Provident Sunworth</h3>
          <p className="text-background/80 mb-6">Your family's brighter everyday</p>
          <p  className="text-sm text-background/60">
          Disclaimer: All project information, including availability, pricing, floor plans, and amenities, is subject to change without prior notice. Images and visuals are indicative and may differ from actual delivered products. Visitors are advised to verify all details independently before making any purchase decisions. This website is operated by PropYouLike as an authorized channel partner and is not the official developer website.
          </p>
          <p  className="text-sm text-background/60">
          Privacy Policy: Information submitted through forms or contact channels will be used solely to assist with your enquiry. We do not sell or share your data with third parties except the developer or authorized partners for project-related communication. By submitting your details, you consent to being contacted via call, SMS, WhatsApp, or email. For data deletion requests, contact: propyoulike@gmail.com
          </p>
          <p  className="text-sm text-background/60">
          Cookie Policy: This website may use cookies or similar technologies (including analytics and marketing pixels) to improve user experience and analyze website traffic. You may disable cookies in your browser settings at any time.
          </p>
          <p className="text-sm text-background/60">
            © 2025 PropYouLike, Authorised Channel Partner. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onCtaClick={scrollToForm} />
    </div>
  );
};

export default Index;
