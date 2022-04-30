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

export default defineConfig(({ command }) => {
  if (process.env.TARGET == "DOCS")
    return {
      base: command == "build" ? "/modular-slider/" : "/",
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
        rollupOptions: {
          output: {
            assetFileNames: assetInfo => {
              if (assetInfo.name == "style.css") return "modular-slider.css";
              return assetInfo.name;
            },
          },
        },
        lib: { entry, name, formats: ["es"], fileName: format => name + "." + format + ".mjs" },
        outDir: "dist",
      },
    };
});
