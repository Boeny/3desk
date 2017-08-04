class Controller {
	Start(objects){
		this.controls = objects.controls;
		this.shapes = objects.shapes;
		
		this.camera.position.z = this.cameraInitialDistance;
		this.renderer.setClearColor(0xcccccc);
		this.controls.enabled = true;
		
		this.mesh.add(this.camera);
		this.rotation = this.mesh.rotation;
		
		this.prevTime = performance.now();
	}
	
	Update(){
		if (!this.controls.enabled) return;
		
		var time = performance.now();
		var delta = 1 - ( time - this.prevTime ) / 100;
		var screenHasChanged = false;
		
		if (this.hasVelocityChanged('velocityLength', 'velocity'))// moving
		{
			// decrease speed
			this.velocity.x *= delta;
			this.velocity.y *= delta;
			this.velocity.z *= delta;
			
			this.mesh.translateX(this.velocity.x);
			this.mesh.translateY(this.velocity.y);
			this.mesh.translateZ(this.velocity.z);
			
			this.velocityLength = this.velocity.length();
			screenHasChanged = true;
		}
		
		if (this.hasVelocityChanged('angularVelocityLength', 'angularVelocity'))// rotation
		{
			this.angularVelocity.x *= delta;
			this.angularVelocity.y *= delta;
			
			this.rotation.y -= this.angularVelocity.y;
			this.rotation.x = Math.max( -this.PI_2, Math.min(this.PI_2, this.rotation.x - this.angularVelocity.x) );
			
			this.angularVelocityLength = this.angularVelocity.length();
			screenHasChanged = true;
		}
		
		if (this.hasVelocityChanged('cameraVelocityLength', 'cameraVelocity'))// zoom
		{
			this.cameraVelocity.z *= delta;
			this.camera.position.z += this.cameraVelocity.z;
			
			this.cameraVelocityLength = this.cameraVelocity.length();
			screenHasChanged = true;
		}
		
		if (screenHasChanged){
			this.shapes.updateScreenElements();
		}
		
		this.prevTime = time;
	}
	
	hasVelocityChanged(cachedProp, prop){
		return this[cachedProp] && this[cachedProp] > this.minVelocity || this[prop].length() > this.minVelocity
	}
	
	getFirstIntersect(p){
		// update the picking ray with the camera and mouse position
		this.raycaster.setFromCamera(p.toWorld(), this.camera);
		
		// calculate objects intersecting the picking ray
		let intersects = this.raycaster.intersectObjects( this.shapes.mesh );
		
		return intersects.length > 0 ? intersects[0] : null;
	}
	
	intersectAction(action, ...args){
		if (this.hoveredObject && this.hoveredObject[action]){
			this.hoveredObject[action](...args);
		}
	}
	
	//----------------------------------------------- INTERACTIONS
	
	getSpeedByCamera(speed){
		return speed * this.camera.position.z / this.cameraInitialDistance;
	}
	
	startActions(d){
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
	}
	
	stopActions(btn, p){
		if (!this.rotating){
			this.intersectAction('onClick', btn, p);
		}
		this.canRotate = this.rotating = this.canPan = this.pan = false;
	}
};

require('./controller/config')(Controller.prototype);
module.exports = { Controller };
