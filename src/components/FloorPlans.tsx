import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FloorPlansProps {
  onCtaClick: () => void;
}

const FloorPlans = ({ onCtaClick }: FloorPlansProps) => {
  const plans = [
    {
      title: "2 BHK",
      video: "https://www.youtube.com/shorts/z6-d5uB4rRA",
      description: "Thoughtful layouts with smart use of space",
      price: "₹69.99 L onwards"
    },
    {
      title: "3 BHK",
      video: "https://youtu.be/B2izuPDFLak",
      description: "Premium homes for growing families",
      price: "₹79.99 L onwards"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Floor Plans & Unit Plans
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every home at Provident Sunworth City is designed with attention to detail and functionality. Choose the plan that fits your family's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={plan.video.replace('youtu.be/', 'youtube.com/embed/').replace('shorts/', 'embed/')}
                  title={`${plan.title} Floor Plan`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{plan.title}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <p className="text-xl font-bold text-primary mb-4">{plan.price}</p>
              <Button 
                className="w-full btn-gradient rounded-full font-semibold"
                onClick={onCtaClick}
              >
                View Details & Pricing
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Get detailed floor plans and availability for your preferred configuration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
              onClick={onCtaClick}
            >
              Get Personalised Guidance
            </Button>
            <a 
              href="https://wa.me/919379822010?text=Hi,%20I%27d%20like%20to%20see%20floor%20plans%20for%20Provident%20Sunworth" 
              target="_blank" 
              rel="noopener noreferrer"
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
      </div>
    </section>
  );
};

export default FloorPlans;
