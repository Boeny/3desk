var parts = [
	//'touch',
	'mouse',
	//'keys',
];

var Controller = {
	mesh: new THREE.Object3D(),
	mouse: new THREE.Vector2(),
	points: [],
	raycaster: new THREE.Raycaster(),
	
	moveForward: false,
	moveBackward: false,
	moveLeft: false,
	moveRight: false,
	
	canRotate: false,
	rotating: false,
	canPan: false,
	pan: false,
	
	prevTime: null,
	velocity: new THREE.Vector3(),
	angularVelocity: new THREE.Vector3(),
	PI_2: Math.PI / 2,
};

for (var i = 0; i < parts.length; i++){
	merge(Controller, require('./controller.'+parts[i]));
}

module.exports = Controller;