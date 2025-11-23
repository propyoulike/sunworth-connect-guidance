import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CustomerSpeaksProps {
  onCtaClick: () => void;
}

const CustomerSpeaks = ({ onCtaClick }: CustomerSpeaksProps) => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      home: "3 BHK Owner",
      text: "The best decision we made for our family. The kids love playing outdoors, and the community is wonderful. Everything we need is right here.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      home: "2 BHK Owner",
      text: "Amazing connectivity to the city while living in such a green environment. The school on campus was a huge plus for us.",
      rating: 5
    },
    {
      name: "Anil Reddy",
      home: "3 BHK Owner",
      text: "The amenities are truly world-class. We haven't had to step out for recreation in months. It's like living in a resort.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            What Our Residents Say
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join a thriving community of happy families who have made Provident Sunworth City their home.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.home}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to join our community?
          </p>
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

export default CustomerSpeaks;
