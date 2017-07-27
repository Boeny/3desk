var { Start, Update } = require('./base');
var scene, camera, renderer, objects = [];
global.THREE = require('three');

global.onload = function(){
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(60, global.innerWidth / global.innerHeight, 1, 1000);
	camera.lookAt( scene.position );
	
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( global.devicePixelRatio );
	renderer.setSize( global.innerWidth, global.innerHeight );
	document.body.appendChild( renderer.domElement );
	
	Start(scene, camera, renderer, objects);
	render();
};

function render() {
	requestAnimationFrame(render);
	Update();
	renderer.render(scene, camera);// render the scene
}

module.exports = function(models){
	if (!models) return;
	
	for (var i = 0; i < models.length; i++){
		objects.push(models[i]);
	}
};