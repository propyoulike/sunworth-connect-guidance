import { useState } from "react";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

import ProjectSummary from "@/components/ProjectSummary";
import FloorPlansTabs from "@/components/FloorPlansTabs";
import HomeSizeAdvisor from "@/components/HomeSizeAdvisor";
import Location from "@/components/Location";
import Amenities from "@/components/Amenities";
import Views from "@/components/Views";
import ConstructionStatus from "@/components/ConstructionStatus";
import PaymentPlans from "@/components/PaymentPlans";
import LoanEligibilityWidget from "@/components/LoanEligibilityWidget";
import CustomerSpeaks from "@/components/CustomerSpeaks";
import Brochure from "@/components/Brochure";
import ProvidentSection from "@/components/ProvidentSection";
import FAQ from "@/components/FAQ";

import LeadFormModal from "@/components/LeadFormModal";

const Index = ({ trackEvent }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = (source) => {
    if (typeof trackEvent === "function") {
      trackEvent("lead_form_opened", { source, page: "Sunworth" });
    }
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen smooth-scroll">

      {/* HERO */}
      <section id="hero-section">
        <Hero
          onCtaClick={() => {
            trackEvent("cta_click", { source: "Hero", page: "Sunworth" });
            openForm("Hero");
          }}
        />
      </section>

      {/* NAVBAR */}
      <div id="navbar-anchor">
        <Navbar
          onCtaClick={() => {
            trackEvent("cta_click", { source: "Navbar", page: "Sunworth" });
            openForm("Navbar");
          }}
        />
      </div>

      {/* PROJECT SUMMARY */}
      <section id="project-summary" className="scroll-mt-24">
        <ProjectSummary
          onCtaClick={() => {
            trackEvent("cta_click", { source: "ProjectSummary", page: "Sunworth" });
            openForm("ProjectSummary");
          }}
        />
      </section>

      {/* FLOOR PLANS */}
      <section id="floor-plans" className="scroll-mt-24 py-20 lg:py-28">
        <FloorPlansTabs
          onCtaClick={(unitType) => {
            trackEvent("floorplan_interest", { unitType, page: "Sunworth" });
            openForm(`Floorplan-${unitType}`);
          }}
        />
      </section>

      {/* HOME SIZE ADVISOR */}
      <section
        id="home-size-advisor"
        className="py-20 lg:py-28 bg-[#F5F7FA] scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10">
            Find Your Ideal <span className="text-primary">Unit Configuration</span>
          </h2>

          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
            Based on your family size, lifestyle, comfort preferences, and
            future needs — this smart advisor recommends the best fitting 2 BHK,
            3 BHK, 3 BHK Royale or multi-unit combinations inside Sunworth City.
          </p>

          <HomeSizeAdvisor />
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="scroll-mt-24">
        <Location
          onCtaClick={() => {
            trackEvent("cta_click", { source: "Location", page: "Sunworth" });
            openForm("Location");
          }}
        />
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="scroll-mt-24">
        <Amenities
          onCtaClick={() => {
            trackEvent("cta_click", { source: "Amenities", page: "Sunworth" });
            openForm("Amenities");
          }}
        />
      </section>

      {/* VIEWS */}
      <section id="views" className="scroll-mt-24">
        <Views
          onCtaClick={() => {
            trackEvent("cta_click", { source: "Views", page: "Sunworth" });
            openForm("Views");
          }}
        />
      </section>

      {/* CONSTRUCTION STATUS */}
      <section id="construction-status" className="scroll-mt-24">
        <ConstructionStatus
          onCtaClick={() => {
            trackEvent("cta_click", { source: "ConstructionStatus", page: "Sunworth" });
            openForm("ConstructionStatus");
          }}
        />
      </section>

      {/* PAYMENT PLANS */}
      <section id="payment-plans" className="scroll-mt-24">
        <PaymentPlans
          onCtaClick={(plan) => {
            trackEvent("cta_click", { source: "PaymentPlans", plan, page: "Sunworth" });
            openForm("PaymentPlans");
          }}
        />
      </section>

      {/* LOAN ELIGIBILITY */}
      <section id="loan-eligibility" className="scroll-mt-24">
        <LoanEligibilityWidget
          onCtaClick={(loanData) => {
            trackEvent("loan_submitted", { ...loanData, page: "Sunworth" });
            openForm("LoanEligibility");
          }}
        />
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="scroll-mt-24">
        <CustomerSpeaks
          onCtaClick={() => {
            trackEvent("cta_click", { source: "Testimonials", page: "Sunworth" });
            openForm("Testimonials");
          }}
        />
      </section>

      {/* BROCHURE DOWNLOAD */}
      <section id="brochure" className="scroll-mt-24">
        <Brochure
          onCtaClick={() => {
            trackEvent("brochure_download", { page: "Sunworth" });
          }}
        />
      </section>

      {/* PROVIDENT SECTION */}
      <section id="about-provident" className="scroll-mt-24">
        <ProvidentSection
          onCtaClick={() => {
            trackEvent("cta_click", { source: "ProvidentSection", page: "Sunworth" });
            openForm("ProvidentSection");
          }}
        />
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24">
        <FAQ
          openLeadForm={() => {
            trackEvent("cta_click", { source: "FAQ", page: "Sunworth" });
            openForm("FAQ");
          }}
        />
      </section>

      {/* LEAD FORM MODAL */}
      <LeadFormModal
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (open && typeof trackEvent === "function") {
            trackEvent("lead_form_opened", { source: "LeadFormModal", page: "Sunworth" });
          }
        }}
      />

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Provident Sunworth</h3>

          <p className="text-background/80 mb-6">
            Your family's brighter everyday
          </p>

          <p>RERA: PRM/KA/RERA/1251/310/AG/250811/005899</p>
          <p>Email: propyoulike@gmail.com</p>
          <p>Address: Banashankari 3rd Stage Bengaluru 560085</p>

          <p className="text-sm text-background/60 mt-4">
            Disclaimer: All project information, including availability, pricing,
            floor plans, and amenities, is subject to change without notice.
            This website is operated by PropYouLike as an authorized channel
            partner.
          </p>

          <p className="text-sm text-background/60 mt-2">
            Privacy Policy: Data submitted is used only for project
            communication. Contact us for data deletion.
          </p>

          <p className="text-sm text-background/60 mt-2">
            Cookies may be used for analytics & user experience enhancement.
          </p>

          <p className="text-sm text-background/60 mt-4">
            © 2025 PropYouLike. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
