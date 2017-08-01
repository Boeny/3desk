const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	output: {
		filename: 'index.js',
		path: __dirname+'/docs/js'
	},
	
	plugins: [
		new Uglify()
	]
}