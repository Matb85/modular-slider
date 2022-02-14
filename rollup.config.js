import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import strip from "@rollup/plugin-strip";

export default {
  input: "src/index.ts",
  output: {
    format: "esm",
    file: "dist/modular-slider.mjs",
    name: "modular-slider",
  },
  plugins: [
    postcss({ extract: __dirname + "/dist/modular-slider.css" }),
    typescript({ clean: true }),
    commonjs(),
    resolve(),
    strip({ include: ["**/*.js", "**/*.ts"] }),
  ],
};
