// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  mount: {
    "./": "/",
    "../style": "/style",
    "../src": "/js"
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
        preprocess: [require("svelte-windicss-preprocess").preprocess()]
      }
    ],
    "@snowpack/plugin-typescript",
    // ["@snowpack/plugin-postcss", { config: "./devdocs/postcss.config.js" }],
    "@snowpack/plugin-sass"
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    "@": "../src",
    "~": "./",
    "@style": "../style"
  }
};
