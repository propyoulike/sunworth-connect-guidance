import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById("navbar-anchor");

    const handleScroll = () => {
      if (!anchor) return;

      const anchorTop = anchor.getBoundingClientRect().top;

      // When anchor touches top = make sticky
      setIsSticky(anchorTop <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full z-[9999] transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 bg-white shadow-md" : "relative bg-white"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Provident Logo */}
        <img
          src="https://www.providenthousing.com/wp-content/themes/provident/assets/images/Provident_logo_final_blacks.png"
          alt="Provident Logo"
          className="h-10 w-auto cursor-pointer"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("project-summary")?.scrollIntoView({ behavior: "smooth" })}>Overview</li>
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("floor-plans")?.scrollIntoView({ behavior: "smooth" })}>Plans</li>
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })}>Location</li>
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" })}>Amenities</li>
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("payment-plans")?.scrollIntoView({ behavior: "smooth" })}>Pricing</li>
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("about-provident")?.scrollIntoView({ behavior: "smooth" })}>About</li>
          <li className="cursor-pointer hover:text-primary transition" onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>FAQ</li>
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={onCtaClick}
          className="hidden md:block px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          Enquire Now
        </button>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col p-4 text-base">
            <li className="py-3 border-b cursor-pointer" onClick={() => document.getElementById("project-summary")?.scrollIntoView({ behavior: "smooth" })}>Overview</li>
            <li className="py-3 border-b cursor-pointer" onClick={() => document.getElementById("floor-plans")?.scrollIntoView({ behavior: "smooth" })}>Plans</li>
            <li className="py-3 border-b cursor-pointer" onClick={() => document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })}>Location</li>
            <li className="py-3 border-b cursor-pointer" onClick={() => document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" })}>Amenities</li>
            <li className="py-3 border-b cursor-pointer" onClick={() => document.getElementById("about-provident")?.scrollIntoView({ behavior: "smooth" })}>About</li>
            <li className="py-3 border-b cursor-pointer" onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>FAQ</li>

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
