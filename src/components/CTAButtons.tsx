interface FormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

interface HandleSubmitOptions {
  data: FormData;
  onSuccess?: () => void;
}

const handleSubmit = async ({ data, onSuccess }: HandleSubmitOptions) => {
  try {
    // ---------- SEND TO PRIVYR ----------
    await fetch("https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/5xrM2juN", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        phone_number: data.phone,          // FIXED
        email: data.email || "",
        message: data.message || "Landing page enquiry",
        source: "Provident Sunworth Landing Page",
      }),
    });

    // ---------- GA4 Event ----------
    if ((window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "engagement",
        event_label: "Lead Form Submission",
      });
    }

    // ---------- Meta Pixel ----------
    if ((window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    // ---------- Close modal / UI callback ----------
    onSuccess?.();
  } catch (error) {
    console.error("Privyr submission failed:", error);
  }
};
