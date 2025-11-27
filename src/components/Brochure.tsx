import { FileText } from "lucide-react";
import CTAButtons from "./CTAButtons";

interface BrochureProps {
  onCtaClick: () => void;
}

export default function BrochureSection({ onCtaClick }: BrochureProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#f9f9f9] to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ------------ LEFT: WHITE CONTAINER + BROCHURE STACK ------------- */}
          <div className="relative flex justify-center lg:justify-start">

            <div className="
              bg-white
              rounded-3xl
              p-6 lg:p-10
              shadow-[0_20px_80px_rgba(0,0,0,0.15)]
              w-[90%] lg:w-[420px]
              relative
              overflow-hidden
            ">
              {/* Back Layer */}
              <img
                src="https://www.providenthousing.com/wp-content/uploads/2022/12/sunworthcity-brochure-cover-1.png"
                className="
                  absolute 
                  -top-6 
                  -left-6 
                  w-[200px] lg:w-[260px] 
                  opacity-70 
                  rotate-[6deg]
                  drop-shadow-xl
                "
                alt="Brochure Layer"
              />

              {/* Front Layer */}
              <img
                src="https://www.providenthousing.com/wp-content/uploads/2022/12/sunworthcity-brochure-cover-1.png"
                className="
                  relative 
                  w-full 
                  rounded-xl 
                  rotate-[-3deg] 
                  drop-shadow-[0_18px_50px_rgba(0,0,0,0.25)]
                "
                alt="Brochure Image"
              />
            </div>

          </div>

          {/* ---------------- RIGHT: TEXT + CTAs + DOCUMENTS ---------------- */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-foreground">
              A lifestyle project <span className="text-[#1B61D1]">that suits your needs.</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Explore detailed information on floor plans, amenities, pricing, 
              layout plans and official project documents. Request the brochure 
              and get complete project insights delivered instantly.
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
              <CTAButtons onFormOpen={onCtaClick} />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-semibold mb-4">Official Documents</h3>

              <div className="flex flex-col gap-3">
                <a
                  href="https://www.providenthousing.com/wp-content/uploads/2022/12/Provident-Sunworth-City-RERA-Certificate-1.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[#1B61D1] hover:underline font-medium"
                >
                  <FileText className="w-5 h-5" /> RERA Certificate
                </a>

                <a
                  href="https://www.providenthousing.com/wp-content/uploads/2022/12/MOEF-sunworth-city.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[#1B61D1] hover:underline font-medium"
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
