import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

interface PaymentPlansProps {
  onCtaClick: () => void;
}

// ---------------------
// TRACKING HELPERS
// ---------------------
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

// ------------------------------
// GRID 1 — PRICE COMPUTATION
// ------------------------------
const priceComponents = [
  {
    title: "Sales Consideration",
    points: [
      "Flat/Unit Cost (Size × Base Rate)",
      "Club Development Charges – ₹3 Lakhs",
      "Premium Location Charges",
      "Floor Rise Charges",
      "Car Park Charges",
    ],
  },
  {
    title: "GST on Sale Consideration",
    points: [
      "Applicable as per IT Act",
      "Calculated on every milestone invoice",
    ],
  },
  {
    title: "Other / Possession Related Charges",
    points: [
      "Advance Maintenance (Actuals)",
      "Infrastructure Charges (Electricity & Water)",
      "Corpus Fund",
      "Legal Charges",
      "Modifications (if applicable)",
      "Stamp/Share/Registration Paper Fee (if any)",
      "GST on other charges",
    ],
  },
  {
    title: "Stamp Duty & Registration",
    points: [
      "Payable at actuals",
      "As per prevailing government rates",
    ],
  },
];

// ------------------------------
// GRID 2 — PAYMENT PLAN
// ------------------------------
const paymentStages = [
  {
    title: "Agreement Stage — 20%",
    percentage: "20%",
    expandable: true,
    items: [
      "Initial Advance – ₹2,00,000",
      "Balance Advance – 9%",
      "Post Agreement Execution – 11%",
    ],
  },
  {
    title: "Excavation of Building — 10%",
    percentage: "10%",
    expandable: false,
  },
  {
    title: "Foundation of Building — 15%",
    percentage: "15%",
    expandable: false,
  },
  {
    title: "Building Completion — 35%",
    percentage: "35%",
    expandable: true,
    items: [
      "Ground/Stilt Floor Slab – 7%",
      "Third Floor Slab – 7%",
      "Sixth Floor Slab – 7%",
      "Ninth Floor Slab – 7%",
      "Terrace Slab – 7%",
    ],
  },
  {
    title: "Unit Completion — 15%",
    percentage: "15%",
    expandable: true,
    items: [
      "Flooring Completion – 5%",
      "External Windows – 5%",
      "Lift Erection Start – 5%",
    ],
  },
  {
    title: "Possession — 5%",
    percentage: "5%",
    expandable: false,
  },
];

const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(null);
  const [openPaymentIndex, setOpenPaymentIndex] = useState<number | null>(null);

  return (
    <section id="payment-plans" className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-foreground">
            Pricing &{" "}
            <span className="text-primary">Payment Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent costing • Flexible payment structure • RERA compliant
          </p>
        </div>

        {/* GRID 1 — PRICE COMPUTATION */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-6">Price Computation</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceComponents.map((comp, i) => {
              const isOpen = openPriceIndex === i;
              return (
                <div
                  key={i}
                  className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <button
                    className="w-full flex items-center justify-between"
                    onClick={() => setOpenPriceIndex(isOpen ? null : i)}
                  >
                    <h4 className="text-xl font-semibold">{comp.title}</h4>
                    {isOpen ? (
                      <ChevronUp className="text-primary" />
                    ) : (
                      <ChevronDown className="text-primary" />
                    )}
                  </button>

                  {isOpen && (
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      {comp.points.map((p, idx) => (
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

        {/* GRID 2 — PAYMENT PLAN */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-6">Construction-Linked Payment Plan</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {paymentStages.map((stage, i) => {
              const isOpen = openPaymentIndex === i;

              return (
                <div
                  key={i}
                  className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <button
                    className="w-full flex items-center justify-between"
                    onClick={() =>
                      stage.expandable
                        ? setOpenPaymentIndex(isOpen ? null : i)
                        : null
                    }
                  >
                    <h4 className="text-xl font-semibold">{stage.title}</h4>
                    <span className="text-primary font-bold">{stage.percentage}</span>

                    {stage.expandable &&
                      (isOpen ? (
                        <ChevronUp className="text-primary ml-4" />
                      ) : (
                        <ChevronDown className="text-primary ml-4" />
                      ))}
                  </button>

                  {isOpen && stage.items && (
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      {stage.items.map((p, idx) => (
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

          <p className="text-sm text-muted-foreground mt-4">
            *GST extra as applicable. Billing is milestone-driven.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <CTAButtons onFormOpen={onCtaClick} />
        </div>
      </div>
    </section>
  );
};

export default PaymentPlans;
