import { useEffect, useRef } from 'react';

interface ScrollDepthEvent {
  event: string;
  scrollDepth: number;
  scrollPercentage: string;
}

interface SectionViewEvent {
  event: string;
  sectionName: string;
  sectionId: string;
}

export const useScrollTracking = () => {
  const scrollDepthsTracked = useRef<Set<number>>(new Set());
  const sectionsTracked = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Scroll depth percentages to track
    const depthThresholds = [25, 50, 75, 100];

    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

      // Track scroll depth milestones
      depthThresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !scrollDepthsTracked.current.has(threshold)) {
          scrollDepthsTracked.current.add(threshold);
          
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'scroll_depth',
            scrollDepth: threshold,
            scrollPercentage: `${threshold}%`,
          } as ScrollDepthEvent);
        }
      });

      // Track section visibility
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('data-section') || '';
        const sectionName = section.getAttribute('data-section-name') || sectionId;

        // Check if section is in viewport (at least 50% visible)
        const isVisible =
          rect.top < window.innerHeight * 0.75 &&
          rect.bottom > window.innerHeight * 0.25;

        if (isVisible && !sectionsTracked.current.has(sectionId)) {
          sectionsTracked.current.add(sectionId);
          
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'section_view',
            sectionName,
            sectionId,
          } as SectionViewEvent);
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
};

export const trackWhatsAppClick = (source: string = 'unknown') => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    clickSource: source,
    eventCategory: 'WhatsApp',
    eventLabel: 'Click to WhatsApp',
  });
};

export const trackCTAClick = (ctaText: string, location: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'cta_click',
    ctaText,
    ctaLocation: location,
    eventCategory: 'CTA',
    eventLabel: `${ctaText} - ${location}`,
  });
};
