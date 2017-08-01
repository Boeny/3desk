const dest = __dirname+'/dist/js';
const fs = require('fs');

fs.readdir(dest, (err, files) => {
	if (err) throw err;
	
	files = files.filter((file) => file.match(/.*\.map/ig));
	
	for (var i = 0; i < files.length; i++){
		fs.unlink(dest+'/'+files[i]);
	}
});

const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: __dirname+'/src/client/index.js',
	output: {
		filename: 'index.js',
		path: dest
	},
	
	plugins: [
		new Uglify()
	]
}