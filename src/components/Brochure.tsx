import { FileText } from "lucide-react";
import CTAButtons from "./CTAButtons";

interface BrochureProps {
  onCtaClick: () => void;
}

export default function BrochureSection({ onCtaClick }: BrochureProps) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ------------------- LEFT: PROVIDENT 3D BROCHURE STACK ------------------- */}
          <div className="w-full relative flex justify-center lg:justify-start">
            
            {/* BACK LAYER (shadow + rotation) */}
            <div
              className="
                absolute 
                -top-4 
                -left-8 
                w-[250px] lg:w-[320px]
                rotate-[4deg]
                scale-[0.97]
                opacity-90
                drop-shadow-2xl
                rounded-xl
                overflow-hidden
                hidden lg:block
              "
            >
              <img
                src="https://www.providenthousing.com/wp-content/uploads/2022/12/sunworthcity-brochure-cover-1.png"
                className="w-full h-auto object-cover"
                alt="Brochure Layer"
              />
            </div>

            {/* MAIN FRONT BROCHURE (prominent) */}
            <div
              className="
                w-[260px] lg:w-[360px]
                rotate-[-2deg]
                drop-shadow-[0_20px_70px_rgba(0,0,0,0.35)]
                bg-white
                rounded-xl 
                overflow-hidden
                relative
                z-10
                transition-transform
                hover:scale-[1.03]
              "
            >
              <img
                src="https://www.providenthousing.com/wp-content/uploads/2022/12/sunworthcity-brochure-cover-1.png"
                alt="Provident Brochure"
                className="w-full h-auto object-cover"
              />
            </div>

          </div>

          {/* ------------------- RIGHT: CONTENT + BUTTONS ------------------- */}
          <div className="flex flex-col justify-center">

            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-foreground">
              A lifestyle project <br />
              <span className="text-primary">that suits your needs.</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Explore detailed information on floor plans, amenities,
              pricing, layout plans and official project documents.
              Request the brochure and get complete project insights
              delivered instantly.
            </p>

            {/* CTA BUTTONS */}
            <div className="mb-10">
              <CTAButtons onFormOpen={onCtaClick} />
            </div>

            {/* DOCUMENT DOWNLOADS */}
            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-semibold mb-4">
                Official Documents
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href="https://www.providenthousing.com/wp-content/uploads/2022/12/Provident-Sunworth-City-RERA-Certificate-1.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                >
                  <FileText className="w-5 h-5" /> RERA Certificate
                </a>

                <a
                  href="https://www.providenthousing.com/wp-content/uploads/2022/12/MOEF-sunworth-city.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                >
                  <FileText className="w-5 h-5" /> MOEF Certificate
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
