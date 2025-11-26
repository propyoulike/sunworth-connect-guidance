import CTAButtons from "./CTAButtons";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section className="relative w-full">
      {/* --- Full Screen Hero Video --- */}
      <div className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden">

        {/* Background Video */}
        <iframe
          className="absolute top-0 left-0 w-full h-full z-0"
          src="https://www.youtube.com/embed/5PpgqAYGZHo?autoplay=1&mute=1&controls=0&loop=1&playlist=5PpgqAYGZHo&showinfo=0&rel=0&modestbranding=1"
          title="Provident Sunworth City Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

        {/* CTA + Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 lg:pb-20 z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">

              {/* CTA Buttons */}
              <CTAButtons onFormOpen={onCtaClick} variant="default" />
              
            </div>
          </div>
        </div>
      </div>

      {/* --- Quick Info Bar --- */}
      <div className="bg-muted/50 border-y border-border z-30 relative">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="text-lg font-bold text-foreground">₹69.99 L Onwards</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Typology</p>
              <p className="text-lg font-bold text-foreground">2 & 3 BHK</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="text-lg font-bold text-foreground">Mysore Road</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Size</p>
              <p className="text-lg font-bold text-foreground">60 Acres</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
