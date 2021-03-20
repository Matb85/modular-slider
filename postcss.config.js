const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

const plugins = [autoprefixer(), cssnano()];
module.exports = {
  plugins
};
