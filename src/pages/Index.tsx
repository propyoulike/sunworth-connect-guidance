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
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Provident Sunworth</h3>
          <p className="text-background/80 mb-6">Your family's brighter everyday on Mysore Road</p>
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
