const handleSubmit = async (data: any) => {
  try {
    // Send to your existing backend (if any)
    // await sendToBackend(data);

    // ---------- SEND TO PRIVYR ----------
    await fetch("https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/5xrM2juN", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
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

    // Close modal after success
    if (onSuccess) onSuccess();

  } catch (error) {
    console.error("Privyr submission failed:", error);
  }
};
