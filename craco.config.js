const path = require("path");

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			return {
				...webpackConfig,
				entry: {
					main: [
						env === "development" &&
							require.resolve("react-dev-utils/webpackHotDevClient"),
						paths.appIndexJs,
					].filter(Boolean),
					content: path.resolve(__dirname, "src/chrome/content.tsx"),
				},
				output: {
					...webpackConfig.output,
					filename: "static/js/[name].js",
				},
				module: {
					rules: [
						{
							test: /\.(ts|tsx)$/,
							use: "ts-loader",
							exclude: /node_modules/,
						},
						{
							test: /\.css$/, // Handling CSS files
							use: ["style-loader", "css-loader"],
						},
						{
							test: /\.(svg|png|jpg|gif)$/, // Handling image files
							use: ["file-loader"],
						},
					],
				},
				resolve: {
					extensions: [".ts", ".tsx", ".js"],
					fallback: {
						path: require.resolve("path-browserify"),
					},
				},
				optimization: {
					runtimeChunk: false,
				},
			};
		},
	},
};
