module.exports = {
	mesh: new THREE.Object3D(),
	velocity: new THREE.Vector3(),
	angularVelocity: new THREE.Vector3(),
	rotation: new THREE.Vector3(),
	cameraVelocity: new THREE.Vector3(),
	
	mouse: new THREE.Vector2(),
	points: [],
	raycaster: new THREE.Raycaster(),
	
	moveForward: false,
	moveBackward: false,
	moveLeft: false,
	moveRight: false,
	
	intersects: null,// THREE.Raycaster.Intersection,
	hoveredObject: null,// Shape,
	
	canDrag: false,
	canRotate: false,
	rotating: false,
	canPan: false,
	pan: false,
	
	cameraInitialDistance: 500,
	rotSpeed: 0.01,
	panSpeed: 0.1,
	zoomSpeed: 0.1,
	
	prevTime: 0,
	PI_2: Math.PI / 2,
};