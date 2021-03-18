const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

const plugins = [tailwindcss(), autoprefixer()];
if (process.env.NODE_ENV === "production") plugins.push(cssnano());

module.exports = {
  plugins,
};
