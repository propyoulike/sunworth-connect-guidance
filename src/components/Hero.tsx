import { Button } from "@/components/ui/button";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section className="relative w-full">
      {/* Full Width Video Hero */}
      <div className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/5PpgqAYGZHo?autoplay=1&mute=1&controls=0&loop=1&playlist=5PpgqAYGZHo&showinfo=0&rel=0"
          title="Provident Sunworth City Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 lg:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
               {/* 
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
                The City Of More
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-3xl">
                South Bengaluru's largest township sprawling over 60 acres. 2 & 3 BHK homes starting at <span className="font-bold">₹69.99 lakhs</span>. Live where 7000 trees meet modern living.
              </p>
               */}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
                  onClick={onCtaClick}
                >
                  Get Personalised Guidance
                </Button>
                
                <a 
                  href="https://wa.me/919379822010?text=Hi,%20I%27m%20interested%20in%20Provident%20Sunworth%20City" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 py-6 rounded-full font-semibold bg-white/90 hover:bg-white text-foreground border-white"
                  >
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-muted/50 border-y border-border">
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
