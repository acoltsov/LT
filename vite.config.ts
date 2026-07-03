import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base so the build works at any URL, including GitHub Pages
  // project sites (https://<user>.github.io/<repo>/).
  base: "./",
  plugins: [react(), tailwindcss()],
});
