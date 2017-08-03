'use strict';

global.random = function(min, max){
	return Math.random() * (max - min) + min;
};

require('3d')([// import classes
	require('./controller'),
	require('./light'),
	require('./shapes'),
	require('./controls'),
], {
	farClip: 10000
});