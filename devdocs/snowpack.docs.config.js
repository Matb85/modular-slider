// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "./": "/",
    "../style": "/style",
    "../src": "/js"
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-typescript",
    ["@snowpack/plugin-postcss", { config: "./devdocs/postcss.config.js" }],
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
