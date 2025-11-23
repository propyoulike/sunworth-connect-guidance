import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CustomerSpeaksProps {
  onCtaClick: () => void;
}

const CustomerSpeaks = ({ onCtaClick }: CustomerSpeaksProps) => {
  const testimonials = [
    {
      videoId: "k-dD6PtfrC8",
      title: "Resident Testimonial 1"
    },
    {
      videoId: "iwLw1Xu312s",
      title: "Resident Testimonial 2"
    },
    {
      videoId: "MxtoYCTGaCE",
      title: "Resident Testimonial 3"
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
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${testimonial.videoId}`}
                  title={testimonial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
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
