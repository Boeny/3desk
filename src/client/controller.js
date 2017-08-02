var controls = require('./controls');
var shapes = require('./shapes');

var Controller = {
	Start: function(){
		this.camera.position.z = this.cameraInitialDistance;
		this.renderer.setClearColor(0xcccccc);
		controls.enabled = true;
		
		this.mesh.add(this.camera);
		this.rotation = this.mesh.rotation;
		
		this.prevTime = performance.now();
	},
	
	Update: function(){
		if (!controls.enabled) return;
		
		var time = performance.now();
		var delta = 1 - ( time - this.prevTime ) / 100;
		
		// decrease speed
		this.velocity.x *= delta;
		this.velocity.y *= delta;
		this.velocity.z *= delta;
		
		if (this.moveForward)	this.velocity.z -= 4.0;
		if (this.moveBackward)	this.velocity.z += 4.0;
		if (this.moveLeft)		this.velocity.x -= 4.0;
		if (this.moveRight)		this.velocity.x += 4.0;
		
		this.mesh.translateX(this.velocity.x);
		this.mesh.translateY(this.velocity.y);
		this.mesh.translateZ(this.velocity.z);
		
		// rotation
		this.angularVelocity.x *= delta;
		this.angularVelocity.y *= delta;
		
		this.rotation.y -= this.angularVelocity.y;
		this.rotation.x = Math.max( -this.PI_2, Math.min(this.PI_2, this.rotation.x - this.angularVelocity.x) );
		
		this.cameraVelocity.z *= delta;
		this.camera.position.z += this.cameraVelocity.z;
		
		this.prevTime = time;
	},
	
	getFirstIntersect: function(){
		// update the picking ray with the camera and mouse position
		this.raycaster.setFromCamera(this.mouse, this.camera);
		
		// calculate objects intersecting the picking ray
		let intersects = this.raycaster.intersectObjects( shapes.mesh );
		
		return intersects.length > 0 ? intersects[0] : null;
	},
	
	//----------------------------------------------- INTERACTIONS
	
	getSpeedByCamera: function(speed){
		return speed * this.camera.position.z / this.cameraInitialDistance;
	},
	
	startActions: function(d){
		if (this.canRotate){
			this.rotating = true;
			this.angularVelocity.x = d.y * this.rotSpeed;
			this.angularVelocity.y = d.x * this.rotSpeed;
		}
		if (this.canPan){
			this.pan = true;
			let k = this.getSpeedByCamera(this.panSpeed);
			this.velocity.x -= d.x * k;
			this.velocity.y += d.y * k;
		}
	},
	stopActions: function(clickCondition){
		if (clickCondition && !this.rotating){
			let intersects = this.getFirstIntersect();
			if (intersects){
				intersects.object.onClick();
			}
		}
		this.canRotate = this.rotating = this.canPan = this.pan = false;
	}
};

module.exports = merge(Controller, require('./controller.config'));
