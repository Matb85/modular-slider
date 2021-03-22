const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [tailwindcss("./devdocs/tailwind.config.js"), autoprefixer()]
};
