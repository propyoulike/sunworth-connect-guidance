import { useState } from "react";
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
      "Flat/Unit Cost - Size × Base Rate",
      "Club Development Charges – ₹3 Lakhs",
      "Premium Location Charges: 0/-",
      "Floor Rise Charges: 0/-",
      "Car Park Charges: 0/-",
    ],
  },
  {
    title: "GST on Sale Consideration",
    points: [
      "Applicable as per IT Act",
      "Paid on milestone invoices",
      "Ready-to-Move Homes: 0% GST",
      "Under-Construction Homes: 5% GST",
    ],
  },
  {
    title: "Other / Possession Charges",
    points: [
      "Advance Maintenance – approx ₹6 per SFT",
      "Infrastructure Charges (Electricity + Water)",
      "Corpus Fund: 0/-",
      "Legal Charges – approx ₹50,000",
      "Modifications (if applicable)",
      "Stamp/Share Papers (if applicable)",
      "GST @ 18% on other charges",
    ],
  },
  {
    title: "Stamp Duty & Registration",
    points: [
      "Stamp Duty – 5%",
      "Cess – 10% on stamp duty",
      "Surcharge – 2%",
      "Registration Fee – 2%",
      "Total typically ~7.6% of Agreement Value",
      "Payable at actuals",
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
    items: ["Initial Advance – ₹2,00,000", "Balance Advance – 9%", "Agreement Execution – 11%"],
  },
  {
    title: "Excavation Complete — 10%",
    percentage: "10%",
    expandable: false,
  },
  {
    title: "Foundation Complete — 15%",
    percentage: "15%",
    expandable: false,
  },
  {
    title: "Structure Complete — 35%",
    percentage: "35%",
    expandable: true,
    items: [
      "Ground/Stilt Slab – 7%",
      "3rd Floor Slab – 7%",
      "6th Floor Slab – 7%",
      "9th Floor Slab – 7%",
      "Terrace Slab – 7%",
    ],
  },
  {
    title: "Unit Completion — 15%",
    percentage: "15%",
    expandable: true,
    items: ["Flooring – 5%", "External Windows – 5%", "Lift Erection – 5%"],
  },
  {
    title: "Possession — 5%",
    percentage: "5%",
    expandable: false,
  },
];

const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(null);
  const [openPayIndex, setOpenPayIndex] = useState<number | null>(null);

  return (
    <section id="payment-plans" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-3 text-foreground">
            Pricing & <span className="text-primary">Payment Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Transparent pricing • Simple breakdown • RERA compliant
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* GRID 1: PRICE COMPUTATION */}
        {/* ---------------------------------------------------------------- */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">1. Price Computation</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceComponents.map((comp, index) => {
              const open = openPriceIndex === index;

              return (
                <div
                  key={index}
                  className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <button
                    className="w-full flex justify-between items-center"
                    onClick={() => {
                      setOpenPriceIndex(open ? null : index);
                      trackGA("price_component_click", comp.title);
                      trackMeta("PriceComponentClick", comp.title);
                    }}
                  >
                    <h4 className="font-semibold text-lg text-foreground">{comp.title}</h4>
                    {open ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {open && (
                    <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                      {comp.points.map((p, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
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

        {/* ---------------------------------------------------------------- */}
        {/* GRID 2: PAYMENT PLAN */}
        {/* ---------------------------------------------------------------- */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4">2. Construction-Linked Payment Schedule</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {paymentStages.map((stage, index) => {
              const open = openPayIndex === index;

              return (
                <div
                  key={index}
                  className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <button
                    className="w-full flex justify-between items-center"
                    onClick={() => {
                      if (stage.expandable) setOpenPayIndex(open ? null : index);
                      trackGA("payment_stage_click", stage.title);
                      trackMeta("PaymentStageClick", stage.title);
                    }}
                  >
                    <h4 className="font-semibold text-lg text-foreground">{stage.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold">{stage.percentage}</span>
                      {stage.expandable && (open ? <ChevronUp /> : <ChevronDown />)}
                    </div>
                  </button>

                  {open && stage.items && (
                    <ul className="mt-4 space-y-2 text-muted-foreground text-sm">
                      {stage.items.map((p, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            *GST extra as applicable. Billing is strictly milestone-based.
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
