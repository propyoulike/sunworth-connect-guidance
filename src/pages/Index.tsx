import { useState } from "react";
import Hero from "@/components/Hero";
import ProjectSummary from "@/components/ProjectSummary";
import ConstructionStatus from "@/components/ConstructionStatus";
import Location from "@/components/Location";
import FloorPlansTabs from "@/components/FloorPlansTabs";
import HomeSizeAdvisor from "@/components/HomeSizeAdvisor";
import Amenities from "@/components/Amenities";
import Views from "@/components/Views";
import PaymentPlans from "@/components/PaymentPlans";
import LoanEligibilityWidget from "@/components/LoanEligibilityWidget";
import CustomerSpeaks from "@/components/CustomerSpeaks";
import Brochure from "@/components/Brochure";
import ProvidentSection from "@/components/ProvidentSection";
import FAQ from "@/components/FAQ";
import LeadFormModal from "@/components/LeadFormModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Navbar from "@/components/Navbar"; // ✅ Added

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen smooth-scroll">


{/* Hero Section */}
<div id="hero-section">
  <Hero onCtaClick={openForm} />
</div>

{/* Sticky Navbar below Hero */}
<div id="navbar-anchor">
  <Navbar onCtaClick={openForm} />
</div>
      
<div id="project-summary">
  <ProjectSummary onCtaClick={openForm} />
</div>

<div id="floor-plans">
  <FloorPlansTabs onCtaClick={openForm} />
</div>

{/* Home Size Advisor Section */}
<div id="home-size-advisor" className="py-20 lg:py-28 bg-[#F5F7FA] scroll-mt-32">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 text-foreground">
      Find Your Ideal <span className="text-primary">Unit Configuration</span>
    </h2>
    <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
      Based on your family size, lifestyle, comfort preferences, and future needs — 
      this smart advisor recommends the best fitting 2 BHK, 3 BHK, 3 BHK Royale or 
      multi-unit combinations inside Sunworth City.
    </p>

    <HomeSizeAdvisor />
  </div>
</div>

<div id="location">
  <Location onCtaClick={openForm} />
</div>

<div id="amenities">
  <Amenities onCtaClick={openForm} />
</div>

<div id="views">
  <Views onCtaClick={openForm} />
</div>

<div id="construction-status">
  <ConstructionStatus onCtaClick={openForm} />
</div>

<div id="payment-plans">
  <PaymentPlans onCtaClick={openForm} />
</div>

{/* Loan Eligibility & Affordability Widget */}
<div id="loan-eligibility">
  <LoanEligibilityWidget onCtaClick={openForm} />
</div>

<div id="testimonials">
  <CustomerSpeaks onCtaClick={openForm} />
</div>

<div id="brochure">
  <Brochure onCtaClick={openForm} />
</div>

<div id="about-provident">
  <ProvidentSection onCtaClick={openForm}/>
</div>

<div id="faq">
  <FAQ openLeadForm={openForm}/>
</div>

      {/* Lead Form Modal */}
      <LeadFormModal open={isFormOpen} onOpenChange={setIsFormOpen} />

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Provident Sunworth</h3>
          <p className="text-background/80 mb-6">
            Your family's brighter everyday
          </p>
          <p>RERA Number: PRM/KA/RERA/1251/310/AG/250811/005899</p>
          <p>Email: propyolike@gmail.com</p>
          <p>Address: Banashankari 3rd Stage Bengaluru 560085</p>
          <p className="text-sm text-background/60">
            Disclaimer: All project information, including availability,
            pricing, floor plans, and amenities, is subject to change without
            prior notice. Images and visuals are indicative and may differ from
            actual delivered products. Visitors are advised to verify all
            details independently before making any purchase decisions. This
            website is operated by PropYouLike as an authorized channel partner
            and is not the official developer website.
          </p>
          <p className="text-sm text-background/60">
            Privacy Policy: Information submitted through forms or contact
            channels will be used solely to assist with your enquiry. We do not
            sell or share your data with third parties except the developer or
            authorized partners for project-related communication. By submitting
            your details, you consent to being contacted via call, SMS,
            WhatsApp, or email. For data deletion requests, contact:
            propyoulike@gmail.com
          </p>
          <p className="text-sm text-background/60">
            Cookie Policy: This website may use cookies or similar technologies
            (including analytics and marketing pixels) to improve user
            experience and analyze website traffic. You may disable cookies in
            your browser settings at any time.
          </p>
          <p className="text-sm text-background/60">
            © 2025 PropYouLike, Authorised Channel Partner. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA 
      <StickyMobileCTA onCtaClick={openForm} /> */}
    </div>
  );
};

export default Index;
