import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CTAButtons from "./CTAButtons";
import { ChevronDown } from "lucide-react";

interface LocationProps {
  onCtaClick: () => void;
}

export default function Location({ onCtaClick }: LocationProps) {
  const sections = [
    {
      title: "COMMUTE",
      items: [
        "Challaghatta Metro Station",
        "NICE Road Junction",
        "Kengeri Metro Station",
        "Kengeri Railway Station",
        "Kengeri Bus Terminal",
      ],
    },
    {
      title: "OFFICES",
      items: [
        "Global Village Tech Park",
        "Bidadi Industrial Estate",
        "Hindustan Coca Cola Beverages Ltd",
        "Toyota Kirloskar Motor Pvt. Ltd.",
      ],
    },
    {
      title: "HOSPITALS",
      items: [
        "Raja Rajeshwari Medical College and Hospital",
        "Raja Rajeshwari Dental College and Hospital",
        "BGS Hospital",
        "Medisol Hospital",
      ],
    },
    {
      title: "ENTERTAINMENT",
      items: [
        "Good Earth Eco Tourism",
        "Grips Gokarting and Clubbing",
        "Decathalon",
        "The Garden Asia Resort",
        "Gopalan Arcade Mall",
        "Wonderla",
      ],
    },
    {
      title: "SCHOOLS",
      items: [
        "National Public School",
        "Marigold International School",
        "Gurukula Vidya Peetha School",
        "Gopalan National School",
        "Tattva School",
      ],
    },
    {
      title: "COLLEGES",
      items: [
        "ACS College of Engineering",
        "RR College of Engineering",
        "Don-Bosco Institute of Technology",
        "RV College of Engineering",
        "Bangalore University",
      ],
    },
  ];

  const [videoVisible, setVideoVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // ---------- GA / Meta Tracking ----------
  const trackView = (sectionName: string) => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "section_view", {
        event_category: "engagement",
        event_label: sectionName,
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", `${sectionName}Viewed`);
    }
  };

  const handleCtaClick = () => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "cta_click_location", {
        section: "Location",
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
    onCtaClick();
  };

  // ---------- Lazy Load Video + Map ----------
  useEffect(() => {
    const observeSection = (
      ref: React.RefObject<HTMLDivElement>,
      setVisible: (value: boolean) => void,
      sectionName: string
    ) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisible(true);
            trackView(sectionName);
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(ref.current);
    };

    observeSection(videoRef, setVideoVisible, "LocationVideo");
    observeSection(mapRef, setMapVisible, "LocationMap");
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="w-full py-14 md:py-20 bg-muted/30 scroll-mt-32"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Perfect <span className="text-primary">Setting</span>
          </h2>

          <p className="mt-3 text-muted-foreground text-lg">
            Everything you need within easy reach — schools, hospitals,
            connectivity & more.
          </p>

          <p className="mt-1 text-muted-foreground text-base italic">
            Life. Convenience. Future-ready.
          </p>
        </div>

        {/* Video + Map Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* ---- VIDEO ---- */}
          <div
            ref={videoRef}
            className="w-full h-[260px] sm:h-[300px] md:h-[420px] rounded-xl overflow-hidden"
          >
            {videoVisible && (
              <iframe
                src="https://www.youtube.com/embed/CY-IwT0sCv0?autoplay=1&mute=1&controls=0&loop=1&playlist=CY-IwT0sCv0&rel=0&modestbranding=1"
                className="w-full h-full rounded-xl shadow-lg"
                title="Location Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>

          {/* ---- MAP ---- */}
          <div
            ref={mapRef}
            className="w-full h-[260px] sm:h-[300px] md:h-[420px] rounded-xl overflow-hidden"
          >
            {mapVisible && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.320637874632!2d77.46611847358743!3d12.887092216728457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae398a15854881%3A0xd22d0d3f18b5ebb4!2sProvident%20Sunworth%20City!5e0!3m2!1sen!2sin!4v1764218094401!5m2!1sen!2sin"
                className="w-full h-full rounded-xl shadow-lg"
                loading="lazy"
                title="Location Map"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          <Accordion type="single" collapsible className="space-y-3">
            {sections.map((section, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-2xl bg-card shadow-sm"
              >
                <AccordionTrigger className="px-4 py-3 flex justify-between items-center text-base md:text-lg font-semibold hover:no-underline">
                  <span>{section.title}</span>

                  {/* Slim Animated Chevron */}
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 accordion-trigger-rotate" />
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="list-disc ml-6 mb-4 mt-1 text-sm md:text-base text-muted-foreground space-y-1 animate-in fade-in slide-in-from-top-1 duration-300">
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
        <div className="max-w-3xl mx-auto">
          <CTAButtons onFormOpen={handleCtaClick} />
        </div>
      </div>
    </section>
  );
}
