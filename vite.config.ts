import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Try to import lovable-tagger only if it's available
let componentTagger: (() => any) | undefined;
try {
  componentTagger = (await import("lovable-tagger")).componentTagger;
} catch (e) {
  console.warn("lovable-tagger not found, skipping...");
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
