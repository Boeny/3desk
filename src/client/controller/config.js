var parts = [
	'defaults',
	//'touch',
	'mouse',
	//'keys',
];

module.exports = function(Controller){
	for (var i = 0; i < parts.length; i++){
		merge(Controller, require('./'+parts[i]));
	}
};