import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

interface PaymentPlansProps {
  onCtaClick: () => void;
}

/* ----------------------------------------------------
   TRACKING HELPERS
---------------------------------------------------- */
const trackGA = (event: string, label: string) => {
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", event, {
      event_category: "engagement",
      event_label: label,
    });
  }
};

const trackMeta = (event: string, label: string) => {
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", event, { label });
  }
};

/* ----------------------------------------------------
   PRICING GRID - LEFT SIDE
---------------------------------------------------- */
const priceComponents = [
  {
    title: "Sales Consideration",
    points: [
      "Flat/Unit Cost - Size × Base Rate",
      "Club Development Charges – ₹3,00,000",
      "Premium Location Charges – 0/-",
      "Floor Rise Charges – 0/-",
      "Car Park Charges – 0/-",
    ],
  },
  {
    title: "GST on Sale Consideration",
    points: [
      "Under-Construction Units: 5% GST",
      "Ready-to-Move Units: No GST",
      "Charged as per IT Act",
      "Applied milestone-wise",
    ],
  },
  {
    title: "Other / Possession Charges",
    points: [
      "Advance Maintenance (Actuals) roughly 6 per month per sft (SBA)",
      "Electricity & Water Infra Charges: Roughly 350 per sft (SBA)",
      "Corpus Fund – 0/-",
      "Legal Charges – approx ₹50,000",
      "Modifications (if applicable)",
      "Stamp / Admin Fees (if applicable)",
      "GST on Other Charges – 18%",
    ],
  },
  {
    title: "Stamp Duty & Registration",
    points: [
      "Approx. total: 7.6% of Agreement Value",
      "Stamp Duty – 5%",
      "Cess – 10% on stamp duty",
      "Surcharge – 2% on stamp duty",
      "Registration – 2%",
    ],
  },
];

/* ----------------------------------------------------
   PAYMENT SCHEDULE - RIGHT SIDE
---------------------------------------------------- */
const paymentSchedule = [
  {
    title: "Agreement Stage",
    percentage: "20%",
    expandable: true,
    items: [
      "Initial Advance – ₹2,00,000",
      "Balance Advance – 9%",
      "Post Agreement Execution – 11%",
    ],
  },
  { title: "Excavation Complete", percentage: "10%", expandable: false },
  { title: "Foundation Complete", percentage: "15%", expandable: false },
  {
    title: "Structure Completion",
    percentage: "35%",
    expandable: true,
    items: [
      "Ground/Stilt Slab – 7%",
      "Third Floor Slab – 7%",
      "Sixth Floor Slab – 7%",
      "Ninth Floor Slab – 7%",
      "Terrace Slab – 7%",
    ],
  },
  {
    title: "Unit Completion",
    percentage: "15%",
    expandable: true,
    items: [
      "Flooring Completion – 5%",
      "External Windows – 5%",
      "Lift Erection – 5%",
    ],
  },
  { title: "Possession", percentage: "5%", expandable: false },
];

/* ----------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------- */
const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [openStage, setOpenStage] = useState<number | null>(null);

  const lineRef = useRef<HTMLDivElement | null>(null);

  // animate the vertical timeline
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add("timeline-grow");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="payment-plans" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-5">
            Pricing & <span className="text-primary">Payment Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Transparent costing • Milestone-based • RERA compliant
          </p>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid lg:grid-cols-2 gap-14">

          {/* LEFT COLUMN — PRICING */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Pricing Computation</h3>

            <div className="space-y-4">
              {priceComponents.map((item, i) => {
                const open = openPrice === i;
                return (
                  <div
                    key={i}
                    className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                  >
                    <button
                      className="w-full flex justify-between"
                      onClick={() => setOpenPrice(open ? null : i)}
                    >
                      <span className="font-semibold text-lg">{item.title}</span>
                      {open ? (
                        <ChevronUp className="text-primary" />
                      ) : (
                        <ChevronDown className="text-primary" />
                      )}
                    </button>

                    {open && (
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        {item.points.map((p, idx) => (
                          <li key={idx} className="flex gap-2">
                            <CheckCircle className="text-primary w-4 h-4 mt-1" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN — PAYMENT SCHEDULE */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Construction Payment Schedule</h3>

            <div className="relative pl-8">

              {/* Vertical animated line */}
              <div
                ref={lineRef}
                className="absolute top-0 left-2 w-1 bg-primary/20 rounded-full timeline-line"
              ></div>

              <div className="space-y-10">
                {paymentSchedule.map((stage, i) => {
                  const open = openStage === i;
                  return (
                    <div
                      key={i}
                      className="relative fade-stage"
                    >
                      <button
                        className="w-full flex items-center justify-between"
                        onClick={() =>
                          stage.expandable ? setOpenStage(open ? null : i) : null
                        }
                      >
                        <span className="text-lg font-semibold">{stage.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold">{stage.percentage}</span>
                          {stage.expandable &&
                            (open ? (
                              <ChevronUp className="text-primary" />
                            ) : (
                              <ChevronDown className="text-primary" />
                            ))}
                        </div>
                      </button>

                      {open && stage.items && (
                        <ul className="mt-4 space-y-2 text-muted-foreground ml-1">
                          {stage.items.map((p, idx) => (
                            <li key={idx} className="flex gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-1" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <CTAButtons onFormOpen={onCtaClick} />
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        .timeline-line {
          height: 0%;
          transition: height 1.4s ease-out;
        }
        .timeline-grow {
          height: 100%;
        }
        .fade-stage {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUpStage 0.6s forwards ease-out;
        }
        @keyframes fadeUpStage {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PaymentPlans;
