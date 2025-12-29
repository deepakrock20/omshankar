import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Global runtime error handlers - attach **before** dynamically loading app code
window.addEventListener("error", (e) => {
  try {
    const ev = e as ErrorEvent;
    const info = {
      message: ev.message,
      filename: ev.filename,
      lineno: ev.lineno,
      colno: ev.colno,
      stack: (ev.error && ev.error.stack) || undefined,
    };
    // eslint-disable-next-line no-console
    console.error("Runtime error:", info);

    // If the error comes from a same-origin /assets/*.js, fetch a snippet for debugging
    if (typeof ev.filename === 'string' && ev.filename.startsWith(location.origin) && ev.filename.includes('/assets/')) {
      fetchSnippetAndLog(ev.filename, ev.lineno || 0).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch snippet:', err);
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error handler failed:', err);
  }
});

window.addEventListener("unhandledrejection", (e) => {
  try {
    const ev = e as PromiseRejectionEvent;
    const reason = (ev.reason && (ev.reason.message || ev.reason.toString())) || String(ev.reason);
    // eslint-disable-next-line no-console
    console.error("Unhandled rejection:", { reason });
    try { ev.preventDefault(); } catch (_) {}
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unhandled rejection handler failed:', err);
  }
});

async function fetchSnippetAndLog(url: string, lineno: number) {
  try {
    const resp = await fetch(url, { cache: 'no-store' });
    if (!resp.ok) throw new Error('Non-OK response ' + resp.status);
    const text = await resp.text();
    const lines = text.split(/\r?\n/);
    const index = Math.max(0, lineno - 10);
    const snippet = lines.slice(index, index + 40).map((l, i) => `${index + i + 1}: ${l}`).join('\n');
    // eslint-disable-next-line no-console
    console.groupCollapsed(`Remote snippet ${url} lines ${index + 1}-${index + 40}`);
    // eslint-disable-next-line no-console
    console.log(snippet);
    // eslint-disable-next-line no-console
    console.groupEnd();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('fetchSnippetAndLog error:', err);
  }
}

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

// Minimal ErrorBoundary to prevent a single component error from aborting the whole app
class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  componentDidCatch(error: any, info: any) {
    // eslint-disable-next-line no-console
    console.error("React ErrorBoundary caught:", error, info);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children || null;
  }
}

const rootEl = document.getElementById("root");

if (!rootEl) {
  console.error("❌ React root element not found");
} else {
  // Dynamically import the app so global handlers are installed before app modules evaluate
  import("./App")
    .then(({ default: App }) => {
      createRoot(rootEl).render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    })
    .catch((err) => {
      // If app module fails to load, log clearly but do not throw
      // eslint-disable-next-line no-console
      console.error("Failed to load App module:", err);
    });
}

