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
  const FAQs = [
    {
      question: "What is the price range for apartments at Provident Sunworth City?",
      answer: (
        <div>
          <ul className="list-disc list-inside space-y-1">
            <li>2 BHK apartments: Starting at ₹69.99 lakhs</li>
            <li>3 BHK Regular apartments: Starting at ₹79.99 lakhs</li>
            <li>3 BHK Royale apartments: Premium pricing</li>
          </ul>
          <p className="mt-2 font-semibold">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Final pricing depends on the floor, unit facing, and selection.</li>
            <li>Total price comprises:
              <ul className="list-disc list-inside ml-5">
                <li>Sale Consideration: Flat/unit cost + club development charges + floor rise charges + car park charges</li>
                <li>GST on sale consideration</li>
                <li>Other/Possession Related Charges (tentative): Advanced maintenance charges, infrastructure provision, legal charges, stamp paper charges, modifications (if applicable), share application money</li>
                <li>Stamp Duty & Registration charges</li>
              </ul>
            </li>
          </ul>
          <p className="mt-2">
            Want to see detailed pricing and floor plans? Jump to the{" "}
            <a href="#floorplans" className="text-blue-600 underline">Floor Plans & Pricing section</a>.
          </p>
        </div>
      ),
    },
    {
      question: "What amenities are available in the township?",
      answer: (
        <div>
          <p>
            Provident Sunworth City isn’t just a place to live — it’s a lifestyle:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Lush green gardens & walking paths 🌳</li>
            <li>Gym, swimming pool, jogging & cycling tracks 🏃‍♂️</li>
            <li>Yoga & meditation zones 🧘</li>
            <li>Children’s play areas, tree houses, open lawns 🛝</li>
            <li>Clubhouse & multipurpose halls 🎉</li>
            <li>Retail shops & school inside the campus 🚶‍♂️🛒</li>
            <li>24×7 security, gated entry, CCTV, covered parking 🛡️</li>
          </ul>
          <p className="mt-2">
            See full list of <a href="#amenities" className="text-blue-600 underline">Amenities & Features</a>.
          </p>
        </div>
      ),
    },
    {
      question: "What are the payment plan options?",
      answer: (
        <div>
          <p>Flexible payment plans including construction-linked, EMIs, and down payment options.</p>
          <p className="mt-2 font-semibold">Phase IV Milestones:</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Initial Advance: ₹2,00,000</li>
            <li>Balance Advance: 9% of Sale Consideration (after initial advance)</li>
            <li>Post Agreement for Sale (within 30 days): 11%</li>
            <li>Completion of Excavation: 10%</li>
            <li>Completion of Foundation: 15%</li>
            <li>Completion of Ground/Stilt Floor Roof Slab: 7%</li>
            <li>Completion of 3rd Floor Roof Slab: 7%</li>
            <li>Completion of 6th Floor Roof Slab: 7%</li>
            <li>Completion of 9th Floor Roof Slab: 7%</li>
            <li>Completion of Terrace Slab: 7%</li>
            <li>Completion of Flooring: 5%</li>
            <li>Installation of External Windows: 5%</li>
            <li>Commencement of Lift Installation: 5%</li>
            <li>Possession: 5%</li>
          </ol>
          <p className="mt-2 font-semibold">Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Percentages are based on Agreement Value.</li>
            <li>GST, infrastructure, legal, and statutory charges are extra.</li>
            <li>Billing occurs upon completion of the milestone, not sequential order.</li>
          </ul>
          <p className="mt-2">
            For a personalized payment plan, fill out the{" "}
            <button className="text-blue-600 underline" onClick={openLeadForm}>
              Lead Form
            </button>.
          </p>
        </div>
      ),
    },
    {
      question: "How can I schedule a site visit?",
      answer: (
        <div>
          <p>
            Experiencing Sunworth City in person is the best way to feel the greenery, open spaces, and lifestyle.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              Online Form: Fill out the quick{" "}
              <button className="text-blue-600 underline" onClick={openLeadForm}>
                Site Visit Form
              </button>{" "}
              and our team will schedule a visit.
            </li>
            <li>
              WhatsApp: Message us on{" "}
              <a href="https://wa.me/919379822010" className="text-blue-600 underline">
                WhatsApp
              </a>{" "}
              to coordinate a convenient time.
            </li>
          </ul>
          <p className="mt-2">
            During your visit, get a guided tour, see apartments under construction, explore amenities, and have all your questions answered. 🏡
          </p>
        </div>
      ),
    },
    // Add other FAQs similarly
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
