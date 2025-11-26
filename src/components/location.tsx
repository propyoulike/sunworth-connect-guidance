import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function PerfectSetting() {
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

  // Lazy-load: Load iframe only when visible
  const [videoVisible, setVideoVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer
  const handleIntersection = (ref: any, setVisible: any) => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
  };

  // Trigger observers
  setTimeout(() => handleIntersection(videoRef, setVideoVisible), 300);
  setTimeout(() => handleIntersection(mapRef, setMapVisible), 300);

  return (
    <section className="w-full py-16 bg-gray-50">
      {/* Heading */}
      <div className="text-left max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          The Perfect <span className="text-blue-600">Setting</span>
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Everything you need within easy reach — schools, hospitals, connectivity & more.
        </p>
        <p className="mt-1 text-gray-500 text-base italic">
          Life. Convenience. Future‑ready.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[300px] md:h-[450px] touch-pan-y"
        >
          {videoVisible && (
            <iframe
              src="https://www.youtube.com/embed/1MkdQ3HbV0U"
              className="w-full h-full rounded-xl shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </motion.div>

        {/* Map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[300px] md:h-[450px] touch-pan-y"
        >
          {mapVisible && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.430845743881!2d77.485!3d12.936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA5LjYiTiA3N8KwMjknMDYuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full rounded-xl shadow-lg"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>

      {/* Accordion with animations & mobile swipe-friendly */}
      <div className="max-w-4xl mx-auto mt-10">
        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-xl shadow-md bg-white touch-pan-y"
            >
              <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
                {section.title}
              </AccordionTrigger>

              <AccordionContent>
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="list-disc ml-6 mb-4 text-gray-600 space-y-1"
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
    </section>
  );
}
