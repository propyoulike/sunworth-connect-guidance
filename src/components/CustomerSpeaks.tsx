import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";

interface CustomerSpeaksProps {
  onCtaClick: () => void;
}

const CustomerSpeaks = ({ onCtaClick }: CustomerSpeaksProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [AutoScroll({ playOnInit: true, stopOnInteraction: true, speed: 0.8 })]
  );
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

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

        <div className="overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_70%]">
                <div className="bg-card rounded-2xl overflow-hidden h-full" style={{ boxShadow: 'var(--shadow-strong)' }}>
                  <div className="relative aspect-video group cursor-pointer">
                    {activeVideo === testimonial.videoId ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1`}
                        title={`${testimonial.name} Testimonial`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`}
                          alt={`${testimonial.name} Testimonial`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setActiveVideo(testimonial.videoId)}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
                        >
                          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-3 italic text-lg">"{testimonial.quote}"</p>
                    <p className="font-semibold text-foreground">— {testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
