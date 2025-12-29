import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Split vendor dependencies into separate chunks to lower initial bundle and improve caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Bundle react into the catch-all vendor chunk to avoid a possible runtime
            // evaluation ordering issue where the React internals object is undefined
            // during module evaluation when react is isolated. This keeps bundling
            // non-visual and focuses on reliability.
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('three') || id.includes('vanta')) return 'vendor-graphics';
            // catch-all for other large libs (radix, recharts, etc.) — includes react now
            return 'vendor~misc';
          }
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1500, // raise warning threshold (KB) to avoid noisy warnings
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
