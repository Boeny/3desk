const webpack = require('webpack');

module.exports = require('./webpack.base')({
	devServer: {
		port: 80,
		contentBase: './dist',
		hot: true
	},
	
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
});