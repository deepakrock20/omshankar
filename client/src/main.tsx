import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Lightweight window typings for analytics
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

function initGoogleAnalytics() {
  const id = ((import.meta as any).env && (import.meta as any).env.VITE_GA_ID) as string | undefined;
  if (!id) return;

  const load = () => {
    try {
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) return;
      const s = document.createElement("script");
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      s.async = true;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        // @ts-ignore
        window.dataLayer!.push(arguments);
      } as any;
      if (typeof window.gtag === 'function') {
        window.gtag("js", new Date());
        window.gtag("config", id, { anonymize_ip: true, transport_type: "beacon" });
      }
    } catch (e) {
      // Don't block render or break UI; surface a clear console message.
      // eslint-disable-next-line no-console
      console.error("GA initialization failed:", e);
    }
  };

  if ("requestIdleCallback" in window) {
    // schedule non-blocking
    // @ts-ignore
    (window as any).requestIdleCallback(load, { timeout: 2000 });
  } else {
    if (typeof window !== 'undefined' && (window as any).addEventListener) {
      (window as any).addEventListener("load", load, { once: true });
    }
  }
}

// Initialize analytics if configured (non-blocking)
initGoogleAnalytics();

// Set absolute canonical/OG URLs at runtime and inject minimal JSON-LD (non-visual SEO hardening)
function applyAbsoluteMetaAndJsonLd() {
  try {
    const origin = typeof location !== 'undefined' ? location.origin : '';
    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = origin + location.pathname;

    // og:url
    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) ogUrl.content = origin + location.pathname;

    // full absolute image URLs
    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
    const twImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null;
    if (ogImage) ogImage.content = origin + (ogImage.content || '/opengraph.jpg');
    if (twImage) twImage.content = origin + (twImage.content || '/opengraph.jpg');

    // Inject minimal Person JSON-LD
    if (!document.querySelector('script[type="application/ld+json"][data-generated="true"]')) {
      const ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-generated', 'true');
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Omshankar Passi",
        "url": origin,
        "jobTitle": "SEO Specialist & Web Developer"
      });
      document.head.appendChild(ld);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Meta/JSON-LD injection failed:', e);
  }
}

// Run asap but after GA init scheduling so it doesn't block initial script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyAbsoluteMetaAndJsonLd, { once: true });
} else {
  applyAbsoluteMetaAndJsonLd();
}

const rootEl = document.getElementById("root");

if (!rootEl) {
  console.error("❌ React root element not found");
} else {
  createRoot(rootEl).render(<App />);
}

