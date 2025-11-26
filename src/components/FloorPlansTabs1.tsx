import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CTAButtons from "./CTAButtons";

interface FloorPlansTabsProps {
  onCtaClick: () => void;
}

const FloorPlansTabs = ({ onCtaClick }: FloorPlansTabsProps) => {
  const modelFlatVideos = [
    {
      title: "2 BHK Model Flat Walkthrough",
      url: "https://www.youtube.com/shorts/z6-d5uB4rRA",
      description: "Experience the thoughtful design and smart use of space",
    },
    {
      title: "3 BHK Model Flat Walkthrough",
      url: "https://youtube.com/shorts/QEtUBt1Ac3U",
      description: "Explore premium homes designed for growing families",
    },
    {
      title: "3 BHK Royale Walkthrough",
      url: "https://youtu.be/B2izuPDFLak",
      description: "Discover luxurious living with premium finishes",
    },
  ];

  const unitPlans = [
    {
      title: "2 BHK",
      image: "/images/2bhk-plan.webp",
      description: "Thoughtful layouts with smart use of space",
      price: "Starting at ₹69.99 L*",
    },
    {
      title: "3 BHK Regular",
      image: "/images/3bhk-plan.webp",
      description: "Premium homes for growing families",
      price: "Starting at ₹79.99 L*",
    },
    {
      title: "3 BHK Royale",
      image: "/images/3bhk-royale.webp",
      description: "Luxurious space with premium finishes",
      price: "Premium pricing",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Floor Plans & Unit Details
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our thoughtfully designed homes with virtual walkthroughs and detailed floor plans
          </p>
        </div>

        <Tabs defaultValue="model-flat" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
            <TabsTrigger value="model-flat" className="text-sm sm:text-base py-3">
              Model Flat Videos
            </TabsTrigger>
            <TabsTrigger value="unit-plans" className="text-sm sm:text-base py-3">
              Unit Plans
            </TabsTrigger>
            <TabsTrigger value="master-plan" className="text-sm sm:text-base py-3">
              Master Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="model-flat" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modelFlatVideos.map((video, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url
                        .replace("youtu.be/", "youtube.com/embed/")
                        .replace("shorts/", "embed/")}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground">{video.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unit-plans" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {unitPlans.map((plan, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="rounded-lg overflow-hidden mb-6 bg-muted">
                    <img
                      src={plan.image}
                      alt={`${plan.title} Floor Plan`}
                      className="w-full h-auto"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <p className="text-xl font-bold text-primary mb-4">{plan.price}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="master-plan" className="space-y-8">
            <Card className="p-8">
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src="/images/master-plan.webp"
                  alt="Provident Sunworth City Master Plan"
                  className="w-full h-auto"
                />
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Complete Township Layout
                </h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  A meticulously planned 60-acre township with dedicated zones for residential towers, 
                  recreational facilities, green spaces, and community amenities. Every aspect designed 
                  to enhance your living experience.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Get detailed floor plans and pricing for your preferred configuration
          </p>
          <CTAButtons onFormOpen={onCtaClick} variant="default" />
        </div>
      </div>
    </section>
  );
};

export default FloorPlansTabs;
