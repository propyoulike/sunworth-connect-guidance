import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CTAButtons from "@/components/CTAButtons"; // ✅ FIXED import

interface FAQProps {
  openLeadForm: () => void; // comes from parent component
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

  // ----------------------------------------------------
  // ❗ CTA HANDLER — Correct function passed to CTAButtons
  // ----------------------------------------------------
  const handleCTA = () => {
    trackCtaClick("FAQ CTA Button");
    openLeadForm();            // ← use the correct prop
  };
  // ----------------------------------------------------

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
                scrollToSection("floor-plans");
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
          <p>Provident Sunworth City offers lifestyle-focused amenities:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>19+ acres of green spaces</li>
            <li>Swimming pool, gym & indoor games</li>
            <li>Jogging & cycling tracks</li>
            <li>Kids’ zones & open lawns</li>
            <li>Yoga decks</li>
            <li>Clubhouse & multipurpose courts</li>
            <li>Retail + school inside township</li>
            <li>24×7 security & gated entry</li>
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
          <p>Flexible & construction-linked payment plans available.</p>

          <p className="mt-3">
            Get a custom plan by filling the{" "}
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
          <p>Experience the township firsthand.</p>

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
              </button>
            </li>

            <li>
              Message on{" "}
              <a
                href="https://wa.me/919379822010"
                className="text-blue-600 underline"
                target="_blank"
                onClick={() => trackCtaClick("WhatsApp Site Visit")}
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Got Questions? <span className="text-primary">We’ve Got Answers.</span>
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

          {/* CTA Buttons */}
          <div className="mt-12 text-center">
            <CTAButtons onFormOpen={handleCTA} /> {/* ✅ FIXED */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
