'use strict';

global.random = function(min, max){
	return Math.random() * (max - min) + min;
};/*
THREE.Vector2.prototype.mult = function(v){
	return new THREE.Vector2(v.x * this.x, v.y * this.y);
};
THREE.Vector3.prototype.mult = function(v){
	return new THREE.Vector3(v.x * this.x, v.y * this.y, v.z * this.z);
};*/

require('3d')([
	require('./controller'),
	require('./light'),
	require('./shapes'),
	require('./controls'),
]);