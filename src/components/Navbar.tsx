import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onCtaClick: () => void;
}

const sections = [
  { id: "project-summary", label: "Overview" },
  { id: "floor-plans", label: "Floor Plans" },
  { id: "location", label: "Location Advantage" },
  { id: "amenities", label: "Amenities and Views" },
  { id: "construction-status", label: "Construction Status" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQs" },
];

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");

    const handleScroll = () => {
      if (!heroSection) return;
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsSticky(heroBottom <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = isSticky ? -60 : -120; // adjust for navbar height
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div
      className={`w-full z-[9999] transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 bg-white shadow-lg"
          : "absolute top-0 left-0 bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => scrollTo("hero-section")}>
          Provident Sunworth
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {sections.map((s) => (
            <li
              key={s.id}
              className="cursor-pointer hover:text-primary transition"
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onCtaClick}
          className="hidden md:block px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          Enquire Now
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col p-4 text-base">
            {sections.map((s) => (
              <li
                key={s.id}
                className="py-3 border-b cursor-pointer hover:text-primary"
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </li>
            ))}

            <button
              onClick={onCtaClick}
              className="mt-4 w-full px-4 py-3 bg-primary text-white rounded-lg"
            >
              Enquire Now
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}
