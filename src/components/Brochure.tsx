import { FileText } from "lucide-react";
import CTAButtons from "./CTAButtons";
import { useEffect, useRef } from "react";

interface BrochureProps {
  onCtaClick: () => void;
}

const Brochure = ({ onCtaClick }: BrochureProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // GA4
          if (typeof (window as any).gtag === "function") {
            (window as any).gtag("event", "section_view", {
              event_category: "engagement",
              event_label: "Brochure Section",
            });
          }

          // Meta
          if (typeof (window as any).fbq === "function") {
            (window as any).fbq("trackCustom", "BrochureSectionViewed");
          }

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brochure"
      ref={sectionRef}
      className="py-20 lg:py-28 scroll-mt-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card rounded-2xl p-8 lg:p-12"
            style={{ boxShadow: "var(--shadow-strong)" }}
          >
            {/* ---------- LEFT IMAGE ---------- */}
            <div className="flex justify-center items-center">
              <img
                src="https://www.providenthousing.com/wp-content/uploads/2022/12/sunworthcity-brochure-cover-1.png"
                alt="Provident Brochure"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>

            {/* ---------- RIGHT CONTENT ---------- */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
                A lifestyle project <br />
                <span className="text-primary">that suits your needs.</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Explore detailed project insights, floor plans, amenities,
                pricing, master layout and official approvals. Download the
                brochure and get everything you need in one place.
              </p>

              {/* CTA */}
              <div className="mb-10">
                <CTAButtons onFormOpen={onCtaClick} />
              </div>

              {/* ---------- DOCUMENTS ---------- */}
              <div className="border-t border-border pt-8">
                <h3 className="text-xl font-bold mb-6 text-foreground">
                  Official Documents
                </h3>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.providenthousing.com/wp-content/uploads/2022/12/Provident-Sunworth-City-RERA-Certificate-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open RERA Certificate PDF"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                  >
                    <FileText className="w-5 h-5" /> RERA Certificate
                  </a>

                  <a
                    href="https://www.providenthousing.com/wp-content/uploads/2022/12/MOEF-sunworth-city.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open MOEF Certificate PDF"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                  >
                    <FileText className="w-5 h-5" /> MOEF Certificate
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Brochure;

