import CTAButtons from "./CTAButtons";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section className="relative w-full">

      {/* --- Full Screen Hero Video --- */}
      <div className="relative w-full h-screen overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/5PpgqAYGZHo?autoplay=1&mute=1&controls=0&loop=1&playlist=5PpgqAYGZHo&showinfo=0&rel=0&modestbranding=1"
          title="Provident Sunworth City Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* --- CTA Below Video, Center-Aligned --- */}
      <div className="w-full bg-background py-10 flex justify-center">
        <div className="max-w-4xl">
          <CTAButtons onFormOpen={onCtaClick} variant="default" />
        </div>
      </div>

      {/* --- Quick Info Bar --- */}
      <div className="bg-muted/50 border-y border-border relative">
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
