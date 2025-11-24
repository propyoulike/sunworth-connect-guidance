import { MapPin, Train, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConnectivityProps {
  onCtaClick: () => void;
}

const connectivityPoints = [
  {
    icon: MapPin,
    title: "NICE Road — 5 mins",
    description: "Easy access to key parts of the city",
  },
  {
    icon: Train,
    title: "Upcoming Metro",
    description: "Easy future connectivity",
  },
  {
    icon: Building2,
    title: "Global Village Tech Park",
    description: "Nearby for relaxed commutes",
  },
];

const Connectivity = ({ onCtaClick }: ConnectivityProps) => {
  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
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
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 animate-accordion-down">
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
            onClick={onCtaClick}
          >
            Get Personalised Guidance with FREE Site Visit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Connectivity;
