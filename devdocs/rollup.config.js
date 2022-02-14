import sveltePreprocess from "svelte-preprocess";
import svelte from "rollup-plugin-svelte";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import strip from "@rollup/plugin-strip";

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
      extract: "bundle.css",
      minimize: true,
    }),
    typescript({ rootDir: ".", sourceMap: false }),
    commonjs(),
    resolve(),
    alias({
      entries: [
        { find: "@", replacement: "src" },
        { find: "~", replacement: "devdocs" },
        { find: "@style", replacement: "style" },
      ],
    }),
    babel({ exclude: "./node_modules/**" }),
    terser(),
    strip({ include: ["**/*.js", "**/*.ts", "**/*.svelte"] }),
  ],
};
