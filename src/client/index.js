'use strict';

global.random = function(min, max){
	return Math.random() * (max - min) + min;
};

require('3d')([
	require('./controller'),
	require('./light'),
	require('./shapes'),
	require('./controls'),
]);