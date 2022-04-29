import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// https://vitejs.dev/config/
const dedupe = ["svelte"];
const name = "modular-slider";
const entry = "./src/index.ts";
const alias = {
  "@": process.cwd() + "/src",
  "~": process.cwd() + "/devdocs",
};

export default defineConfig(() => {
  if (process.env.TARGET == "DOCS")
    return {
      plugins: [svelte()],
      resolve: { dedupe, alias },
      root: "./devdocs",
      build: {
        minify: true,
        outDir: "../docs",
        emptyOutDir: true,
      },
    };
  else
    return {
      resolve: { dedupe, alias },
      build: {
        lib: { entry, name, formats: ["es"], fileName: format => name + "." + format + ".mjs" },
        outDir: "dist",
      },
    };
});
