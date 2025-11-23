import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BrochureProps {
  onCtaClick: () => void;
}

const Brochure = ({ onCtaClick }: BrochureProps) => {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Download Our Brochure
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Get complete details about floor plans, amenities, pricing, and payment plans. Everything you need to make an informed decision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold"
              onClick={onCtaClick}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
            <a 
              href="https://wa.me/919379822010?text=Hi,%20please%20send%20me%20the%20brochure%20for%20Provident%20Sunworth" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-full font-semibold bg-white/10 hover:bg-white/20 border-white text-white"
              >
                Get via WhatsApp
              </Button>
            </a>
          </div>
          
          <p className="text-sm opacity-75">
            Or speak to an advisor who can guide you through all the details personally
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brochure;
