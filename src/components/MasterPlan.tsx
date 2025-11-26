import { useEffect, useRef } from "react";
import CTAButtons from "./CTAButtons";

interface MasterPlanProps {
  onCtaClick: () => void;
}

const MasterPlan = ({ onCtaClick }: MasterPlanProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedView = useRef(false);

  // ---------- GA / Meta Tracking ----------
  const trackView = () => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;

      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "section_view", {
          event_category: "engagement",
          event_label: "MasterPlan Section",
        });
      }
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("trackCustom", "MasterPlanSectionViewed");
      }
    }
  };

  const handleCtaClick = () => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "cta_click_masterplan", { section: "MasterPlan" });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
    onCtaClick();
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackView();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="masterplan" ref={sectionRef} className="py-20 lg:py-28 scroll-mt-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Master Plan
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A thoughtfully planned 60-acre township with 19 acres of green cover, 50+ amenities, school, and commercial spaces—all designed for integrated living.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-strong)' }}>
            <img 
              src="/images/master-plan.webp" 
              alt="Provident Sunworth City Master Plan" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">60</div>
            <p className="text-lg font-semibold mb-2">Acres</p>
            <p className="text-muted-foreground">Total township area</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">7000+</div>
            <p className="text-lg font-semibold mb-2">Trees</p>
            <p className="text-muted-foreground">Green sanctuary</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <p className="text-lg font-semibold mb-2">Amenities</p>
            <p className="text-muted-foreground">For every lifestyle</p>
          </div>
        </div>

        <CTAButtons onFormOpen={handleCtaClick} />
      </div>
    </section>
  );
};

export default MasterPlan;
