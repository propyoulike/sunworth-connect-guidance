import useEmblaCarousel from "embla-carousel-react";
import CTAButtons from "./CTAButtons";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AmenitiesProps {
  onCtaClick: () => void;
}

const Amenities = ({ onCtaClick }: AmenitiesProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedView = useRef(false);

  // ----------- Embla Carousel -----------
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [AutoScroll({ playOnInit: true, stopOnInteraction: true, speed: 1 })]
  );

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  // ----------- Tracking -----------
  const trackGA = (eventName: string, params: any = {}) => {
    if (typeof (window as any).gtag === "function")
      (window as any).gtag("event", eventName, params);
  };

  const trackMeta = (eventName: string) => {
    if (typeof (window as any).fbq === "function")
      (window as any).fbq("trackCustom", eventName);
  };

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackGA("section_view", {
            event_category: "engagement",
            event_label: "Amenities Section",
          });
          trackMeta("AmenitiesSectionViewed");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const amenityImages = [
    { src: "/images/amenities/basketball.jpg", title: "Basketball Court", description: "Professional court for sports enthusiasts" },
    { src: "/images/amenities/gym.jpg", title: "Gymnasium", description: "State-of-the-art fitness equipment" },
    { src: "/images/amenities/swimming-pool.jpg", title: "Swimming Pool", description: "Olympic-size pool for all ages" },
    { src: "/images/amenities/tennis.jpg", title: "Tennis Court", description: "Premium tennis facilities" },
    { src: "/images/amenities/playground.png", title: "Children's Play Area", description: "Safe and fun play zones for kids" },
    { src: "/images/amenities/library.jpg", title: "Library", description: "Quiet reading and study space" },
    { src: "/images/amenities/forest-walk.jpg", title: "Forest Walk", description: "Scenic nature trails within the township" },
    { src: "/images/amenities/cricket.webp", title: "Cricket Pitch", description: "Full-sized cricket ground" }
  ];

  const amenityCategories = [
    {
      title: "Sports & Fitness",
      items: ["Cricket Pitch", "Badminton Courts", "Tennis Courts", "Basketball Court", "Skating Rink", "Jogging Track", "Gym", "Yoga Deck"]
    },
    {
      title: "Recreation",
      items: ["Swimming Pool", "Kids Play Area", "Amphitheater", "Party Lawn", "Clubhouse", "Indoor Games", "Library", "Multipurpose Hall"]
    },
    {
      title: "Wellness & Nature",
      items: ["Reflexology Path", "Meditation Zone", "Outdoor Gym", "Senior Citizen Corner", "Pet Park", "Butterfly Garden", "7000+ Trees", "19 Acres Green Cover"]
    },
    {
      title: "Essential Services",
      items: ["Chrysalis High School", "Retail Commercial", "24/7 Security", "Power Backup", "Water Supply", "Maintenance Services"]
    }
  ];

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="py-20 lg:py-28 scroll-mt-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            50+ World-Class Amenities
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From sports to leisure, wellness to education—everything your family needs is right here.
            Your weekends stay inside the community.
          </p>
        </div>

        <div className="overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-6">
            {amenityImages.map((amenity, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%]" style={{ boxShadow: 'var(--shadow-strong)' }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={amenity.src} 
                    alt={amenity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl mb-2">{amenity.title}</h4>
                  <p className="text-white/90 text-base">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-7xl mx-auto">
          {amenityCategories.map((category, index) => {
            const isExpanded = expandedCategory === index;
            return (
              <div key={index} className="bg-card rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-medium)' }}>
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : index)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 animate-accordion-down">
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <CTAButtons onFormOpen={onCtaClick} />
      </div>
    </section>
  );
};

export default Amenities;
