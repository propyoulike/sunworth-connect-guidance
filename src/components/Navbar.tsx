import { useEffect, useState } from "react";

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <div
      className={`w-full z-[9999] transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 bg-white shadow-lg"
          : "absolute top-0 left-0 bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Provident Sunworth</h1>

        <button
          onClick={onCtaClick}
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          Enquire Now
        </button>
      </nav>
    </div>
  );
}
