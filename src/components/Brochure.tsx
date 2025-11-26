import { FileText } from "lucide-react";
import CTAButtons from "./CTAButtons";

interface BrochureProps {
  onCtaClick: () => void;
}

const Brochure = ({ onCtaClick }: BrochureProps) => {


  return (
    <section id="brochure" className="py-20 lg:py-28 scroll-mt-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="bg-card rounded-2xl p-8 lg:p-12 text-center mb-8"
            style={{ boxShadow: "var(--shadow-strong)" }}
          >
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Download Brochure & Documents
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Get detailed information about floor plans, amenities, pricing, and official project documents.
            </p>

            <div className="mb-8">
              <CTAButtons onFormOpen={onCtaClick} />
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
