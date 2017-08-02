var defaults = {
	entry: './src/client/index.js',
	
	output: {
		filename: 'index.js',
		path: __dirname+'/../dist/js'
	}
};

const merge = require('webpack-merge');

module.exports = function(config){
	return merge(defaults, config);
}