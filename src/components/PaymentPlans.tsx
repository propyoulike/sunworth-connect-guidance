import { CheckCircle } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

interface PaymentPlansProps {
  onCtaClick: () => void;
}

const PaymentPlans = ({ onCtaClick }: PaymentPlansProps) => {
  // Analytics wrapper
  const trackCTA = (label: string) => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "cta_click", {
        event_category: "payment_plans",
        event_label: label,
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", "PaymentPlanCTA", { label });
    }
  };

  const plans = [
    {
      title: "Construction-Linked Plan",
      description: "Pay as per construction progress — suitable for long-term buyers.",
      items: [
        "10% on booking + agreement",
        "10% on excavation",
        "10% on foundation",
        "10% on each slab completion",
        "Remaining on possession",
      ],
    },
    {
      title: "Down Payment Plan",
      description: "Higher upfront benefit with preferential pricing.",
      items: ["20% on booking", "75% within 45 days", "5% on possession"],
    },
    {
      title: "Pay On Possession Plan",
      description: "Low initial investment — ideal for buyers who want flexibility.",
      items: ["10% on booking", "10% within 30 days", "80% on possession"],
    },
  ];

  return (
    <section id="payment-plans" className="py-20 lg:py-28 bg-background scroll-mt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <img
            src="https://www.providenthousing.com/wp-content/themes/provident/assets/images/key-house-img.png"
            alt="Payment Plans Visual"
            className="mx-auto w-40 h-auto mb-6"
          />

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Flexible <span className="text-primary">Payment Plans</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            We know it takes a lot to make your dream home a reality.
            And we’re here to make it easy for you with flexible payment plans
            and complete loan guidance from all leading banks.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-md border hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-3 text-foreground">{plan.title}</h3>
              <p className="text-muted-foreground mb-5">{plan.description}</p>

              <ul className="space-y-3">
                {plan.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PRICE INCLUDES SECTION */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl font-bold mb-4">Price Includes</h3>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Total Sale Price including Government Levies consists of:
          </p>

          <ul className="space-y-4 text-foreground">
            <li>
              <strong>a. Sales Consideration</strong> comprising:
              <ul className="ml-6 list-disc mt-2 space-y-1">
                <li>Flat/Unit Cost (Size × Per SFT Rate)</li>
                <li>Club Development Charges (₹3 Lakhs)</li>
                <li>Premium Location Charges</li>
                <li>Floor Rise Charges</li>
                <li>Car Park Charges</li>
              </ul>
            </li>

            <li>
              <strong>b. GST on Sale Consideration</strong>
            </li>

            <li>
              <strong>c. Other / Possession Related Charges (Tentative)</strong> including:
              <ul className="ml-6 list-disc mt-2 space-y-1">
                <li>Advanced Maintenance Charges (on actuals)</li>
                <li>Provision of Infrastructure (Electricity & Water)</li>
                <li>Interest-Free Corpus Fund</li>
                <li>Legal Charges*</li>
                <li>Modifications (if applicable)</li>
                <li>Stamp Paper / Share Application (if applicable)</li>
                <li>GST on Other Charges</li>
              </ul>
            </li>

            <li>
              <strong>d. Stamp Duty & Registration</strong> (at actuals)
            </li>
          </ul>
        </div>

        {/* NOTES SECTION */}
        <div className="bg-muted/30 p-8 rounded-2xl max-w-5xl mx-auto mb-20 border">
          <h3 className="text-2xl font-bold mb-4">Important Notes</h3>

          <ol className="list-decimal ml-6 space-y-3 text-muted-foreground leading-relaxed">
            <li>
              Prices/details may change without prior notice. Revised pricing applies at booking time.
            </li>
            <li>
              GST & statutory charges are as applicable at the time of billing.
            </li>
            <li>
              Infrastructure, development, maintenance & legal charges are payable on demand.
            </li>
            <li>
              Electricity & water connection costs are payable at actuals.
            </li>
            <li>
              Stamp Duty & Registration charges payable during agreement & sale deed.
            </li>
            <li>Municipal taxes payable post-possession.</li>
            <li>All payments must follow the payment schedule.</li>
            <li>
              Purchaser must deduct TDS (if applicable) & provide Form 16B within 15 days.
            </li>
            <li>
              Delay in payment attracts interest + applicable GST.
            </li>
          </ol>
        </div>

        {/* PAYMENT SCHEDULE */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
            Detailed Construction-Linked Payment Schedule
          </h3>

          <ul className="list-decimal ml-6 space-y-3 text-muted-foreground leading-relaxed">
            <li>Initial Advance Amount – ₹2,00,000</li>
            <li>Balance Advance amount: 9% of Sale Consideration</li>
            <li>Post Agreement for Sale (within 30 days): 11%</li>
            <li>Completion of Excavation: 10%</li>
            <li>Completion of Foundation: 15%</li>
            <li>Completion of Ground/Stilt Slab: 7%</li>
            <li>Completion of 3rd Floor Slab: 7%</li>
            <li>Completion of 6th Floor Slab: 7%</li>
            <li>Completion of 9th Floor Slab: 7%</li>
            <li>Completion of Terrace Slab: 7%</li>
            <li>Completion of Flooring: 5%</li>
            <li>Installation of External Windows: 5%</li>
            <li>Commencement of Lift Erection: 5%</li>
            <li>Possession: 5%</li>
          </ul>

          <p className="text-sm mt-4 text-muted-foreground">
            * Billing is milestone-based (not sequential). GST & additional charges apply.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-16">
          <div
            onClick={() => trackCTA("Payment Plans CTA")}
            className="inline-block"
          >
            <CTAButtons onFormOpen={onCtaClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPlans;
