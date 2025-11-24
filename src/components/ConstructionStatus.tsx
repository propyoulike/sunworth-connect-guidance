import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, Clock } from "lucide-react";

interface ConstructionStatusProps {
  onCtaClick: () => void;
}

const ConstructionStatus = ({ onCtaClick }: ConstructionStatusProps) => {
  const towers = [
    {
      name: "Tower 4J",
      image: "/images/construction/tower-4j.png",
      status: [
        "2nd floor roof slab completed",
        "3rd floor roof slab shuttering & reinforcements work in progress"
      ],
      achieved: ["Completion of GF/Stilt floor roof slab"],
      upcoming: ["Completion of 3rd floor roof slab"]
    },
    {
      name: "Tower 4H",
      image: "/images/construction/tower-4h.png",
      status: [
        "1st floor Roof slab shuttering work in progress",
        "1st floor Roof slab reinforcement, work in progress"
      ],
      achieved: ["Completion of Ground/stilt floor roof slab"],
      upcoming: ["Completion of 3rd floor Roof slab"]
    },
    {
      name: "Tower 4G",
      image: "/images/construction/tower-4g.png",
      status: [
        "Completion of Ground/stilt floor roof slab",
        "1st floor roof slab shuttering & Reinforcements work in progress"
      ],
      achieved: ["Completion of Ground/stilt floor roof slab"],
      upcoming: ["Completion of 3rd floor roof slab"]
    },
    {
      name: "Tower 4F",
      image: "/images/construction/tower-4f.png",
      status: [
        "Basement slab concreting completed",
        "Ground floor Shear wall concreting work in progress"
      ],
      achieved: ["Completion of Foundation"],
      upcoming: ["Completion of ground / stilt roof slab"]
    },
    {
      name: "Tower 4E",
      image: "/images/construction/tower-4e.png",
      status: [
        "Basement shuttering & reinforcement work in progress"
      ],
      achieved: ["Completion of Foundation"],
      upcoming: ["Completion of Ground /stilt floor roof slab"]
    },
    {
      name: "Tower 4D",
      image: "/images/construction/tower-4d.png",
      status: [
        "Foundation completed",
        "Plinth beam work in progress"
      ],
      achieved: ["Completion of foundation"],
      upcoming: ["Completion of Ground /stilt floor roof slab"]
    },
    {
      name: "Tower 4C",
      image: "/images/construction/tower-4c.png",
      status: [
        "Excavation work completed"
      ],
      achieved: ["Completion of foundation"],
      upcoming: ["Completion of Ground /stilt floor roof slab"]
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            PHASE IV
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Construction Status Report
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Track the real-time progress of Phase IV construction. Transparency you can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {towers.map((tower, index) => (
            <div key={index} className="bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow" style={{ boxShadow: 'var(--shadow-medium)' }}>
              <div className="aspect-video overflow-hidden bg-muted">
                <img 
                  src={tower.image} 
                  alt={`${tower.name} Construction Progress`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">{tower.name}</h3>
                </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">Tower Status</h4>
                <ul className="space-y-2">
                  {tower.status.map((item, i) => (
                    <li key={i} className="text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase">Milestones Achieved</h4>
                </div>
                <ul className="space-y-1">
                  {tower.achieved.map((item, i) => (
                    <li key={i} className="text-sm text-foreground">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase">Upcoming Milestones</h4>
                  </div>
                  <ul className="space-y-1">
                    {tower.upcoming.map((item, i) => (
                      <li key={i} className="text-sm text-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
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

export default ConstructionStatus;
