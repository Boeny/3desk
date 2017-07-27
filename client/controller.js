var controls = require('./controls');
var shapes = require('./shapes');

module.exports = {
	mesh: new THREE.Object3D(),
	mouse: new THREE.Vector2(),
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
	PI_2: Math.PI / 2,
	
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
		var delta = ( time - this.prevTime ) / 100;
		
		this.velocity.x -= this.velocity.x * delta;
		this.velocity.z -= this.velocity.z * delta;
		this.velocity.y -= this.velocity.y * delta;
		
		if (this.moveForward)	this.velocity.z -= 4.0 * delta;
		if (this.moveBackward)	this.velocity.z += 4.0 * delta;
		if (this.moveLeft)		this.velocity.x -= 4.0 * delta;
		if (this.moveRight)		this.velocity.x += 4.0 * delta;
		
		this.mesh.translateX(this.velocity.x * delta);
		this.mesh.translateY(this.velocity.y * delta);
		this.mesh.translateZ(this.velocity.z * delta);
		
		this.prevTime = time;
	},
	
	getFirstIntersect: function(){
		// update the picking ray with the camera and mouse position
		this.raycaster.setFromCamera(this.mouse, this.camera);
		
		// calculate objects intersecting the picking ray
		let intersects = this.raycaster.intersectObjects( this.scene.children );
		
		return intersects.length > 0 ? intersects[0] : null;
	},
	
	//----------------------------------------------- EVENTS
	
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
	onMouseUp: function(){
		this.canRotate = this.rotating = this.canPan = this.pan = false;
	},
	onClick: function(btn){
		switch (btn){
			case controls.mouse.LEFT:
				let intersects = this.getFirstIntersect();
				if (intersects){
					this.mesh.lookAt(intersects.point);
				}
				break;
		}
	},
	onMouseMove: function(p, dx, dy){
		this.mouse.x = (p.x / global.innerWidth ) * 2 - 1;
		this.mouse.y = -(p.y / global.innerHeight ) * 2 + 1;
		
		let intersects = this.getFirstIntersect();
		if (intersects){
			intersects.mesh.material.setColor();
		}
		
		if (this.canRotate){
			this.rotating = true;
			this.mesh.rotation.y -= dx * 0.002;
			this.pitchRot.x = Math.max( -this.PI_2, Math.min(this.PI_2, this.pitchRot.x - dy * 0.002) );
		}
		if (this.canPan){
			this.pan = true;
			let delta = 4.0 * ( performance.now() - this.prevTime ) / 100;
			this.velocity.x -= dx * delta;
			this.velocity.y += dy * delta;
		}
	},
	onMouseWheel: function(delta){
		this.velocity.z += delta * 4.0 * ( performance.now() - this.prevTime ) / 100;
	},
	
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
			
			case controls.keys.SPACE:
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
	},
};