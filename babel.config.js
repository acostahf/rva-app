const plugin = require("tailwindcss");

module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		// plugin: [
		// "@babel/plugin-proposal-export-namespace-from",
		// "react-native-reanimated/plugin",
		// ],
	};
};
