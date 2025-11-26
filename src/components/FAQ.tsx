const FAQ = () => {
  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">

        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

        <div className="space-y-8">

          {/* QUESTION 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-2">
              1. What floor plans are available?
            </h3>
            <p className="text-gray-600">
              Provident Sunworth City offers 2 BHK, 3 BHK Regular and 3 BHK Royale units.
              You can explore full details including SBA, carpet area, walkthrough videos and pricing.
              <button
                onClick={() => scrollToSection("floorplans")}
                className="ml-1 text-blue-600 underline"
              >
                Jump to Floor Plans
              </button>
            </p>
          </div>

          {/* QUESTION 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-2">
              2. What amenities are available in the township?
            </h3>
            <p className="text-gray-600">
              You get 19-acre open lung space, 2 clubhouses, sports facilities, kids’ play zones,
              walking trails, retail conveniences and more—designed for day-to-day comfort.
              <button
                onClick={() => scrollToSection("amenities")}
                className="ml-1 text-blue-600 underline"
              >
                View Amenities
              </button>
            </p>
          </div>

          {/* QUESTION 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-2">
              3. How do I schedule a site visit?
            </h3>
            <p className="text-gray-600">
              You can schedule a site visit using our instant lead form or WhatsApp.
              <br />
              <a
                href="#leadform"
                className="text-blue-600 underline"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("leadform");
                }}
              >
                Fill Site Visit Form
              </a>
              {" "}or{" "}
              <a
                href="https://wa.me/919379822010"
                target="_blank"
                className="text-green-600 underline"
              >
                WhatsApp Us
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
