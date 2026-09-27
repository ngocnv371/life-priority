import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built `dist/` folder can be opened straight from disk
// or dropped on any static host / USB stick for a lecture hall.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    target: "es2020",
    chunkSizeWarningLimit: 2000,
  },
});
