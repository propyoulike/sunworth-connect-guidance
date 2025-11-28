import { CheckCircle } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";
import { useEffect } from "react";

interface PaymentPlansProps {
  onCtaClick: () => void;
}

// --------------------------
// UNIVERSAL TRACKING HELPERS
// --------------------------
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

const trackWhatsApp = (label: string) => {
  trackGA("whatsapp_click", label);
  trackMeta("WhatsAppClick", label);
};

const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  // Fade-in on scroll animation
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fade-up-active");
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Track section view
  useEffect(() => {
    const el = document.getElementById("payment-plans");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackGA("section_view", "PaymentPlansSection");
          trackMeta("SectionView", "PaymentPlansSection");
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ------------------------------
  // GRID 1: PRICE COMPUTATION
  // ------------------------------
  const pricingGrid = [
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
        "As per IT Act",
        "Applicable during each invoice",
      ],
    },
    {
      title: "Other / Possession Charges",
      points: [
        "Advanced Maintenance (Actuals)",
        "Infra Charges (Electricity & Water)",
        "Interest Free Corpus Fund",
        "Legal Charges",
        "Modifications (if applicable)",
        "Stamp / Share Fees (if any)",
        "GST on other charges",
      ],
    },
    {
      title: "Stamp Duty & Registration",
      points: [
        "Charged at actuals",
        "As per prevailing government rates",
      ],
    },
  ];

  // ------------------------------
  // GRID 2: PAYMENT OPTIONS
  // ------------------------------
  const paymentPlans = [
    {
      title: "Construction-Linked Plan",
      desc: "Best for long-term buyers who prefer milestone-based payments.",
      bullets: [
        "Pay as per construction progress",
        "Lower initial burden",
        "RERA compliant billing",
      ],
    },
    {
      title: "Down Payment Plan",
      desc: "Avail preferential pricing with a high upfront payment.",
      bullets: ["20% on booking", "75% within 45 days", "5% on possession"],
      note: "*Final amount depends on unit’s construction stage.",
    },
    {
      title: "Pay on Possession",
      desc: "Lowest initial cost with bulk payment at handover.",
      bullets: ["10% on booking", "10% within 30 days", "80% on possession"],
    },
  ];

  // ------------------------------
  // GRID 3: CONSTRUCTION TIMELINE
  // ------------------------------
  const constructionStages = [
    ["Initial Advance", "₹2,00,000"],
    ["Balance Advance (9%)", "9%"],
    ["Agreement (within 30 days)", "11%"],
    ["Completion of Excavation", "10%"],
    ["Completion of Foundation", "15%"],
    ["Ground/Stilt Slab", "7%"],
    ["3rd Floor Slab", "7%"],
    ["6th Floor Slab", "7%"],
    ["9th Floor Slab", "7%"],
    ["Terrace Slab", "7%"],
    ["Flooring Completion", "5%"],
    ["External Windows", "5%"],
    ["Lift Erection Start", "5%"],
    ["Possession", "5%"],
  ];

  // ------------------------------
  // CTA Handler
  // ------------------------------
  const handleCTA = (label: string) => {
    trackGA("cta_click", label);
    trackMeta("CTA_Clicked", label);
    onCtaClick();
  };

  return (
    <section
      id="payment-plans"
      className="
        py-24 lg:py-36 
        bg-gradient-to-b from-muted/40 via-background to-muted/20 
        relative overflow-hidden
      "
    >
      {/* Background noise texture */}
      <div className="absolute inset-0 bg-[url('/textures/soft-noise.png')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 fade-up">
          <img
            src="https://www.providenthousing.com/wp-content/themes/provident/assets/images/key-house-img.png"
            alt="Payment Plans"
            className="mx-auto w-40 h-auto mb-6 animate-floating"
          />

          <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-foreground">
            Pricing &
            <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              {" "}
              Payment Plans
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Transparent costing • Flexible payment options • Complete loan support
          </p>
        </div>

        {/* ------------------ */}
        {/* PRICING GRID       */}
        {/* ------------------ */}
        <div className="mb-24 fade-up">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Price Computation — What’s Included
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingGrid.map((item, index) => (
              <div
                key={index}
                className="
                  glass-card p-7 rounded-2xl border shadow-lg 
                  hover:shadow-2xl transition backdrop-blur-md
                "
                onClick={() => {
                  trackGA("pricing_card_click", item.title);
                  trackMeta("PricingCardClick", item.title);
                }}
              >
                <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle className="text-primary w-4 h-4 mt-1" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------ */}
        {/* PAYMENT OPTIONS    */}
        {/* ------------------ */}
        <div className="mb-24 fade-up">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Payment Options
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paymentPlans.map((plan, idx) => (
              <div
                key={idx}
                className="
                  glass-card p-10 rounded-3xl border shadow-lg 
                  hover:shadow-2xl transition backdrop-blur-md
                "
                onClick={() => {
                  trackGA("payment_plan_click", plan.title);
                  trackMeta("PaymentPlanClick", plan.title);
                }}
              >
                <h4 className="text-2xl font-bold mb-3">{plan.title}</h4>

                <p className="text-muted-foreground mb-5">{plan.desc}</p>

                <ul className="space-y-2 mb-4">
                  {plan.bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>

                {plan.note && (
                  <p className="text-xs text-muted-foreground">{plan.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------- */}
        {/* CONSTRUCTION PAYMENT TIMELINE   */}
        {/* ------------------------------- */}
        <div className="mb-24 fade-up">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Construction-Linked Payment Schedule
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {constructionStages.map(([stage, value], i) => (
              <div
                key={i}
                className="
                  bg-card border rounded-xl p-6 shadow-sm 
                  hover:shadow-lg transition pl-6 relative
                "
                onClick={() => {
                  trackGA("construction_stage_click", stage);
                  trackMeta("ConstructionStageClick", stage);
                }}
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-primary/80 rounded-l-xl"></div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{stage}</span>
                  <span className="text-primary font-semibold">{value}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            *GST extra. Billing happens milestone-wise.
          </p>
        </div>

        {/* ------------------ */}
        {/* CTA SECTION        */}
        {/* ------------------ */}
        <div className="text-center fade-up">
          <div
            onClick={() => handleCTA("Payment Plans CTA")}
            className="inline-block"
          >
            <CTAButtons onFormOpen={onCtaClick} />
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          .animate-floating {
            animation: float 5s ease-in-out infinite;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.75);
          }
          html.dark .glass-card {
            background: rgba(40, 40, 40, 0.45);
          }

          .fade-up { opacity: 0; transform: translateY(40px); transition: all 0.7s ease; }
          .fade-up-active { opacity: 1; transform: translateY(0); }
        `}
      </style>
    </section>
  );
};

export default PaymentPlans;
