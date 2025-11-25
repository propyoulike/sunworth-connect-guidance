import { Building2, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Years Experience", value: "16+" },
  { icon: Users, label: "Happy Customers", value: "55,000+" },
  { icon: Building2, label: "Million Sq.Ft. Delivered", value: "12.8" },
  { icon: Award, label: "Cities", value: "9" },
];

const ProvidentSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-foreground">
            About Provident Housing
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience Homes Designed For More.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 lg:p-12 mb-12" style={{ boxShadow: 'var(--shadow-medium)' }}>
            <p className="text-base lg:text-lg text-foreground leading-relaxed mb-6">
              Established in 2008, <strong>Provident Housing Limited</strong> is a large-scale community developer, offering the greatest value within the residential segment. The company caters to the diverse residential needs of buyers, with a focus on aspirational home ownership.
            </p>
            <p className="text-base lg:text-lg text-foreground leading-relaxed mb-6">
              A 100% subsidiary of <strong>Puravankara Limited</strong>, Provident Housing carries its legacy with a portfolio of remarkable residential developments across 9 cities, namely, Bengaluru, Kochi, Mumbai, Goa, Hyderabad, Mangalore, Chennai, Coimbatore, and Pune. With a family of 55,000+ happy residents, the company's mammoth scale of development is evidenced by its track record of ~20 million square feet of projects: ~12.8 million square feet completed and ~7.2 million square feet of ongoing projects.
            </p>
            <p className="text-base lg:text-lg text-foreground leading-relaxed">
              <strong>Customer obsession</strong> is at the heart of everything we do at Provident Housing. This credo guides us in every aspect of our work, from design to handover, ensuring that we consistently enhance the customer's experience and elevate their lifestyle with homes designed for more.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center"
                style={{ boxShadow: 'var(--shadow-medium)' }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-card rounded-2xl p-8 lg:p-12" style={{ boxShadow: 'var(--shadow-medium)' }}>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The Puravankara Group Legacy</h3>
            <p className="text-base lg:text-lg text-foreground leading-relaxed">
              Puravankara Limited is one of India's leading listed real estate companies headquartered in Bengaluru. Since its inception in 1975, Puravankara has believed that there is only one mantra for success: <strong>Quality</strong>. This credo combined with uncompromising values, customer-centricity, robust engineering, and transparency in business operations; has placed it among the 'most preferred' real estate brands in both residential and commercial segments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvidentSection;
