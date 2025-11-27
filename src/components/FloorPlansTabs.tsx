import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CTAButtons from "./CTAButtons";
import { useRef, useState, useEffect } from "react";

interface FloorPlansTabsProps {
  onCtaClick: () => void;
  trackGA?: (event: string, data?: any) => void;
  trackFB?: (event: string, data?: any) => void;
}

const FloorPlansTabs = ({ onCtaClick, trackGA, trackFB }: FloorPlansTabsProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const unitPlansVideos = [
    { title: "2 BHK Model Flat Walkthrough", url: "https://www.youtube.com/shorts/z6-d5uB4rRA", description: "Experience the thoughtful design and smart use of space", sba: "883 – 1000 sq.ft", ca: "680 – 720 sq.ft", usable: "760 – 840 sq.ft", price: "₹69.99 L – ₹74.99 L*" },
    { title: "3 BHK Model Flat Walkthrough", url: "https://youtube.com/shorts/QEtUBt1Ac3U", description: "Explore premium homes designed for growing families", sba: "1106 – 1300 sq.ft", ca: "820 – 900 sq.ft", usable: "940 – 1060 sq.ft", price: "₹79.99 L – ₹89.99 L*" },
    { title: "3 BHK Royale Walkthrough", url: "https://youtu.be/B2izuPDFLak", description: "Discover luxurious living with premium finishes", sba: "1400 – 1500 sq.ft", ca: "1020 – 1080 sq.ft", usable: "1200 – 1300 sq.ft", price: "Premium Pricing" },
  ];

  const floorPlans = [
    { title: "Type 1", image: "https://www.providenthousing.com/wp-content/uploads/2022/12/type_1.webp", description: "Type 1 floor plan", price: "Starting at ₹69.99 L*" },
    { title: "Type 2", image: "https://www.providenthousing.com/wp-content/uploads/2022/12/AD-G-WING-RENDER-1.webp", description: "Type 2 floor plan", price: "Starting at ₹79.99 L*" },
  ];

  const convertToEmbed = (url: string) => {
    if (url.includes("shorts")) return url.replace("shorts/", "embed/");
    if (url.includes("youtu.be")) return url.replace("youtu.be/", "youtube.com/embed/");
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    return url;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomImage(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="floorplanstabs" ref={sectionRef} className="py-20 lg:py-28 scroll-mt-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">Floor Plans & Unit Details</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">Explore our thoughtfully designed homes with virtual walkthroughs and detailed floor plans</p>
        </div>

        <Tabs defaultValue="unit-plans" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
            <TabsTrigger value="unit-plans">Unit Plans</TabsTrigger>
            <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
            <TabsTrigger value="master-plan">Master Plan</TabsTrigger>
          </TabsList>

          {/* Unit Plan Videos */}
          <TabsContent value="unit-plans" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {unitPlansVideos.map((video, i) => (
                <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="w-full rounded-lg overflow-hidden mb-6 bg-muted cursor-pointer"
                    onClick={() => { trackGA?.("video_click", { title: video.title }); trackFB?.("VideoView", { title: video.title }); }}>
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                      <iframe src={convertToEmbed(video.url)} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen className="absolute inset-0 w-full h-full" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{video.title}</h3>
                  <p className="text-muted-foreground mb-4">{video.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div><p className="font-semibold">SBA</p><p>{video.sba}</p></div>
                    <div><p className="font-semibold">Carpet Area</p><p>{video.ca}</p></div>
                    <div><p className="font-semibold">Usable Area</p><p>{video.usable}</p></div>
                    <div><p className="font-semibold">Price</p><p className="text-primary font-semibold">{video.price}</p></div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Floor Plans */}
          <TabsContent value="floor-plans" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {floorPlans.map((plan, i) => (
                <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
                  <button onClick={() => setZoomImage(plan.image)} className="w-full p-0 bg-transparent border-0 text-left" type="button" aria-label={`Open ${plan.title} plan`}>
                    <img src={plan.image} alt={plan.title} className="w-full h-auto rounded-lg cursor-zoom-in" />
                  </button>
                  <h3 className="text-2xl font-bold my-3 text-foreground">{plan.title}</h3>
                  <p className="text-muted-foreground mb-2">{plan.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Master Plan */}
          <TabsContent value="master-plan" className="space-y-8">
            <Card className="p-8">
              <img src="/images/master-plan.webp" alt="Provident Sunworth City Master Plan" className="w-full h-auto rounded-xl" />
              <div className="text-center mt-6 space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Complete Township Layout</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">A meticulously planned 60-acre township with residential towers, green spaces, and world-class amenities.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">Get detailed floor plans and pricing for your preferred configuration</p>
          <CTAButtons onFormOpen={onCtaClick} />
        </div>
      </div>

      {zoomImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} className="max-w-[95%] max-h-[95%] rounded-lg shadow-lg" alt="zoomed plan" />
        </div>
      )}
    </section>
  );
};

export default FloorPlansTabs;

