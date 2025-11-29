import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // Helper: trigger tracking events
  const trackEvent = (eventName, eventData = {}) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...eventData,
      });
    }
  };

  return (
    <>
      {/* expose to all components */}
      <Component
        {...pageProps}
        trackEvent={trackEvent}
      />
    </>
  );
}
