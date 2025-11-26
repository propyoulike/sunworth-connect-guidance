import { Card } from "@/components/ui/card";
import CTAButtons from "./CTAButtons";
import { useEffect, useRef } from "react";

interface FloorPlansProps {
  onCtaClick: () => void;
}

const FloorPlans = ({ onCtaClick }: FloorPlansProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedView = useRef(false);

  // ---------- Tracking Functions ----------
  const trackGA = (eventName: string, params: any = {}) => {
    if (typeof (window as any).gtag === "function") (window as any).gtag("event", eventName, params);
  };

  const trackMeta = (eventName: string) => {
    if (typeof (window as any).fbq === "function") (window as any).fbq("track", eventName);
  };

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (isVisible && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackGA("section_view", { event_category: "engagement", event_label: "FloorPlans Section" });
          if (typeof (window as any).fbq === "function") (window as any).fbq("trackCustom", "FloorPlansSectionViewed");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCtaClick = () => {
    trackGA("cta_click_floorplans", { section: "FloorPlans" });
    trackMeta("Lead");
    onCtaClick();
  };

  const handleVideoPlay = (title: string) => {
    trackGA("floorplan_video_play", { section: "FloorPlans", video: title });
  };

  const plans = [
    {
      title: "2 BHK",
      image: "/images/2bhk-plan.webp",
      video: "https://www.youtube.com/shorts/z6-d5uB4rRA",
      description: "Thoughtful layouts with smart use of space",
      price: "Starting at ₹69.99 L*"
    },
    {
      title: "3 BHK Regular",
      image: "/images/3bhk-plan.webp",
      video: "https://youtube.com/shorts/QEtUBt1Ac3U",
      description: "Premium homes for growing families",
      price: "Starting at ₹79.99 L*"
    },
    {
      title: "3 BHK Royale",
      image: "/images/3bhk-royale.webp",
      video: "https://youtu.be/B2izuPDFLak",
      description: "Luxurious space with premium finishes",
      price: "Premium pricing - contact us"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Floor Plans & Unit Plans
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every home at Provident Sunworth City is designed with attention to detail and functionality. Choose the plan that fits your family's needs.
          </p>
        </div>

        {/* Floor Plan Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              {/* Floor Plan Image */}
              <div className="rounded-lg overflow-hidden mb-6 bg-muted">
                <img 
                  src={plan.image} 
                  alt={`${plan.title} Floor Plan`} 
                  className="w-full h-auto" 
                />
              </div>

              {/* Walkthrough Video */}
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={plan.video.replace('youtu.be/', 'youtube.com/embed/').replace('shorts/', 'embed/')}
                  title={`${plan.title} Walkthrough`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  onLoad={() => handleVideoPlay(plan.title)}
                />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-foreground">{plan.title}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <p className="text-xl font-bold text-primary mb-4">{plan.price}</p>

              <CTAButtons onFormOpen={handleCtaClick} variant="compact" />
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Get detailed floor plans and availability for your preferred configuration
          </p>
          <CTAButtons onFormOpen={handleCtaClick} />
        </div>
      </div>
    </section>
  );
};

export default FloorPlans;
