module.exports = {
	entry: __dirname+'/src/client/index.js',
	output: {
		filename: 'index.js',
		path: __dirname+'/dist/js'
	},
	watch: true,
	devtool: 'source-map'
}