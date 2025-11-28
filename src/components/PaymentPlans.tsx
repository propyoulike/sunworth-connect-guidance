import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

interface PaymentPlansProps {
  onCtaClick: () => void;
}

/* -------------------------------------------------------
   Tracking Helpers
------------------------------------------------------- */
const trackGA = (event: string, label: string) => {
  if ((window as any).gtag) {
    (window as any).gtag("event", event, {
      event_category: "engagement",
      event_label: label,
    });
  }
};
const trackMeta = (event: string, label: string) => {
  if ((window as any).fbq) {
    (window as any).fbq("trackCustom", event, { label });
  }
};

/* -------------------------------------------------------
   GRID 1 — PRICE COMPUTATION
------------------------------------------------------- */
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
      "Milestone-based billing",
      "Ready-to-Move: 0% GST",
      "Under-Construction: 5% GST",
    ],
  },
  {
    title: "Other / Possession Charges",
    points: [
      "Advance Maintenance – approx ₹6/SFT/month",
      "Electricity + Water Infra Charges",
      "Corpus Fund: 0/-",
      "Legal Charges: approx ₹50,000",
      "Stamp/Share Papers (if applicable)",
      "GST @ 18% on other charges",
    ],
  },
  {
    title: "Stamp Duty & Registration",
    points: [
      "Stamp Duty: 5%",
      "Cess: 10% of stamp duty",
      "Surcharge: 2% of stamp duty",
      "Registration: 2%",
      "Approx 7.6% of Agreement Value",
      "Payable at actuals",
    ],
  },
];

/* -------------------------------------------------------
   GRID 2 — PAYMENT SCHEDULE (Vertical Timeline)
------------------------------------------------------- */
const paymentStages = [
  {
    title: "Agreement Stage",
    percent: "20%",
    expandable: true,
    items: [
      "Initial Advance – ₹2,00,000",
      "Balance Advance – 9%",
      "Agreement Execution – 11%",
    ],
  },
  {
    title: "Excavation Complete",
    percent: "10%",
    expandable: false,
  },
  {
    title: "Foundation Complete",
    percent: "15%",
    expandable: false,
  },
  {
    title: "Structure Completion",
    percent: "35%",
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
    title: "Unit Completion",
    percent: "15%",
    expandable: true,
    items: [
      "Flooring Completion – 5%",
      "External Windows – 5%",
      "Lift Erection – 5%",
    ],
  },
  {
    title: "Possession",
    percent: "5%",
    expandable: false,
  },
];

/* -------------------------------------------------------
   EMI Calculator Widget (Simple 3-variable EMI formula)
------------------------------------------------------- */
const calculateEMI = (principal: number, rate: number, tenure: number) => {
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);

  return Math.round(emi);
};

/* -------------------------------------------------------
   COMPONENT
------------------------------------------------------- */
const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [openSchedule, setOpenSchedule] = useState<number | null>(null);

  /* EMI State */
  const [loan, setLoan] = useState(6000000); // 60L default
  const [roi, setRoi] = useState(8.5); // 8.5%
  const [tenure, setTenure] = useState(240); // 20 years

  const emi = calculateEMI(loan, roi, tenure);

  return (
    <section id="payment-plans" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">

        {/* ---------------- HEADER ---------------- */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-3 text-foreground">
            Pricing & <span className="text-primary">Payment Plans</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Two transparent widgets • One simple decision
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* --------------------- MAIN 2-WIDGET LAYOUT ------------------------ */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ================= GRID 1 — PRICING =================== */}
          <div className="bg-card border rounded-2xl p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4">Pricing Computation</h3>

            {priceComponents.map((section, i) => {
              const open = openPrice === i;

              return (
                <div key={i} className="border rounded-xl p-4 mb-4">
                  <button
                    className="w-full flex justify-between items-center"
                    onClick={() => {
                      setOpenPrice(open ? null : i);
                      trackGA("price_open", section.title);
                      trackMeta("PriceOpen", section.title);
                    }}
                  >
                    <span className="font-semibold">{section.title}</span>
                    {open ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {open && (
                    <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                      {section.points.map((p, idx) => (
                        <li key={idx} className="flex gap-2">
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

          {/* ================= GRID 2 — PAYMENT SCHEDULE =================== */}
          <div className="bg-card border rounded-2xl p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4">Construction Payment Schedule</h3>

            <div className="relative pl-6 border-l-2 border-primary/40">
              {paymentStages.map((stage, i) => {
                const open = openSchedule === i;

                return (
                  <div key={i} className="mb-6 relative">
                    {/* Vertical timeline dot */}
                    <div className="w-3 h-3 bg-primary rounded-full absolute -left-[9px] top-1" />

                    <button
                      className="w-full flex justify-between items-center"
                      onClick={() =>
                        stage.expandable
                          ? setOpenSchedule(open ? null : i)
                          : null
                      }
                    >
                      <span className="font-semibold">{stage.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-bold">{stage.percent}</span>

                        {stage.expandable &&
                          (open ? <ChevronUp /> : <ChevronDown />)}
                      </div>
                    </button>

                    {open && stage.items && (
                      <ul className="mt-2 ml-2 space-y-2 text-muted-foreground text-sm">
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

        {/* ------------------------------------------------------------------ */}
        {/* ------------------------ EMI CALCULATOR -------------------------- */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-20 bg-card border rounded-2xl p-6 shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">EMI Calculator</h3>

          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <label className="font-semibold">Loan Amount (₹)</label>
              <input
                type="range"
                min={500000}
                max={20000000}
                step={50000}
                value={loan}
                onChange={(e) => setLoan(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm mt-1">₹ {loan.toLocaleString()}</p>
            </div>

            {/* ROI */}
            <div>
              <label className="font-semibold">Rate of Interest (%)</label>
              <input
                type="range"
                min={7}
                max={12}
                step={0.1}
                value={roi}
                onChange={(e) => setRoi(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm mt-1">{roi}%</p>
            </div>

            {/* Tenure */}
            <div>
              <label className="font-semibold">Tenure (Months)</label>
              <input
                type="range"
                min={60}
                max={360}
                step={12}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm mt-1">{tenure} months</p>
            </div>

            {/* EMI Result */}
            <div className="text-center text-2xl font-bold text-primary mt-6">
              EMI: ₹ {emi.toLocaleString()}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <CTAButtons onFormOpen={onCtaClick} />
        </div>
      </div>
    </section>
  );
};

export default PaymentPlans;
