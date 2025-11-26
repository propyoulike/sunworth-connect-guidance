import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  openLeadForm: () => void;
}

const FAQ = ({ openLeadForm }: FAQProps) => {
  // -------- Smooth Scroll Helper --------
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Track scroll-to event
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "scroll_to_section", {
          event_category: "engagement",
          event_label: id,
        });
      }
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("trackCustom", "ScrollToSection", { section: id });
      }
    }
  };

  const trackFaqOpen = (question: string) => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "faq_open", {
        event_category: "engagement",
        event_label: question,
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", "FAQOpened", { question });
    }
  };

  const trackCtaClick = (label: string) => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: label,
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", "CTAClicked", { label });
    }
  };

  const FAQs = [
    {
      question: "What is the price range for apartments at Provident Sunworth City?",
      answer: (
        <div>
          <ul className="list-disc list-inside space-y-1">
            <li>2 BHK: Starting at ₹69.99 Lakhs*</li>
            <li>3 BHK Regular: Starting at ₹79.99 Lakhs*</li>
            <li>3 BHK Royale: Premium pricing</li>
          </ul>

          <p className="mt-3 font-semibold">Price Includes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Sale consideration (unit + club + floor rise + car park)</li>
            <li>GST on sale consideration</li>
            <li>
              Possession & Other Charges:
              <ul className="list-disc list-inside ml-5 space-y-1">
                <li>Maintenance</li>
                <li>Infrastructure + Legal charges</li>
                <li>Stamp paper & Registration</li>
                <li>Modifications (if any)</li>
              </ul>
            </li>
          </ul>

          <p className="mt-3">
            View detailed pricing & unit details in the{" "}
            <button
              onClick={() => {
                scrollToSection("floorplans");
                trackCtaClick("Floor Plans Button");
              }}
              className="text-blue-600 underline"
            >
              Floor Plans
            </button>
          </p>
        </div>
      ),
    },

    {
      question: "What amenities are available in the township?",
      answer: (
        <div>
          <p>Provident Sunworth City offers lifestyle-focused amenities for all age groups:</p>

          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Over 19 acres of open green spaces 🌳</li>
            <li>Swimming pool, gym & indoor games 🎯</li>
            <li>Jogging, cycling & walking tracks 🚴‍♂️</li>
            <li>Tree-house themed kids zone, play areas & open lawns 🛝</li>
            <li>Yoga & meditation decks 🧘</li>
            <li>Clubhouse, multipurpose courts & senior-friendly areas 🧑‍🦳</li>
            <li>Retail shops + school inside the township 🏫🛒</li>
            <li>24×7 security, CCTV & gated access 🛡️</li>
          </ul>

          <p className="mt-3">
            Explore the{" "}
            <button
              onClick={() => {
                scrollToSection("amenities");
                trackCtaClick("Amenities Section Button");
              }}
              className="text-blue-600 underline"
            >
              Amenities Section
            </button>
            .
          </p>
        </div>
      ),
    },

    {
      question: "What are the payment plan options?",
      answer: (
        <div>
          <p>Sunworth City offers flexible and construction-linked payment plans.</p>

          <p className="mt-3 font-semibold">Phase IV Payment Milestones:</p>
          {/* ...list omitted for brevity */}
          <p className="mt-3">
            Get a custom payment plan by filling out the{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => {
                openLeadForm();
                trackCtaClick("Payment Plan Lead Form");
              }}
            >
              Lead Form
            </button>
            .
          </p>
        </div>
      ),
    },

    {
      question: "How can I schedule a site visit?",
      answer: (
        <div>
          <p>Visiting Sunworth City is the best way to experience the township.</p>

          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              Fill the{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => {
                  openLeadForm();
                  trackCtaClick("Site Visit Lead Form");
                }}
              >
                Site Visit Form
              </button>{" "}
              and we will call you to confirm.
            </li>

            <li>
              Message us on{" "}
              <a
                href="https://wa.me/919379822010"
                target="_blank"
                className="text-blue-600 underline"
                onClick={() => trackCtaClick("WhatsApp Site Visit")}
              >
                WhatsApp
              </a>{" "}
              to book instantly.
            </li>
          </ul>

          <p className="mt-3">
            You’ll get a guided tour, see construction progress, explore amenities, and get all your questions answered.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Provident Sunworth City
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border px-6"
                onClick={() => trackFaqOpen(faq.question)}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
