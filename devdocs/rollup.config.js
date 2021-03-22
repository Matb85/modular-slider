import sveltePreprocess from "svelte-preprocess";
import svelte from "rollup-plugin-svelte";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
export default {
  input: "devdocs/index.ts",
  output: {
    format: "iife",
    file: "docs/bundle.js",
    name: "bundle",
    sourcemap: false,
  },
  plugins: [
    svelte({ preprocess: sveltePreprocess() }),
    postcss({
      extract: true,
      extract: "bundle.css",
      minimize: true,
    }),
    typescript({ rootDir: "." }),
    commonjs(),
    resolve(),
    terser(),
    alias({
      entries: [
        { find: "@", replacement: "src" },
        { find: "~", replacement: "devdocs" },
        { find: "@style", replacement: "style" },
      ],
    }),
  ],
};
