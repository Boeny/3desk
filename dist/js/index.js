/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = {
	enabled: false,
	enableKeys: true,
	
	keys: {
		SPACE: 32,
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		W: 87,
		A: 65,
		S: 83,
		D: 68,
	},
	mouse: {
		LEFT: 0,
		WHEEL: 1,
		MIDDLE: 1,
		RIGHT: 2
	},
	
	handlers: {
		keydown: 'onKeyDown',
		keyup: 'onKeyUp',
		
		mousemove: 'onMouseMove',
		mousedown: 'onMouseDown',
		mouseup: 'onMouseUp',
		click: 'onClick',
		wheel: 'onMouseWheel',
		contextmenu: 'onContextMenu',
		
		touchstart: 'onTouchStart',
		touchend: 'onTouchEnd',
		touchmove: 'onTouchMove',
		
	},
	
	Start: function(){
		for (var i = 0; i < this.objects.length; i++){
			let obj = this.objects[i];
			
			for (let eventName in this.handlers){
				let handlerName = this.handlers[eventName];
				
				if (obj[handlerName]){
					this.renderer.domElement.addEventListener(eventName, (e) => {
						if (!this.enabled) return;
						this.eventHandler(e, obj, handlerName);
					}, false);
				}
			}
		}
		
		global.addEventListener('resize', () => {
			this.camera.aspect = global.innerWidth / global.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(global.innerWidth, global.innerHeight);
		}, false);
		
		// Hook pointer lock state change events
		document.addEventListener('pointerlockchange', (e) => this.onPointerLockingChange(e), false);
		document.addEventListener('mozpointerlockchange', (e) => this.onPointerLockingChange(e), false);
		document.addEventListener('webkitpointerlockchange', (e) => this.onPointerLockingChange(e), false);
		
		document.addEventListener('pointerlockerror', (e) => this.onPointerLockingError(e), false);
		document.addEventListener('mozpointerlockerror', (e) => this.onPointerLockingError(e), false);
		document.addEventListener('webkitpointerlockerror', (e) => this.onPointerLockingError(e), false);
	},
	
	eventHandler: function(e, obj, handlerName){
		var handler = obj[handlerName].bind(obj);
		
		e.preventDefault();
		e.stopPropagation();
		
		switch (handlerName){
			case 'onKeyDown':
			case 'onKeyUp':
				if (!this.enableKeys) return;
				return handler(e.keyCode);
			
			case 'onMouseMove':
				return handler(
					new THREE.Vector2(e.clientX, e.clientY),
					new THREE.Vector2(
						e.movementX || e.mozMovementX || e.webkitMovementX || 0,
						e.movementY || e.mozMovementY || e.webkitMovementY || 0
					)
				);
			
			case 'onMouseWheel':
				return handler(e.deltaY);
			
			case 'onClick':
			case 'onMouseUp':
			case 'onMouseDown':
				return handler(e.button, e.clientX, e.clientY);
			
			case 'onTouchStart':
			case 'onTouchMove':
			case 'onTouchEnd':
				let points = new Array(e.touches.length);
				
				for (var i = 0; i < points.length; i++){
					points[i] = new THREE.Vector2(e.touches[i].pageX, e.touches[i].pageY);
				}
				
				return handler(points);
			
			default:
				return handler();
		}
	},
	
	onPointerLockingError: function(){},
	onPointerLockingChange: function(){},
	
	// Ask the browser to lock the pointer
	lockPointer: function(elem){
		let lock = elem.requestPointerLock || elem.mozRequestPointerLock || elem.webkitRequestPointerLock;
		lock && lock();
	},
	isPointerLocked: function(elem){
		return document.pointerLockElement === elem || document.mozPointerLockElement === elem || document.webkitPointerLockElement === elem;
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
	merge(Controller, __webpack_require__(10)("./controller."+parts[i]));
}

module.exports = Controller;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var controls = __webpack_require__(1);
//var shapes = require('./shapes');

var Controller = {
	Start: function(){
		this.camera.position.z = 500;
		this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
		this.renderer.setClearColor( this.scene.fog.color );
		controls.enabled = true;
		
		var pitchObject = new THREE.Object3D();
		pitchObject.add(this.camera);
		this.pitchRot = pitchObject.rotation;
		this.mesh.add(pitchObject);
		
		this.prevTime = performance.now();
	},
	
	Update: function(){
		if (!controls.enabled) return;
		
		var time = performance.now();
		var delta = 1 - ( time - this.prevTime ) / 100;
		
		// decrease speed
		let fields = ['velocity', 'angularVelocity'];
		for (let i = 0; i < fields.length; i++){
			let o = this[fields[i]];
			o.x *= delta;
			o.z *= delta;
			o.y *= delta;
		}
		
		if (this.moveForward)	this.velocity.z -= 4.0;
		if (this.moveBackward)	this.velocity.z += 4.0;
		if (this.moveLeft)		this.velocity.x -= 4.0;
		if (this.moveRight)		this.velocity.x += 4.0;
		
		this.mesh.translateX(this.velocity.x);
		this.mesh.translateY(this.velocity.y);
		this.mesh.translateZ(this.velocity.z);
		
		this.mesh.rotation.y -= this.angularVelocity.y;
		this.pitchRot.x = Math.max( -this.PI_2, Math.min(this.PI_2, this.pitchRot.x - this.angularVelocity.x) );
		
		this.prevTime = time;
	},
	
	getFirstIntersect: function(){
		// update the picking ray with the camera and mouse position
		this.raycaster.setFromCamera(this.mouse, this.camera);
		
		// calculate objects intersecting the picking ray
		let intersects = this.raycaster.intersectObjects( this.scene.children );
		
		return intersects.length > 0 ? intersects[0] : null;
	},
	
	//----------------------------------------------- INTERACTIONS
	
	startActions: function(d){
		if (this.canRotate){
			this.rotating = true;
			this.angularVelocity = d.mult(0.002);
		}
		if (this.canPan){
			this.pan = true;
			d.x *= -1;
			this.velocity = d.mult(0.1);
		}
	},
	stopActions: function(clickCondition){
		if (clickCondition && !this.rotating){
			let intersects = this.getFirstIntersect();
			if (intersects){
				this.mesh.lookAt(intersects.point);
			}
		}
		this.canRotate = this.rotating = this.canPan = this.pan = false;
	}
};

module.exports = merge(Controller, __webpack_require__(2));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var controls = __webpack_require__(1);

module.exports = {
	onKeyDown: function (key) {
		switch (key) {
			case controls.keys.UP:
			case controls.keys.W:
				this.moveForward = true;
				break;
			
			case controls.keys.LEFT:
			case controls.keys.A:
				this.moveLeft = true;
				break;
			
			case controls.keys.DOWN:
			case controls.keys.S:
				this.moveBackward = true;
				break;
			
			case controls.keys.RIGHT:
			case controls.keys.D:
				this.moveRight = true;
				break;
		}
	},
	
	onKeyUp: function (key) {
		switch(key) {
			case controls.keys.UP:
			case controls.keys.W:
				this.moveForward = false;
				break;
			
			case controls.keys.LEFT:
			case controls.keys.A:
				this.moveLeft = false;
				break;
			
			case controls.keys.DOWN:
			case controls.keys.S:
				this.moveBackward = false;
				break;
			
			case controls.keys.RIGHT:
			case controls.keys.D:
				this.moveRight = false;
				break;
		}
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var controls = __webpack_require__(1);

module.exports = {
	onMouseDown: function(btn){
		switch (btn){
			case controls.mouse.LEFT:
				this.canRotate = true;
				break;
			
			case controls.mouse.MIDDLE:
				this.canPan = true;
				break;
		}
	},
	
	onMouseUp: function(btn){
		this.stopActions(btn == controls.mouse.LEFT);
	},
	
	onMouseMove: function(p, d){
		this.mouse.x = (p.x / global.innerWidth ) * 2 - 1;
		this.mouse.y = -(p.y / global.innerHeight ) * 2 + 1;
		
		/*let intersects = this.getFirstIntersect();
		if (intersects){
			intersects.mesh.material.setColor();
		}*/
		
		this.startActions(d);
	},
	
	onMouseWheel: function(delta){
		this.velocity.z += delta / 10;
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	onTouchStart: function(points){
		this.points = points;
		
		if (points.length > 1){
			this.canPan = true;
		}
		else{
			this.canRotate = true;
		}
	},
	
	onTouchMove: function(points){
		var p = this.points[0];
		this.startActions((points[0].x - p.x)/10, (points[0].y - p.y)/10);
	},
	
	onTouchEnd: function(points){
		this.stopActions(points.length == 1);
	}
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

global.random = function(min, max){
	return Math.random() * (max - min) + min;
};/*
THREE.Vector2.prototype.mult = function(v){
	return new THREE.Vector2(v.x * this.x, v.y * this.y);
};
THREE.Vector3.prototype.mult = function(v){
	return new THREE.Vector3(v.x * this.x, v.y * this.y, v.z * this.z);
};*/

__webpack_require__(8)([
	__webpack_require__(3),
	__webpack_require__(11),
	__webpack_require__(12),
	__webpack_require__(1),
]);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var { Start, Update } = __webpack_require__(9);
var scene, camera, renderer, objects = [];
var options = {
	viewAngle: 60,
	nearClip: 1,
	farClip: 1000
};
//global.THREE = require('three');

global.onload = function(){
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(options.viewAngle, global.innerWidth / global.innerHeight, options.nearClip, options.farClip);
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

module.exports = function(models, _opts){
	if (!models) return;
	
	merge(options, _opts || {});
	for (var i = 0; i < models.length; i++){
		objects.push(models[i]);
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {global.merge = function(o1, o2){
	if (!o1) o1 = {};
	var keys = Object.keys(o2 || {});
	
	for (var i = 0; i < keys.length; i++){
		o1[keys[i]] = o2[keys[i]];
	}
	return o1;
};

var objects, updates = [];

exports.Start = function(scene, camera, renderer, objs){
	objects = objs;
	
	for (var i in objects){
		let o = objects[i];
		
		o.objects = objs;
		o.scene = scene;
		o.camera = camera;
		o.renderer = renderer;
		
		o.Start();
		
		if (o.mesh){
			if (o.mesh instanceof Array){
				for (var j = 0; j < o.mesh.length; j++){
					scene.add(o.mesh[j]);
				}
			}
			else{
				scene.add(o.mesh);
			}
		}
		
		if (o.Update) updates.push(o.Update.bind(o));
	}
};

exports.Update = function(){
	for (var i = 0; i < updates.length; i++){
		updates[i]();
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./controller.config": 2,
	"./controller.config.js": 2,
	"./controller.js": 3,
	"./controller.keys": 4,
	"./controller.keys.js": 4,
	"./controller.mouse": 5,
	"./controller.mouse.js": 5,
	"./controller.touch": 6,
	"./controller.touch.js": 6
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
	Start: function(){
		this.mesh = [
			this.getLight('Hemisphere', [0xeeeeff, 0x777788, 0.75], [0.5, 1, 0.75]),
			this.getLight('Directional', [0xffffff], [1, 1, 1]),
			this.getLight('Directional', [0x002288], [-1, -1, -1]),
			this.getLight('Ambient', [0x222222]),
		];
	},
	
	getLight: function(type, args, pos){
		var light = new THREE[type+'Light'](...args);
		if (pos) light.position.set(...pos);
		return light;
	}
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
	mesh: [],
	data: [
		{name: '.git',	isFolder: true},
		{name: '3d',	isFolder: true},
		{name: 'dist',	isFolder: true},
		{name: 'simple-server',	isFolder: true},
		{name: 'src',			isFolder: true},
		
		{name: 'LICENSE',		isFolder: false},
		{name: '.gitignore',	isFolder: false},
		{name: 'package.json',	isFolder: false},
		{name: 'README.md',		isFolder: false},
		{name: 'webpack.config.js',	isFolder: false},
		{name: 'webpack.config.prod.js',	isFolder: false},
	],
	
	Start: function(){
		let geometry = new THREE.BoxGeometry(20, 20, 20);
		
		for (var i = 0; i < geometry.faces.length; i++) {
			let face = geometry.faces[i];
			face.vertexColors[0] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[1] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[2] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
		}
		
		let material = new THREE.MeshPhongMaterial({
			specular: 0xffffff,
			shading: THREE.FlatShading,
			vertexColors: THREE.VertexColors
		});
		
		for (i = 0; i < this.data.length; i++) {
			material.color.setHSL( random(0.5, 0.7), 0.75, random(0.75, 1) );
			
			let mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = random(-200, 200);
			mesh.position.y = random(-200, 200);
			mesh.position.z = random(-200, 200);
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			
			let textElem = document.createElement('div');
			textElem.className = 'title';
			textElem.innerHTML = this.data[i].name;
			mesh.textElem = textElem;
			document.body.appendChild(textElem);
			
			this.mesh.push(mesh);
		}
	}
};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map