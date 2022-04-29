import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// https://vitejs.dev/config/
const dedupe = ["svelte"];
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    dedupe,
    alias: {
      "@": process.cwd() + "/src",
      "~": process.cwd() + "/devdocs",
    },
  },
  root: "./devdocs",
  build: {
    minify: true,
    outDir: "../docs",
    emptyOutDir: true,
  },
});
