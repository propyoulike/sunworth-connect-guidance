import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the price range for apartments at Provident Sunworth City?",
      answer: "2 BHK apartments start at ₹69.99 lakhs, 3 BHK Regular apartments start at ₹79.99 lakhs, and 3 BHK Royale apartments are available at premium pricing. Final prices depend on floor, facing, and unit selection.",
    },
    {
      question: "What is the current status of construction?",
      answer: "Provident Sunworth City is a ready-to-move-in township with multiple phases completed. Phase IV construction is progressing well with several towers nearing completion. You can visit the site to see the actual progress.",
    },
    {
      question: "What amenities are available in the township?",
      answer: "The township offers 50+ world-class amenities including a clubhouse, swimming pool, gymnasium, sports facilities (cricket, tennis, basketball), children's play area, library, forest walks, tree house, viewing deck, and much more.",
    },
    {
      question: "Is home loan assistance available?",
      answer: "Yes, we provide complete home loan assistance. Our team works with leading banks and financial institutions to help you secure the best loan rates and terms. We guide you through the entire documentation and approval process.",
    },
    {
      question: "What is the location advantage of Provident Sunworth City?",
      answer: "Located on Mysore Road, the township offers excellent connectivity to key areas of Bangalore. It's close to major IT parks, educational institutions, hospitals, and entertainment zones. The upcoming metro connectivity will further enhance accessibility.",
    },
    {
      question: "Can I customize my apartment?",
      answer: "Yes, depending on the construction stage, customization options are available. Our team can discuss specific requirements and possibilities based on your selected unit.",
    },
    {
      question: "What are the payment plan options?",
      answer: "We offer flexible payment plans including construction-linked plans, easy EMIs, and down payment flexibility. Our team can create a personalized payment schedule that aligns with your financial planning.",
    },
    {
      question: "Is there parking space available?",
      answer: "Yes, dedicated covered parking is provided for all apartments. Additional parking spaces are also available for guests and visitors throughout the township.",
    },
    {
      question: "What is the possession timeline?",
      answer: "As this is a ready-to-move-in project, immediate possession is available for completed phases. For units under construction, possession timelines will be shared based on the specific tower and construction schedule.",
    },
    {
      question: "How can I schedule a site visit?",
      answer: "You can schedule a free site visit by filling out the form on this page, calling us, or connecting via WhatsApp. Our team will arrange a convenient time and provide a detailed tour of the township.",
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
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border px-6"
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
