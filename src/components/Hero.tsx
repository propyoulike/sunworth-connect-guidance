import { Button } from "@/components/ui/button";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section className="container mx-auto px-4 pt-12 pb-20 lg:pt-20 lg:pb-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content - Desktop */}
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-foreground">
            Give your family a brighter everyday on Mysore Road.
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
            A 60-acre township where kids play in the open, weekends feel like a resort, and your 2 & 3 BHK home starts at <span className="font-semibold text-foreground">69.99 lakhs</span>. Live in a ready community with everything your family needs to grow.
          </p>
          
          <Button 
            size="lg" 
            className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold mb-4 w-full sm:w-auto"
            onClick={onCtaClick}
          >
            Get Personalised Guidance
          </Button>
          
          <p className="text-sm text-muted-foreground max-w-md">
            Talk to a trusted advisor — no pressure, just honest guidance on the best units, views and pricing.
          </p>
        </div>

        {/* Right Content - Video */}
        <div className="order-1 lg:order-2">
          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-strong)' }}>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/5PpgqAYGZHo?autoplay=0&mute=1&controls=1&loop=1&playlist=5PpgqAYGZHo"
                title="Provident Sunworth Video Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
