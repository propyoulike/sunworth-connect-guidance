import CTAButtons from "./CTAButtons";
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
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border p-3 animate-in slide-in-from-bottom-2">
      <CTAButtons onFormOpen={onCtaClick} variant="compact" />
    </div>
  );
};

export default StickyMobileCTA;
