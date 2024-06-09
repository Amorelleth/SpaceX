import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: "es6",
    emptyOutDir: true,
    outDir: "dist",
  },
  plugins: [react(), dts()],
});
