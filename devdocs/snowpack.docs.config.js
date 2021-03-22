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
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-postcss",
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
