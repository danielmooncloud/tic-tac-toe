var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname + "/app/js",
	entry: "./view.js",
	output: {
		path: __dirname + "/public",
		filename: "app.bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: "/node_modules/",
				loaders: ["babel-loader", "eslint-loader"]
			},
			{
				test: /\.scss$/,
				exclude: "/node_modules/",
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader", 
					use: "css-loader!sass-loader"
				})
			}
		]
	},
	
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
 				jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

		new ExtractTextPlugin("[name].css")
	]
}