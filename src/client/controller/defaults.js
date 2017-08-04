module.exports = {
	mesh: new THREE.Object3D(),
	rotation: new THREE.Vector3(),
	minVelocity: 0.01,
	
	velocity: new THREE.Vector3(),
	velocityLength: 0,
	
	angularVelocity: new THREE.Vector3(),
	angularVelocityLength: 0,
	
	cameraVelocity: new THREE.Vector3(),
	cameraVelocityLength: 0,
	
	points: [],
	raycaster: new THREE.Raycaster(),
	
	intersects: null,// THREE.Raycaster.Intersection,
	hoveredObject: null,// Shape,
	
	cameraInitialDistance: 500,
	
	prevTime: 0,
	PI_2: Math.PI / 2,
};