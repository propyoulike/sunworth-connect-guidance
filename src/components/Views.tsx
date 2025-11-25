import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useRef } from "react";

interface ViewsProps {
  onCtaClick: () => void;
}

const Views = ({ onCtaClick }: ViewsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [AutoScroll({ playOnInit: true, stopOnInteraction: true, speed: 1 })]
  );

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedView = useRef(false);

  // Track Section View
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (isVisible && !hasTrackedView.current) {
          hasTrackedView.current = true;

          // GA4
          gtag("event", "section_view", {
            event_category: "engagement",
            event_label: "Views Section",
          });

          // Meta Pixel
          fbq("trackCustom", "ViewsSectionViewed");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const viewImages = [
    { src: "/images/views/elevation-1.webp", title: "Provident Sunworth Elevation" },
    { src: "/images/views/elevation-2.webp", title: "Provident Sunworth Elevation View" },
    { src: "/images/views/night-view-1.webp", title: "Provident Sunworth Night View" },
    { src: "/images/views/night-view-2.webp", title: "Clubhouse Night View" },
    { src: "/images/views/viewing-deck.webp", title: "Viewing Deck" },
    { src: "/images/views/tree-house.webp", title: "Tree House View" },
    { src: "/images/views/clubhouse.webp", title: "Clubhouse Aerial View" },
  ];

  // Track WhatsApp click
  const handleWhatsAppClick = () => {
    gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: "WhatsApp – Views Section",
    });

    fbq("track", "Contact");
  };

  // Track CTA click
  const handleCtaClick = () => {
    gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: "CTA – Views Section",
    });

    fbq("track", "Lead");

    onCtaClick();
  };

  // Track Image Click
  const handleImageClick = (title: string) => {
    gtag("event", "image_click", {
      event_category: "engagement",
      event_label: title,
    });

    fbq("trackCustom", "ImageClicked", { image: title });
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Mesmerizing Views
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Wake up to views of 19 acres of lush greenery. Watch your children play
            in open spaces. Experience a green sanctuary with 7000 trees right at home.
          </p>
        </div>

        <div className="overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-6">
            {viewImages.map((view, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_45%]"
                style={{ boxShadow: "var(--shadow-strong)" }}
                onClick={() => handleImageClick(view.title)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={view.src}
                    alt={view.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold text-lg">{view.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
            onClick={handleCtaClick}
          >
            Get Personalised Guidance with FREE Site Visit
          </Button>

          <a
            href="https://wa.me/919379822010?text=Hi,%20I%27d%20like%20to%20know%20about%20available%20views%20at%20Provident%20Sunworth"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
          >
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full font-semibold"
            >
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Views;
