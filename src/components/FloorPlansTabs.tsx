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

  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // Which video is active
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const unitPlansVideos = [
    {
      title: "2 BHK Flat",
      url: "https://www.youtube.com/shorts/z6-d5uB4rRA",
      description: "Experience the thoughtful design and smart use of space",
      sba: "883 sq.ft",
      ca: "628 sq.ft",
      usable: "655 sq.ft",
      uds: "321 sq.ft",
      price: "₹69.99 L*",
      floorPlan: "https://www.providenthousing.com/wp-content/uploads/2022/12/2_bhk_plan.webp",
    },
    {
      title: "3 BHK Regular Flat",
      url: "https://youtube.com/shorts/QEtUBt1Ac3U",
      description: "Explore premium homes designed for growing families",
      sba: "1082 sq.ft",
      ca: "779 sq.ft",
      usable: "805 sq.ft",
      uds: "398 sq.ft",
      price: "₹79.99 L*",
      floorPlan: "https://www.providenthousing.com/wp-content/uploads/2022/12/3_bhk_plan.webp",
    },
    {
      title: "3 BHK Royale Flat",
      url: "https://youtu.be/B2izuPDFLak",
      description: "Discover luxurious living with premium finishes",
      sba: "1779 sq.ft",
      ca: "1287 sq.ft",
      usable: "1351 sq.ft",
      uds: "658 sq.ft",
      price: "149.99 L*",
      floorPlan: "https://www.providenthousing.com/wp-content/uploads/2022/12/3bhk_royale.webp",
    },
  ];

  const floorPlans = [
    {
      title: "Type 1",
      image: "https://www.providenthousing.com/wp-content/uploads/2022/12/type_1.webp",
      description: "Type 1 floor plan",
    },
    {
      title: "Type 2",
      image: "https://www.providenthousing.com/wp-content/uploads/2022/12/AD-G-WING-RENDER-1.webp",
      description: "Type 2 floor plan",
    },
  ];

  const convertToEmbed = (url: string) => {
    if (url.includes("shorts")) return url.replace("shorts/", "embed/");
    if (url.includes("youtu.be")) return url.replace("youtu.be/", "youtube.com/embed/");
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    return url;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomImage(null);
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Intersection Observer to highlight which video is in view
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
            // GA + FB Tracking
            const video = unitPlansVideos[index];
            trackGA?.("video_scroll_inview", {
              category: "Unit Plan",
              label: video.title,
              value: index,
            });
            trackFB?.("VideoView", { title: video.title });
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section
      id="floorplanstabs"
      ref={sectionRef}
      className="py-20 lg:py-28 scroll-mt-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
            Meticulously Designed <span className="text-primary">Homes</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our thoughtfully designed homes with virtual walkthroughs and detailed
            floor plans
          </p>
        </div>

        <Tabs defaultValue="unit-plans" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
            <TabsTrigger value="unit-plans">Unit Plans</TabsTrigger>
            <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
            <TabsTrigger value="master-plan">Master Plan</TabsTrigger>
          </TabsList>

          {/* ------------------- UNIT PLANS (with expand + fullscreen) ------------------- */}
          <TabsContent value="unit-plans" className="space-y-8">
            <div className="flex gap-6 overflow-x-auto py-4">
              {unitPlansVideos.map((video, i) => {
                const isOpen = expanded === i;
                const isActive = activeIndex === i;

                return (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-[300px] border-2 rounded-lg p-4 transition-all ${
                      isActive ? "border-primary" : "border-muted/50"
                    }`}
                    ref={(el) => (videoRefs.current[i] = el)}
                    data-index={i}
                  >
                    {/* Thumbnail / Video */}
                    <div
                      className="w-full h-40 bg-black mb-3 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setIsFullscreen(true)}
                    >
                      {isActive && (
                        <iframe
                          src={convertToEmbed(video.url) + "?autoplay=1"}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      )}
                      {!isActive && (
                        <img
                          src={`https://img.youtube.com/vi/${video.url.split("/").pop()}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Title + Chevron */}
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => {
                        setExpanded(isOpen ? null : i);
                        if (!isOpen) {
                          trackGA?.("unit_plan_expand", {
                            category: "Unit Plan",
                            label: video.title,
                          });
                          trackFB?.("ViewContent", { title: video.title });
                        }
                      }}
                    >
                      <h3 className="text-lg font-bold text-foreground">{video.title}</h3>
                      <span
                        className={`transition-transform duration-300 text-2xl ${
                          isOpen ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        &gt;
                      </span>
                    </button>

                    {/* Expandable Content */}
                    {isOpen && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        <p className="mb-1 font-semibold">Description:</p>
                        <p>{video.description}</p>
                        <p className="mt-2 font-semibold">Super Builtup Area: {video.sba}</p>
                        <p>Carpet Area: {video.ca}</p>
                        <p>Usable Area: {video.usable}</p>
                        <p>Undivided Share: {video.uds}</p>
                        <p className="text-primary font-semibold">Price: {video.price}</p>
                        {video.floorPlan && (
                          <img
                            src={video.floorPlan}
                            alt="Floor Plan"
                            className="mt-3 w-full rounded-lg cursor-zoom-in"
                            onClick={() => setZoomImage(video.floorPlan)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ------------------- FLOOR PLANS ------------------- */}
          <TabsContent value="floor-plans" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {floorPlans.map((plan, i) => (
                <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
                  <button
                    onClick={() => setZoomImage(plan.image)}
                    className="w-full p-0 bg-transparent border-0 text-left"
                    type="button"
                  >
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-full h-auto rounded-lg cursor-zoom-in"
                    />
                  </button>
                  <h3 className="text-2xl font-bold my-3 text-foreground">
                    {plan.description}
                  </h3>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ------------------- MASTER PLAN ------------------- */}
          <TabsContent value="master-plan" className="space-y-8">
            <Card className="p-8">
              <img
                src="/images/master-plan.webp"
                alt="Provident Sunworth City Master Plan"
                className="w-full h-auto rounded-xl"
              />
              <div className="text-center mt-6 space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  Complete Township Layout
                </h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  A meticulously planned 60-acre township with residential towers, green
                  spaces, and world-class amenities.
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

      {/* Floor Plan Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            className="max-w-[95%] max-h-[95%] rounded-lg shadow-lg"
            alt="zoomed floor plan"
          />
        </div>
      )}

      {/* Fullscreen Video */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setIsFullscreen(false)}
        >
          <iframe
            src={convertToEmbed(unitPlansVideos[activeIndex].url) + "?autoplay=1"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
            className="w-full h-full max-w-[90%] max-h-[90%]"
          />
        </div>
      )}
    </section>
  );
};

export default FloorPlansTabs;





