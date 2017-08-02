const Uglify = require('uglifyjs-webpack-plugin');

module.exports = require('./webpack.base')({
	plugins: [
		new Uglify()
	],
	
	output: {
		path: __dirname+'/../docs/js'
	}
});