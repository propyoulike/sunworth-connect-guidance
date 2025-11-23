import { Button } from "@/components/ui/button";

interface AmenitiesProps {
  onCtaClick: () => void;
}

const Amenities = ({ onCtaClick }: AmenitiesProps) => {
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
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            50+ World-Class Amenities
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From sports to leisure, wellness to education—everything your family needs is right here. Your weekends stay inside the community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {amenityCategories.map((category, index) => (
            <div key={index} className="bg-card rounded-xl p-6" style={{ boxShadow: 'var(--shadow-medium)' }}>
              <h3 className="text-xl font-bold mb-4 text-foreground">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
            onClick={onCtaClick}
          >
            Get Personalised Guidance
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
