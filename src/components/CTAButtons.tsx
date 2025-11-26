import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CTAButtonsProps {
  onFormOpen: () => void;
  variant?: "default" | "compact";
}

const CTAButtons = ({ onFormOpen, variant = "default" }: CTAButtonsProps) => {
  const handleWhatsAppClick = () => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "click", {
        event_category: "WhatsApp",
        event_label: "Click to WhatsApp",
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Contact");
    }
    window.open(
      "https://wa.me/919379822010?text=Hi,%20I%27d%20like%20to%20know%20more%20about%20Provident%20Sunworth",
      "_blank"
    );
  };

  const handleFormClick = (buttonType: string) => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: buttonType,
      });
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
    onFormOpen();
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          size="lg"
          className="flex-1 btn-gradient text-base sm:text-lg px-6 py-5 rounded-full font-semibold"
          onClick={() => handleFormClick("Personalised Guidance")}
        >
          Personalised Guidance
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 text-base sm:text-lg px-6 py-5 rounded-full font-semibold border-2"
          onClick={() => handleFormClick("Free Site Visit")}
        >
          Book FREE Site Visit
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        size="lg"
        className="w-full sm:w-auto btn-gradient text-lg px-8 py-6 rounded-full font-semibold shadow-lg"
        onClick={() => handleFormClick("Personalised Guidance")}
      >
        Personalised Guidance
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-semibold border-2"
        onClick={() => handleFormClick("Free Site Visit")}
      >
        Book FREE Site Visit
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-semibold"
        onClick={handleWhatsAppClick}
      >
        <Phone className="mr-2 h-5 w-5" />
        Chat on WhatsApp
      </Button>
    </div>
  );
};

export default CTAButtons;
