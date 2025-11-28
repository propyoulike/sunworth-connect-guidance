import { useState, useEffect } from "react";
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
   PRICING COMPONENTS (Left Column)
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
      "Charged as per IT Act",
      "Applied milestone-wise",
      "Ready-to-Move Units: No GST",
      "Under-Construction Units: 5% GST",
    ],
  },
  {
    title: "Other / Possession Charges",
    points: [
      "Advance Maintenance (Actuals)",
      "Infrastructure Charges (Electricity & Water)",
      "Corpus Fund – 0/-",
      "Legal Charges – approx ₹50,000",
      "Modifications (if applicable)",
      "Stamp / Share / Admin Fees (if applicable)",
      "GST on Other Charges – 18%",
    ],
  },
  {
    title: "Stamp Duty & Registration",
    points: [
      "Stamp Duty – 5%",
      "Cess – 10% on stamp duty",
      "Surcharge – 2% on stamp duty",
      "Registration – 2%",
      "Approx. total: 7.6% of Agreement Value",
    ],
  },
];

/* ----------------------------------------------------
   PAYMENT SCHEDULE (Right Column)
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
  {
    title: "Excavation Complete",
    percentage: "10%",
    expandable: false,
  },
  {
    title: "Foundation Complete",
    percentage: "15%",
    expandable: false,
  },
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
      "Flooring Complete – 5%",
      "External Windows – 5%",
      "Lift Erection – 5%",
    ],
  },
  {
    title: "Possession",
    percentage: "5%",
    expandable: false,
  },
];

/* ----------------------------------------------------
   EMI CALCULATOR LOGIC
---------------------------------------------------- */
const calculateEMI = (amount: number, rate: number, tenure: number) => {
  const monthlyRate = rate / 12 / 100;
  const n = tenure * 12;
  return (
    (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
};

/* ----------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------- */
const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [openStage, setOpenStage] = useState<number | null>(null);

  // EMI widget state
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = calculateEMI(loan, rate, tenure);

  return (
    <section id="payment-plans" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">

        {/* ---------------- HEADER ---------------- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-5">
            Pricing & <span className="text-primary">Payment Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Transparent costing • Flexible milestones • RERA compliant
          </p>
        </div>

        {/* ---------------- TWO COLUMN GRID ---------------- */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT: PRICING */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Pricing Computation</h3>

            <div className="space-y-4">
              {priceComponents.map((item, i) => {
                const open = openPrice === i;

                return (
                  <div
                    key={i}
                    className="border rounded-2xl p-5 shadow-sm bg-card"
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

          {/* RIGHT: PAYMENT SCHEDULE */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Construction Payment Schedule
            </h3>

            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-2 w-1 bg-primary/30 rounded-full"></div>

              <div className="space-y-8">
                {paymentSchedule.map((stage, i) => {
                  const open = openStage === i;

                  return (
                    <div key={i} className="relative">
                      {/* Dot */}
                      <div className="absolute -left-1 top-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>

                      <button
                        className="w-full flex items-center justify-between"
                        onClick={() =>
                          stage.expandable
                            ? setOpenStage(open ? null : i)
                            : null
                        }
                      >
                        <span className="text-lg font-semibold">
                          {stage.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold">
                            {stage.percentage}
                          </span>
                          {stage.expandable &&
                            (open ? (
                              <ChevronUp className="text-primary" />
                            ) : (
                              <ChevronDown className="text-primary" />
                            ))}
                        </div>
                      </button>

                      {open && stage.items && (
                        <ul className="mt-4 ml-1 space-y-2 text-muted-foreground">
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

            {/* EMI CALCULATOR */}
            <div className="mt-10 p-6 rounded-2xl border shadow-sm bg-card">
              <h4 className="text-lg font-bold mb-4">EMI Calculator</h4>

              <label className="text-sm">Loan Amount (₹)</label>
              <input
                type="number"
                value={loan}
                onChange={(e) => setLoan(Number(e.target.value))}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="text-sm">Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="text-sm">Tenure (years)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full p-2 border rounded mb-4"
              />

              <div className="text-xl font-semibold mt-4">
                EMI: ₹{Math.round(emi).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <CTAButtons onFormOpen={onCtaClick} />
        </div>
      </div>
    </section>
  );
};

export default PaymentPlans;
