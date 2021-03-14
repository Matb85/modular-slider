// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		dev: "/",
		src: "/",
		style: "/style",
		/* ... */
	},
	plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-sass"],
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
		"@": "./src",
	},
};
