import { Home, Compass, Users, Smile } from "lucide-react";

const usps = [
  {
    icon: Home,
    title: "50+ Amenities",
    description: "From sports to leisure — your weekends stay inside the community.",
  },
  {
    icon: Compass,
    title: "Excellent Connectivity",
    description: "Quick access to the city while you come home to calm.",
  },
  {
    icon: Users,
    title: "Ready Community",
    description: "Families already living here — festivals, friendships, playgroups.",
  },
  {
    icon: Smile,
    title: "Kids-Friendly Living",
    description: "Safe, open spaces where children grow up outdoors, not on screens.",
  },
];

const EmotionalUSPs = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-4 text-foreground">
          Not just a flat. A childhood, a routine, a life you'll love.
        </h2>
        
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
