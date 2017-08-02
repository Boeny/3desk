const dest = __dirname+'/../dist/js';
const fs = require('fs');

fs.readdir(dest, (err, files) => {
	if (err) throw err;
	
	files = files.filter((file) => file.match(/.*\.map/ig));
	
	for (var i = 0; i < files.length; i++){
		fs.unlink(dest+'/'+files[i]);
	}
});

const Uglify = require('uglifyjs-webpack-plugin');

module.exports = require('./webpack.base')({
	plugins: [
		new Uglify()
	]
});