import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface BrochureProps {
  onCtaClick: () => void;
}

const Brochure = ({ onCtaClick }: BrochureProps) => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 lg:p-12 text-center mb-8" style={{ boxShadow: 'var(--shadow-strong)' }}>
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Download Brochure & Documents
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Get detailed information about floor plans, amenities, pricing, and official project documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="btn-gradient text-lg px-8 py-6 rounded-full font-semibold"
                onClick={onCtaClick}
              >
                Get Personalised Guidance with FREE Site Visit
              </Button>
              <a 
                href="https://wa.me/919379822010?text=Hi,%20I%27d%20like%20to%20download%20the%20Provident%20Sunworth%20brochure" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full font-semibold"
                >
                <a id="whatsapp-btn" href="https://wa.me/919379822010" target="_blank">
                  Chat on WhatsApp
                </a>
                </Button>
              </a>
            </div>

            <div className="border-t border-border pt-8 mt-8">
              <h3 className="text-xl font-bold mb-6 text-foreground">Official Documents</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://www.providenthousing.com/wp-content/uploads/2022/12/Provident-Sunworth-City-RERA-Certificate-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                >
                  <FileText className="w-5 h-5" />
                  RERA Certificate
                </a>
                <a 
                  href="https://www.providenthousing.com/wp-content/uploads/2022/12/MOEF-sunworth-city.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                >
                  <FileText className="w-5 h-5" />
                  MOEF Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brochure;
