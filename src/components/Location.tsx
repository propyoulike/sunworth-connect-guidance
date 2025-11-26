import { useState, useRef, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";
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
    <section className="w-full py-16 bg-muted/30">
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
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[300px] md:h-[450px]"
          >
            {videoVisible && (
              <iframe
                src="https://www.youtube.com/embed/1MkdQ3HbV0U"
                className="w-full h-full rounded-xl shadow-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Location Video"
              />
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[300px] md:h-[450px]"
          >
            {mapVisible && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.430845743881!2d77.485!3d12.936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA5LjYiTiA3N8KwMjknMDYuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full rounded-xl shadow-lg"
                loading="lazy"
                title="Location Map"
              />
            )}
          </motion.div>
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
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="list-disc ml-6 mb-4 text-muted-foreground space-y-1"
                  >
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </motion.ul>
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
