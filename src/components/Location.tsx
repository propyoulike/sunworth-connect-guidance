import { useState, useRef, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import CTAButtons from "./CTAButtons";

interface LocationProps {
  onCtaClick: () => void;
}

export default function Location({ onCtaClick }: LocationProps) {
  const sections = [
    {
      title: "Schools",
      items: ["National Public School", "RV School", "BGS Public School"],
    },
    {
      title: "Hospitals",
      items: ["BGS Global Hospital", "Fortis Hospital", "Apollo Clinic"],
    },
    {
      title: "Connectivity",
      items: ["NICE Road", "Mysore Road Metro", "RR Nagar Junction"],
    },
  ];

  const [videoVisible, setVideoVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleIntersection = (ref: React.RefObject<HTMLDivElement>, setVisible: (value: boolean) => void) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
      observer.observe(ref.current);
    };

    handleIntersection(videoRef, setVideoVisible);
    handleIntersection(mapRef, setMapVisible);
  }, []);

  return (
    <section id="brochure" ref={sectionRef} className="w-full py-16 bg-muted/30 scroll-mt-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            The Perfect <span className="text-primary">Setting</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Everything you need within easy reach — schools, hospitals, connectivity & more.
          </p>
          <p className="mt-1 text-muted-foreground text-base italic">
            Life. Convenience. Future‑ready.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Video */}
          <div
            ref={videoRef}
            className="w-full h-[300px] md:h-[450px] animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {videoVisible && (
              <iframe
                src="https://www.youtube.com/embed/CY-IwT0sCv0?autoplay=1&mute=1&controls=0&loop=1&playlist=CY-IwT0sCv0&showinfo=0&rel=0"
                className="w-full h-full rounded-xl shadow-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Location Video"
              />
            )}
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="w-full h-[300px] md:h-[450px] animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {mapVisible && (
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1R_qhSGztiUmFoQY8idXKpXjU-kF60pQ&ehbc=2E312F"
                className="w-full h-full rounded-xl shadow-lg"
                loading="lazy"
                title="Location Map"
              />
            )}
          </div>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl shadow-md bg-card"
              >
                <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
                  {section.title}
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="list-disc ml-6 mb-4 text-muted-foreground space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Buttons */}
        <CTAButtons onFormOpen={onCtaClick} />
      </div>
    </section>
  );
}
