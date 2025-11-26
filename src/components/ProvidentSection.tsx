import { Building2, Users, Award, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: TrendingUp, label: "Years Experience", value: "16+" },
  { icon: Users, label: "Happy Customers", value: "55,000+" },
  { icon: Building2, label: "Million Sq.Ft. Delivered", value: "12.8" },
  { icon: Award, label: "Cities", value: "9" },
];

const ProvidentSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section id="providentsection" ref={sectionRef} className="py-20 lg:py-28 scroll-mt-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              About Provident Housing
            </h2>
            <p className="text-lg text-muted-foreground">
              A trusted name in affordable luxury living
            </p>
          </div>

          {/* Brief Overview - Always Visible */}
          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p className="text-center lg:text-left leading-relaxed">
              Provident Housing is a subsidiary of the prestigious Puravankara Group, delivering quality homes at affordable prices since 2008. With a focus on value, transparency, and customer satisfaction, Provident has become one of India's most trusted residential brands.
            </p>
          </div>

          {/* Expandable Content */}
          {isExpanded && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Since its inception, Provident Housing has been committed to making quality housing accessible to the aspiring middle class. With over 50,000 happy families across India, the brand has set benchmarks in the affordable housing segment without compromising on quality or design.
                </p>

                <p>
                  Every Provident project is built with meticulous attention to detail, sustainable practices, and modern amenities that enhance the living experience. From thoughtfully designed floor plans to world-class facilities, Provident ensures that your investment translates into lasting value and comfort.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-muted/50 rounded-xl">
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Puravankara Group Legacy */}
              <div className="p-8 bg-muted/50 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Backed by Puravankara Group's Legacy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Provident Housing is the value homes brand under the prestigious Puravankara Group, which has been building landmark properties since 1975. With over 48 years of excellence, Puravankara Group is known for its commitment to quality, timely delivery, and customer satisfaction. This rich legacy ensures that every Provident home meets the highest standards of construction and design.
                </p>
              </div>
            </div>
          )}

          {/* Expand/Collapse Button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full font-semibold"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-2 h-5 w-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-5 w-5" />
                  Read More About Provident
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvidentSection;
