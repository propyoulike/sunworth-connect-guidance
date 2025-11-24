import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface StickyMobileCTAProps {
  onCtaClick: () => void;
}

const StickyMobileCTA = ({ onCtaClick }: StickyMobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border p-4 animate-in slide-in-from-bottom-2">
      <Button
        onClick={onCtaClick}
        className="w-full btn-gradient text-base py-6 rounded-full font-semibold"
      >
        Get Personalised Guidance with FREE Site Visit
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
