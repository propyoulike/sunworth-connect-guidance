import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = [
  {
    question: "What is the price range for apartments at Provident Sunworth City?",
    answer: `2 BHK apartments: Starting at ₹69.99 lakhs
3 BHK Regular apartments: Starting at ₹79.99 lakhs
3 BHK Royale apartments: Premium pricing

Note: Final pricing depends on the floor, unit facing, and selection. The total price comprises:
a. Sale Consideration: Flat/unit cost + club development charges + floor rise charges + car park charges
b. GST on sale consideration
c. Other/Possession Related Charges (Tentative): Advanced maintenance charges, infrastructure provision (electricity & water), legal charges, stamp paper charges, modifications (if applicable), and share application money
d. Stamp Duty & Registration charges`,
  },
  {
    question: "What is the current status of construction?",
    answer: `Provident Sunworth City is an under-construction township, with multiple phases at various stages. 
Phase IV is progressing steadily. 
Site visits are encouraged to see the actual progress.`,
  },
  {
    question: "What amenities are available in the township?",
    answer: `Provident Sunworth City isn’t just a place to live — it’s a lifestyle designed around your family, fitness, and fun. Imagine stepping out of your apartment and strolling through lush green gardens and forest-like walking paths, breathing in fresh air, with birds chirping and kids laughing nearby. 🌳

For your active side, there’s a fully equipped gym, a swimming pool, and dedicated jogging and cycling tracks. Fancy a quiet morning stretch? You can find your calm at the yoga and meditation zones. 🧘

Families will love the children’s play areas, tree houses, and safe open lawns where kids can run around freely while you sip coffee or chat with neighbors. For social moments, the clubhouse and multipurpose halls are perfect for celebrations, gatherings, or weekend game nights. 🎉

Need daily conveniences? Retail shops and a school inside the campus mean errands are quick and easy — groceries, essentials, or school runs are just a short walk away. 🚶‍♂️🛒

And of course, your safety is our priority: 24×7 security, gated entry, CCTV surveillance, and covered parking ensure peace of mind for the whole family. 🛡️

In short, whether it’s play, fitness, nature, convenience, or community, Sunworth City gives you everything to live a balanced, joyful, and stress-free life — all within your own township.`,
  },
  {
    question: "Is home loan assistance available?",
    answer: `Yes, the project is approved by all major banks. PropYouLike provides complete home loan assistance. Our team works with leading banks and financial institutions to help you secure the best loan rates and terms. We guide you through the entire documentation and approval process.`,
  },
  {
    question: "What is the location advantage of Provident Sunworth City?",
    answer: `Strategically located on Mysore Road, Bangalore. Excellent connectivity to IT hubs, schools, hospitals, and entertainment zones. Less than 5 mins drive from Challaghatta Metro Station.`,
  },
  {
    question: "What are the payment plan options?",
    answer: `We offer flexible payment plans including construction-linked plans, easy EMIs, and down payment flexibility. Our team can create a personalized payment schedule that aligns with your financial planning.

Phase IV offers a construction-linked payment plan with 14 milestones:
1. Initial Advance: ₹2,00,000
2. Balance Advance: 9% of Sale Consideration (after initial advance)
3. Post Agreement for Sale (within 30 days of booking): 11%
4. Completion of Excavation: 10%
5. Completion of Foundation: 15%
6. Completion of Ground/Stilt Floor Roof Slab: 7%
7. Completion of 3rd Floor Roof Slab: 7%
8. Completion of 6th Floor Roof Slab: 7%
9. Completion of 9th Floor Roof Slab: 7%
10. Completion of Terrace Slab: 7%
11. Completion of Flooring: 5%
12. Installation of External Windows: 5%
13. Commencement of Lift Installation: 5%
14. Possession: 5%

Important Notes:
- Percentages are based on the Agreement Value.
- GST, infrastructure charges, legal charges, and all other statutory charges are extra.
- Billing occurs upon completion of the respective milestone, not in sequential order.`,
  },
  {
    question: "Is there parking space available?",
    answer: "Yes, STILT parking is provided for all apartments. Additional parking spaces are also available for guests and visitors throughout the township.",
  },
  {
    question: "What is the possession timeline?",
    answer: `The possession is expected around Q1 2028 for Phase IV. Phase IV is progressing steadily.
For units under construction, possession timelines will be shared based on the specific tower and construction schedule. Site visits are encouraged to see the actual progress.`,
  },
  {
    question: "How can I schedule a site visit?",
    answer: `Visiting Sunworth City is the best way to truly experience the greenery, open spaces, and lifestyle the township offers. Scheduling a visit is simple and hassle-free:

- **Online Form:** Fill out the quick free [site visit form](https://wa.me/919379822010) and our team will get back to you to fix a convenient time.
- **WhatsApp:** Prefer messaging? Send us a message on [WhatsApp](https://wa.me/919379822010), and we’ll coordinate a visit that fits your schedule.

During your visit, you’ll get a guided tour of the township, see apartments under construction, explore amenities, and have all your questions answered — a sneak peek into your future home! 🏡`,
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
