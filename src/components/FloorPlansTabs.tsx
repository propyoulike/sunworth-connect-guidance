import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CTAButtons from "./CTAButtons";
import { useRef, useState, useEffect } from "react";

interface FloorPlansTabsProps {
  onCtaClick: () => void;
  trackGA?: (event: string, data?: any) => void; // e.g. (event, data) => gtag('event', event, data)
  trackFB?: (event: string, data?: any) => void; // e.g. (event, data) => fbq('track', event, data)
}

const FloorPlansTabs = ({ onCtaClick, trackGA, trackFB }: FloorPlansTabsProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const lastThumbScrollRef = useRef<number>(0);
  const thumbScrollTimeoutRef = useRef<number | null>(null);

  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const unitPlansVideos = [
    {
      title: "2 BHK Model Flat",
      url: "https://www.youtube.com/shorts/z6-d5uB4rRA",
      description: "Experience the thoughtful design and smart use of space",
      sba: "883 sq.ft",
      ca: "628 sq.ft",
      usable: "655 sq.ft",
      price: "₹69.99 L*",
      id: "z6-d5uB4rRA",
    },
    {
      title: "3 BHK Regular Model Flat",
      url: "https://youtube.com/shorts/QEtUBt1Ac3U",
      description: "Explore premium homes designed for growing families",
      sba: "1082 sq.ft",
      ca: "779 sq.ft",
      usable: "805 sq.ft",
      price: "₹79.99 L*",
      id: "QEtUBt1Ac3U",
    },
    {
      title: "3 BHK Royale Model Flat",
      url: "https://youtu.be/B2izuPDFLak",
      description: "Discover luxurious living with premium finishes",
      sba: "1779 sq.ft",
      ca: "1287 sq.ft",
      usable: "1351 sq.ft",
      price: "149.99 L*",
      id: "B2izuPDFLak",
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

  const convertToEmbed = (url: string) => {
    // Convert multiple youtube url patterns to embed url
    try {
      if (url.includes("shorts")) {
        // shorts -> embed
        return url.replace("shorts/", "embed/");
      }
      if (url.includes("youtu.be/")) {
        return url.replace("youtu.be/", "https://www.youtube.com/embed/");
      }
      if (url.includes("watch?v=")) {
        return url.replace("watch?v=", "embed/");
      }
    } catch (e) {
      // fallback
    }
    return url;
  };

  // ---------- Initial video_load tracking ----------
  useEffect(() => {
    const video = unitPlansVideos[activeIndex];
    trackGA?.("video_load", { title: video.title, index: activeIndex });
    trackFB?.("video_load", { title: video.title, index: activeIndex });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // ---------- Handle active video change ----------
  const switchActiveVideo = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setExpanded(null); // collapse any expanded details when switching
    const video = unitPlansVideos[index];

    trackGA?.("video_switch", { title: video.title, index });
    trackFB?.("VideoView", { title: video.title, index });

    // optionally, scroll the thumbnail into view
    const thumbsEl = thumbsRef.current;
    const thumbEl = thumbsEl?.children[index] as HTMLElement | undefined;
    if (thumbEl && thumbsEl) {
      const left = thumbEl.offsetLeft - thumbsEl.clientWidth / 2 + thumbEl.clientWidth / 2;
      thumbsEl.scrollTo({ left, behavior: "smooth" });
      trackGA?.("thumbnail_scroll", { direction: "programmatic", index });
      trackFB?.("thumbnail_scroll", { direction: "programmatic", index });
    }
  };

  // ---------- Thumbnail scroll handler (throttled) ----------
  const onThumbsScroll = () => {
    const now = Date.now();
    const last = lastThumbScrollRef.current || 0;

    // throttle to once every 700ms
    if (now - last > 700) {
      lastThumbScrollRef.current = now;
      trackGA?.("thumbnail_scroll", { direction: "user", timestamp: now });
      trackFB?.("thumbnail_scroll", { direction: "user", timestamp: now });
    }

    // debounce a final event when user stops scrolling
    if (thumbScrollTimeoutRef.current) {
      window.clearTimeout(thumbScrollTimeoutRef.current);
      thumbScrollTimeoutRef.current = null;
    }
    thumbScrollTimeoutRef.current = window.setTimeout(() => {
      trackGA?.("thumbnail_scroll_end", { timestamp: Date.now() });
      trackFB?.("thumbnail_scroll_end", { timestamp: Date.now() });
      thumbScrollTimeoutRef.current = null;
    }, 800);
  };

  // ---------- Toggle expand/collapse for thumbnail item ----------
  const toggleExpand = (index: number) => {
    const newState = expanded === index ? null : index;
    setExpanded(newState);

    if (newState === index) {
      trackGA?.("expand_open", { title: unitPlansVideos[index].title, index });
      trackFB?.("expand_open", { title: unitPlansVideos[index].title, index });
    } else {
      trackGA?.("expand_close", { title: unitPlansVideos[index].title, index });
      trackFB?.("expand_close", { title: unitPlansVideos[index].title, index });
    }
  };

  useEffect(() => {
    return () => {
      if (thumbScrollTimeoutRef.current) {
        window.clearTimeout(thumbScrollTimeoutRef.current);
        thumbScrollTimeoutRef.current = null;
      }
    };
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

          {/* ------------------- UNIT PLANS (active + thumbnails) ------------------- */}
          <TabsContent value="unit-plans" className="space-y-8">
            {/* ---------- Active Video Card ---------- */}
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div
                className="w-full rounded-lg overflow-hidden mb-6 bg-muted cursor-pointer"
                onClick={() => {
                  // user clicked main video area
                  const video = unitPlansVideos[activeIndex];
                  trackGA?.("video_click", { title: video.title, index: activeIndex });
                  trackFB?.("video_click", { title: video.title, index: activeIndex });
                }}
                role="button"
                aria-label={`Play ${unitPlansVideos[activeIndex].title}`}
              >
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={convertToEmbed(unitPlansVideos[activeIndex].url)}
                    title={unitPlansVideos[activeIndex].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">
                {unitPlansVideos[activeIndex].title}
              </h3>
              <p className="text-muted-foreground">{unitPlansVideos[activeIndex].description}</p>
            </Card>

            {/* ---------- Horizontal Thumbnails (scrollable) ---------- */}
            <div
              ref={thumbsRef}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
              onScroll={onThumbsScroll}
              role="list"
              aria-label="Unit plan thumbnails"
            >
              {unitPlansVideos.map((video, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={video.id}
                    role="listitem"
                    className={`min-w-[260px] flex-shrink-0 rounded-xl border p-4 transition-all ${
                      isActive ? "border-primary shadow-lg scale-[1.02] bg-card" : "border-border bg-white"
                    }`}
                    onClick={() => switchActiveVideo(index)}
                    aria-current={isActive}
                  >
                    {/* thumbnail visual (use YouTube thumbnail) */}
                    <div className="w-full rounded-lg overflow-hidden mb-3">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>

                    <h4 className="text-lg font-bold mb-2 line-clamp-2">{video.title}</h4>

                    {/* Expand details toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                      className="flex items-center justify-between w-full text-left"
                      aria-expanded={expanded === index}
                      aria-controls={`unit-details-${index}`}
                    >
                      <span className="font-semibold text-sm text-foreground">Unit Details</span>
                      <span
                        className={`transition-transform duration-300 text-xl ${
                          expanded === index ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        &gt;
                      </span>
                    </button>

                    {/* Expanded details */}
                    <div
                      id={`unit-details-${index}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        expanded === index ? "max-h-96 mt-3" : "max-h-0"
                      }`}
                    >
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
                    onClick={() => {
                      setZoomImage(plan.image);
                      trackGA?.("floorplan_zoom", { title: plan.title, index: i });
                      trackFB?.("floorplan_zoom", { title: plan.title, index: i });
                    }}
                    className="w-full p-0 bg-transparent border-0 text-left"
                    type="button"
                  >
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-full h-auto rounded-lg cursor-zoom-in"
                    />
                  </button>
                  <h3 className="text-2xl font-bold my-3 text-foreground">{plan.description}</h3>
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
                <h3 className="text-2xl font-bold text-foreground">Complete Township Layout</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  A meticulously planned 60-acre township with residential towers, green spaces, and
                  world-class amenities.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      trackGA?.("masterplan_view", { view: "open" });
                      trackFB?.("masterplan_view", { view: "open" });
                    }}
                    className="text-primary underline"
                  >
                    View Master Plan
                  </button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Buttons */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Get detailed floor plans and pricing for your preferred configuration
          </p>
          <CTAButtons
            onFormOpen={() => {
              trackGA?.("cta_click", { cta: "floorplans_enquiry" });
              trackFB?.("cta_click", { cta: "floorplans_enquiry" });
              onCtaClick();
            }}
          />
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            className="max-w-[95%] max-h-[95%] rounded-lg shadow-lg"
            alt="zoomed plan"
          />
        </div>
      )}
    </section>
  );
};

export default FloorPlansTabs;
