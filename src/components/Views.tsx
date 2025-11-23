import { Button } from "@/components/ui/button";

interface ViewsProps {
  onCtaClick: () => void;
}

const Views = ({ onCtaClick }: ViewsProps) => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Mesmerizing Views
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Wake up to views of 19 acres of lush greenery. Watch your children play in open spaces. Experience a green sanctuary with 7000 trees right at home.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden aspect-video" style={{ boxShadow: 'var(--shadow-strong)' }}>
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Green View</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video" style={{ boxShadow: 'var(--shadow-strong)' }}>
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Township View</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto text-center mb-12" style={{ boxShadow: 'var(--shadow-medium)' }}>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
            A Green Sanctuary in South Bengaluru
          </h3>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            With 19 acres dedicated to green covers and 7000+ trees, Provident Sunworth City offers the perfect balance of urban convenience and natural tranquility.
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
              href="https://wa.me/919379822010?text=Hi,%20I%27d%20like%20to%20know%20about%20available%20views%20at%20Provident%20Sunworth" 
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

export default Views;
