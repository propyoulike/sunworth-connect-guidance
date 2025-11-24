import { Home, Compass, Users, Smile } from "lucide-react";

const usps = [
  {
    icon: Home,
    title: "50+ Amenities",
    description: "Sports & Fitness, leisure, Recreation, Wellness & Nature, Essential Services and everything in between — weekends feel complete within the community.",
  },
  {
    icon: Compass,
    title: "Excellent Connectivity",
    description: "Stay effortlessly linked to the city while coming home to peace and quiet.",
  },
  {
    icon: Users,
    title: "Ready Community",
    description: "A vibrant neighbourhood already buzzing with families, festivals, and friendships.",
  },
  {
    icon: Smile,
    title: "Kids-Friendly Living",
    description: "Safe, open, nature-rich spaces where kids grow up exploring, not scrolling.",
  },
];

const EmotionalUSPs = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-4 text-foreground">
          A Home That Inspires You To Live More.
        </h2>
        <p>
Provident Sunworth City is a 60-acre integrated township off Mysore Road–NICE Junction, offering 2 & 3 BHK homes with excellent connectivity and 19 acres of green landscapes. With 50+ amenities, a school, and retail spaces within the community, it’s designed for convenient, holistic living.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl card-hover text-center"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <usp.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{usp.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmotionalUSPs;
