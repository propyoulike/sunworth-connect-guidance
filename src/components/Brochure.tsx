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
          if (typeof (window as any).gtag === "function") {
            (window as any).gtag("event", "section_view", {
              event_category: "engagement",
              event_label: "Brochure Section",
            });
          }

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
      className="py-16 lg:py-24 scroll-mt-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* CONTENT BOX */}
          <div
            className="bg-card rounded-2xl p-6 sm:p-8 lg:p-12"
            style={{ boxShadow: "var(--shadow-strong)" }}
          >

            {/* ⬅️ IMAGE + TEXT SIDE BY SIDE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* LEFT IMAGE */}
              <div className="w-full">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="https://www.providenthousing.com/wp-content/uploads/2022/12/sunworthcity-brochure-cover-1.png"
                    alt="Provident Brochure"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* RIGHT SECTION (TEXT + DOCUMENT LINKS) */}
              <div className="flex flex-col justify-center">

                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
                  A lifestyle project <br />
                  <span className="text-primary">that suits your needs.</span>
                </h2>

                <p className="text-lg text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
                  Explore detailed information on floor plans, amenities,
                  pricing, layout plans and official project documents. Request
                  the brochure and get complete project insights delivered instantly.
                </p>

                {/* DOCUMENTS */}
                <div className="pt-4">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    Official Documents
                  </h3>

                  <div className="flex flex-col gap-3">

                    <a
                      href="https://www.providenthousing.com/wp-content/uploads/2022/12/Provident-Sunworth-City-RERA-Certificate-1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                    >
                      <FileText className="w-5 h-5" /> RERA Certificate
                    </a>

                    <a
                      href="https://www.providenthousing.com/wp-content/uploads/2022/12/MOEF-sunworth-city.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                    >
                      <FileText className="w-5 h-5" /> MOEF Certificate
                    </a>

                  </div>
                </div>
              </div>
            </div>

            {/* ⬇️ FULL-WIDTH CTA BAR */}
            <div className="mt-10 pt-8 border-t border-border w-full">
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <CTAButtons onFormOpen={onCtaClick} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Brochure;
