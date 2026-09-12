import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Set this to "/<repo-name>/" if you deploy to GitHub Pages from a subpath.
  base: "/",
  server: { port: 5173 },
});
