import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface LocationProps {
  onCtaClick: () => void;
}

const Location = ({ onCtaClick }: LocationProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const nearbyPlaces = {
    commute: {
      items: [
        "NICE Road - 5 mins",
        "Mysore Road - Adjacent",
        "Kengeri Metro Station - 10 mins",
        "Upcoming Metro Station - Walking distance"
      ],
      details: "Excellent connectivity via NICE Road ensures quick access to all major business districts and IT hubs. The Outer Ring Road connects seamlessly to Electronic City, Whitefield, and Airport. Upcoming metro station will enhance public transport options significantly."
    },
    corporates: {
      items: [
        "Global Village Tech Park - 15 mins",
        "RR Nagar IT Hub - 20 mins",
        "Peenya Industrial Area - 25 mins",
        "Electronic City - 40 mins"
      ],
      details: "Proximity to major IT parks means shorter commutes and better work-life balance. Global Village Tech Park houses 100+ companies including Dell, HP, Cisco, and Tally. Easy access to multiple employment hubs across Bangalore."
    },
    hospitals: {
      items: [
        "Columbia Asia Hospital - 10 mins",
        "Manipal Hospital - 15 mins",
        "BGS Global Hospital - 20 mins",
        "Apollo Hospital - 25 mins"
      ],
      details: "Premium healthcare facilities within easy reach ensure peace of mind for your family's health needs. Multi-specialty hospitals with 24/7 emergency services, advanced diagnostic centers, and specialist consultations available nearby."
    },
    entertainment: {
      items: [
        "Orion Mall - 15 mins",
        "Mantri Square Mall - 20 mins",
        "PVR Cinemas - 15 mins",
        "Wonderla Amusement Park - 20 mins"
      ],
      details: "Weekend entertainment and family outings are just minutes away. From shopping at premium malls to movie experiences and thrilling amusement parks, everything is within comfortable reach for quality family time."
    },
    schools: {
      items: [
        "Chrysalis High School (On Campus)",
        "Delhi Public School - 10 mins",
        "Inventure Academy - 15 mins",
        "Gear Innovation School - 12 mins"
      ],
      details: "Top-rated schools in the vicinity ensure excellent educational opportunities for your children. Chrysalis High on campus means zero commute for primary education. Premium CBSE, ICSE, and IB schools nearby offering world-class education."
    },
    colleges: {
      items: [
        "PES University - 20 mins",
        "BMS College of Engineering - 25 mins",
        "MSRIT - 30 mins",
        "Christ University - 35 mins"
      ],
      details: "Reputed engineering and degree colleges nearby provide seamless educational progression. Access to Bangalore's premier institutions for undergraduate and postgraduate education, ensuring your children's academic future is secure."
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Perfect Setting: Location & Neighbourhood
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Strategically located on Mysore Road with excellent connectivity to all major IT hubs, schools, hospitals, and entertainment zones. Live close to everything that matters.
          </p>
        </div>

        {/* Location Video */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-strong)' }}>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/CY-IwT0sCv0"
                title="Provident Sunworth Location"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Nearby Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {Object.entries(nearbyPlaces).map(([key, data]) => {
            const isExpanded = expandedCategory === key;
            const icons: Record<string, string> = {
              commute: "🚗",
              corporates: "🏢",
              hospitals: "🏥",
              entertainment: "🎭",
              schools: "🎓",
              colleges: "🎓"
            };
            const titles: Record<string, string> = {
              commute: "Commute",
              corporates: "Corporates",
              hospitals: "Hospitals",
              entertainment: "Entertainment",
              schools: "Schools",
              colleges: "Colleges"
            };
            
            return (
              <div key={key} className="bg-card rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-medium)' }}>
                <div className="p-6">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : key)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {icons[key]} {titles[key]}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  <ul className="space-y-2">
                    {data.items.map((place, index) => (
                      <li key={index} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{place}</span>
                      </li>
                    ))}
                  </ul>
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border animate-accordion-down">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {data.details}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Address & Map */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-card rounded-2xl p-8 lg:p-12 mb-8" style={{ boxShadow: 'var(--shadow-medium)' }}>
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Address</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Provident Sunworth City<br />
                  Mysore Road, Kengeri<br />
                  Bengaluru, Karnataka 560060
                </p>
              </div>
            </div>
          </div>
         
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-strong)' }}>
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1R_qhSGztiUmFoQY8idXKpXjU-kF60pQ&ehbc=2E312F" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
              onClick={onCtaClick}
            >
              Get Personalised Guidance with FREE Site Visit
            </Button>
            <a 
              href="https://wa.me/919379822010?text=Hi,%20I%27d%20like%20to%20know%20more%20about%20the%20location%20and%20connectivity%20of%20Provident%20Sunworth" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-full font-semibold"
              >
              <a id="whatsapp-btn" href="https://wa.me/919379822010" target="_blank">
                Chat on WhatsApp
              </a>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
