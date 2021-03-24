// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    dev: "/",
    src: "/js",
    style: "/style",
    assets: "/assets"
  },
  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-postcss"],
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
    "@": "./src"
  }
};
