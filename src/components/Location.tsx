import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CTAButtons from "@/components/CTAButtons";
import { ChevronDown } from "lucide-react";

interface Category {
  title: string;
  items: string[];
}

interface LocationProps {
  sectionId?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  videoUrl?: string;
  mapUrl?: string;
  categories?: Category[];
  ctaText?: string;
  onCtaClick: () => void;
}

export default function Location({
  sectionId = "location",
  title,
  subtitle,
  tagline,
  videoUrl,
  mapUrl,
  categories = [],
  ctaText,
  onCtaClick,
}: LocationProps) {
  const [videoVisible, setVideoVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const trackView = (label: string) => {
    window.gtag?.("event", "section_view", { event_label: label });
    window.fbq?.("trackCustom", `${label}Viewed`);
  };

  const observe = (
    ref: React.RefObject<HTMLDivElement>,
    setVisible: (v: boolean) => void,
    label: string
  ) => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          trackView(label);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(ref.current);
  };

  useEffect(() => {
    observe(videoRef, setVideoVisible, "LocationVideo");
    observe(mapRef, setMapVisible, "LocationMap");
  }, []);

  return (
    <section id={sectionId} className="w-full py-14 md:py-20 bg-muted/30 scroll-mt-32">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground text-lg">{subtitle}</p>}
          {tagline && <p className="mt-1 text-muted-foreground text-base italic">{tagline}</p>}
        </div>

        {/* Video + Map */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">

          <div ref={videoRef} className="w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden">
            {videoVisible && (
              <iframe
                src={videoUrl}
                className="w-full h-full rounded-xl shadow-lg"
                allow="autoplay"
                allowFullScreen
              />
            )}
          </div>

          <div ref={mapRef} className="w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden">
            {mapVisible && (
              <iframe
                src={mapUrl}
                className="w-full h-full rounded-xl shadow-lg"
                loading="lazy"
                allowFullScreen
              />
            )}
          </div>

        </div>

        {/* Categories Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          <Accordion type="single" collapsible>
            {categories.map((section, idx) => (
              <AccordionItem key={idx} value={`cat-${idx}`} className="border rounded-2xl bg-card">
                <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
                  {section.title}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <CTAButtons onFormOpen={onCtaClick} label={ctaText} />
        </div>

      </div>
    </section>
  );
}
