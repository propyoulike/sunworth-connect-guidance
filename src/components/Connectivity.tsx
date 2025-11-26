import { MapPin, Train, Building2, ChevronDown, ChevronUp } from "lucide-react";
import CTAButtons from "./CTAButtons";
import { useState } from "react";

interface ConnectivityProps {
  onCtaClick: () => void;
}

const connectivityPoints = [
  {
    icon: MapPin,
    title: "NICE Road — 5 mins",
    description: "Easy access to key parts of the city",
    details: "The Outer Ring Road (NICE Road) connectivity provides seamless access to major IT hubs, business districts, and entertainment zones across Bangalore. Travel time to Electronic City is just 20 minutes, while Bannerghatta Road and Hosur Road are easily accessible within 15-20 minutes."
  },
  {
    icon: Train,
    title: "Upcoming Metro",
    description: "Easy future connectivity",
    details: "The upcoming metro station will be within 2 km of the project, connecting you to the entire city's metro network. This will provide hassle-free commuting to major employment hubs like Whitefield, MG Road, and the Airport. Expected completion by 2026."
  },
  {
    icon: Building2,
    title: "Global Village Tech Park",
    description: "Nearby for relaxed commutes",
    details: "One of Bangalore's premier IT parks is just 10 minutes away, housing over 100+ multinational companies including Dell, HP, Cisco, Tally, and many more. This means minimal commute time, better work-life balance, and more time for what truly matters - your family."
  },
];

const Connectivity = ({ onCtaClick }: ConnectivityProps) => {
  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);

  return (
    <section id="connectivity" ref={sectionRef} className="py-20 lg:py-28 scroll-mt-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-foreground">
            Close to everything that matters.<br />Just far enough from the noise.
          </h2>
          
          {/* Connectivity Video */}
          <div className="max-w-md mx-auto mt-8 rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-medium)' }}>
            <div className="aspect-[9/16]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/CY-IwT0sCv0"
                title="Connectivity Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          {connectivityPoints.map((point, index) => {
            const isExpanded = expandedPoint === index;
            return (
              <div key={index} className="bg-card rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-medium)' }}>
                <button
                  onClick={() => setExpandedPoint(isExpanded ? null : index)}
                  className="w-full p-6 text-center hover:bg-muted/50 transition-colors"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <point.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{point.title}</h3>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{point.description}</p>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 animate-accordion-down">
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.details}</p>
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

export default Connectivity;
