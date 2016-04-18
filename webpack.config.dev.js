var path = require('path');
var webpack = require('webpack');

module.exports = {
	// or devtool: 'eval' to debug issues with compiled output:
	devtool: 'cheap-module-eval-source-map',
	entry: [
		// necessary for hot reloading with IE:
		'eventsource-polyfill',
		// listen to code updates emitted by hot middleware:
		'webpack-hot-middleware/client',
		// your code:
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		},
			{test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel'},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	}
};
