import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const dedupe = ["svelte"];
const name = "modular-slider";
const entry = "./src/index.ts";
const alias = {
    "@": process.cwd() + "/src",
    "~": process.cwd() + "/devdocs",
};

export default defineConfig(({ command }) => {
    if (process.env.TARGET === "DOCS")
        return {
            base: command === "build" ? "/modular-slider/" : "/",
            plugins: [
                tailwindcss(),
                svelte({
                    configFile: false,
                    preprocess: sveltePreprocess({ typescript: true }),
                }),
            ],
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
                lib: { entry, name, formats: ["es"], fileName: format => "index.mjs" },
                outDir: "dist",
            },
            plugins: [dts({ tsconfigPath: "./tsconfig.build.json" })],
        };
});
