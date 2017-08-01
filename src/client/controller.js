var controls = require('./controls');
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

module.exports = merge(Controller, require('./controller.config'));
