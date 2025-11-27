const homes = [
  {
    title: "2 BHK Homes",
    description: "Perfect for young families starting out. Thoughtful layouts with smart use of space.",
    price: "Starting at 69.99 lakhs*",
    videoId: "z6-d5uB4rRA",
  },
  {
    title: "3 BHK Homes",
    description: "For growing families who want an extra room — for parents, a home office or kids' space.",
    price: "Premium 3 BHK options available — talk to us for current offers.",
    videoId: "B2izuPDFLak",
  },
];

import CTAButtons from "./CTAButtons";

interface HomesProps {
  onCtaClick: () => void;
}

const Homes = ({ onCtaClick }: HomesProps) => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-16 text-foreground">
          Choose the home that <span className="text-primary">fits your next chapter.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {homes.map((home, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden card-hover"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              {/* Video */}
              <div className="aspect-[9/16] max-h-96 bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${home.videoId}`}
                  title={home.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{home.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{home.description}</p>
                <p className="text-lg font-semibold text-primary">{home.price}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 mb-8">
          *Exact price and availability shared by your advisor based on current inventory.
        </p>

        <CTAButtons onFormOpen={onCtaClick} />
      </div>
    </section>
  );
};

export default Homes;
