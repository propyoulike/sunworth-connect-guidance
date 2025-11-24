import { Button } from "@/components/ui/button";

interface CustomerSpeaksProps {
  onCtaClick: () => void;
}

const CustomerSpeaks = ({ onCtaClick }: CustomerSpeaksProps) => {
  const testimonials = [
    {
      name: "Resident Family 1",
      videoId: "k-dD6PtfrC8",
      quote: "The amenities and green spaces are exactly what we were looking for. Our kids love it here!"
    },
    {
      name: "Resident Family 2",
      videoId: "iwLw1Xu312s",
      quote: "Great connectivity and peaceful environment. Best decision we made for our family."
    },
    {
      name: "Resident Family 3",
      videoId: "MxtoYCTGaCE",
      quote: "The construction quality and attention to detail is impressive. Highly recommended!"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            What Our Residents Say
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real families sharing their real experiences at Provident Sunworth City
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-strong)' }}>
              <div className="aspect-video bg-muted cursor-pointer group relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${testimonial.videoId}`}
                  title={`${testimonial.name} Testimonial`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-3 italic text-lg">"{testimonial.quote}"</p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
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
            Get Personalised Guidance with FREE Site Visit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerSpeaks;
