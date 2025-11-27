import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CTAButtons from "./CTAButtons";
import { useRef, useState, useEffect, useCallback } from "react";

interface FloorPlansTabsProps {
  onCtaClick: () => void;
  trackGA?: (event: string, data?: any) => void;
  trackFB?: (event: string, data?: any) => void;
}

interface UnitVideo {
  id: string;
  title: string;
  url: string;
  description: string;
  sba: string;
  ca: string;
  usable: string;
  price: string;
}

const FloorPlansTabs = ({ onCtaClick, trackGA, trackFB }: FloorPlansTabsProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const thumbElementsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);

  // ------------------- DATA -------------------
  const unitPlansVideos: UnitVideo[] = [
    {
      id: "z6-d5uB4rRA",
      title: "2 BHK Model Flat",
      url: "https://www.youtube.com/embed/z6-d5uB4rRA?autoplay=1",
      description: "Experience the thoughtful design and smart use of space",
      sba: "883 sq.ft",
      ca: "628 sq.ft",
      usable: "655 sq.ft",
      price: "₹69.99 L*",
    },
    {
      id: "QEtUBt1Ac3U",
      title: "3 BHK Regular Model Flat",
      url: "https://www.youtube.com/embed/QEtUBt1Ac3U?autoplay=1",
      description: "Explore premium homes designed for growing families",
      sba: "1082 sq.ft",
      ca: "779 sq.ft",
      usable: "805 sq.ft",
      price: "₹79.99 L*",
    },
    {
      id: "B2izuPDFLak",
      title: "3 BHK Royale Model Flat",
      url: "https://www.youtube.com/embed/B2izuPDFLak?autoplay=1",
      description: "Discover luxurious living with premium finishes",
      sba: "1779 sq.ft",
      ca: "1287 sq.ft",
      usable: "1351 sq.ft",
      price: "149.99 L*",
    },
  ];

  const floorPlans = [
    {
      title: "Type 1",
      image: "https://www.providenthousing.com/wp-content/uploads/2022/12/type_1.webp",
      description: "Type 1 floor plan",
      price: "Starting at ₹69.99 L*",
    },
    {
      title: "Type 2",
      image: "https://www.providenthousing.com/wp-content/uploads/2022/12/AD-G-WING-RENDER-1.webp",
      description: "Type 2 floor plan",
      price: "Starting at ₹79.99 L*",
    },
  ];

  // ------------------- EFFECTS -------------------
  // ESC to close zoom image
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomImage(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Intersection observer for thumbnails
  useEffect(() => {
    if (!thumbsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) setScrollActiveIndex(index);
        });
      },
      { root: thumbsRef.current, threshold: 0.5 }
    );

    thumbElementsRef.current.forEach((el) => el && observer.observe(el));
    return () => thumbElementsRef.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  const switchActiveVideo = (index: number) => {
    setActiveIndex(index);
    trackGA?.("unit_plan_video_switch", { category: "Unit Plan", label: unitPlansVideos[index].title });
    trackFB?.("VideoView", { title: unitPlansVideos[index].title });
  };

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
    if (expanded !== index) {
      trackGA?.("unit_plan_expand", { category: "Unit Plan", label: unitPlansVideos[index].title });
      trackFB?.("ViewContent", { title: unitPlansVideos[index].title });
    }
  };

  return (
    <section id="floorplanstabs" ref={sectionRef} className="py-20 lg:py-28 scroll-mt-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Floor Plans & Unit Details
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our thoughtfully designed homes with virtual walkthroughs and detailed floor plans
          </p>
        </div>

        <Tabs defaultValue="unit-plans" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
            <TabsTrigger value="unit-plans">Unit Plans</TabsTrigger>
            <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
            <TabsTrigger value="master-plan">Master Plan</TabsTrigger>
          </TabsList>

          {/* ------------------- UNIT PLANS ------------------- */}
          <TabsContent value="unit-plans" className="space-y-8">
            {/* Active Video */}
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={unitPlansVideos[activeIndex].url}
                  title={unitPlansVideos[activeIndex].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mt-3">{unitPlansVideos[activeIndex].title}</h3>
              <p className="text-muted-foreground">{unitPlansVideos[activeIndex].description}</p>
            </Card>

            {/* Thumbnails */}
            <div ref={thumbsRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
              {unitPlansVideos.map((video, index) => (
                <div
                  key={video.id}
                  data-index={index}
                  ref={(el) => (thumbElementsRef.current[index] = el)}
                  className={`min-w-[260px] flex-shrink-0 rounded-xl border p-4 cursor-pointer snap-start
                    ${index === activeIndex ? "border-primary shadow-lg scale-[1.02] bg-card" : "border-border bg-white"}`}
                  onClick={() => switchActiveVideo(index)}
                  aria-current={index === activeIndex}
                >
                  <div className="w-full rounded-lg overflow-hidden mb-3">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>

                  {/* Expandable */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleExpand(index); }}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-semibold text-sm text-foreground">Unit Details</span>
                    <span className={`transition-transform duration-300 text-xl ${expanded === index ? "rotate-90" : "rotate-0"}`}>&gt;</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expanded === index ? "max-h-96 mt-3" : "max-h-0"}`}>
                    <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div>
                        <p className="font-semibold">SBA</p>
                        <p>{video.sba}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Carpet Area</p>
                        <p>{video.ca}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Usable Area</p>
                        <p>{video.usable}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Price</p>
                        <p className="text-primary font-semibold">{video.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ------------------- FLOOR PLANS ------------------- */}
          <TabsContent value="floor-plans" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {floorPlans.map((plan, i) => (
                <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
                  <button onClick={() => setZoomImage(plan.image)} className="w-full p-0 bg-transparent border-0 text-left" type="button">
                    <img src={plan.image} alt={plan.title} className="w-full h-auto rounded-lg cursor-zoom-in" />
                  </button>
                  <h3 className="text-2xl font-bold my-3 text-foreground">{plan.description}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ------------------- MASTER PLAN ------------------- */}
          <TabsContent value="master-plan" className="space-y-8">
            <Card className="p-8">
              <img src="/images/master-plan.webp" alt="Provident Sunworth City Master Plan" className="w-full h-auto rounded-xl" />
              <div className="text-center mt-6 space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Complete Township Layout</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  A meticulously planned 60-acre township with residential towers, green spaces, and world-class amenities.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Buttons */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Get detailed floor plans and pricing for your preferred configuration
          </p>
          <CTAButtons onFormOpen={onCtaClick} />
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} className="max-w-[95%] max-h-[95%] rounded-lg shadow-lg" alt="zoomed plan" />
        </div>
      )}
    </section>
  );
};

export default FloorPlansTabs;
