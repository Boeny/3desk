module.exports = {
	canRotate: false,
	rotating: false,
	canPan: false,
	pan: false,
	
	rotSpeed: 0.01,
	panSpeed: 0.1,
	zoomSpeed: 0.1,
	
	onMouseDown: function(btn, p){
		this.intersectAction('onMouseDown', btn, p, this.intersects);
		
		switch (btn){
			case this.controls.mouse.RIGHT:
				this.canRotate = true;
				
			case this.controls.mouse.LEFT:
				if (!this.hoveredObject && !this.controls.keys.CTRL) this.shapes.toggleActiveAll(false);
				break;
			
			case this.controls.mouse.MIDDLE:
				this.canPan = true;
				break;
		}
	},
	
	onMouseUp: function(btn, p){
		this.intersectAction('onMouseUp', btn, p);
		this.stopActions(btn, p);
	},
	
	onMouseMove: function(p, d){
		this.intersects = this.getFirstIntersect(p);
		
		if (this.intersects)
		{
			// new object or above an other object
			if (!this.hoveredObject || this.hoveredObject.name !== this.intersects.object.name)
			{
				this.intersectAction('onMouseLeave');
				this.hoveredObject = this.intersects.object;
				this.intersectAction('onMouseEnter');
			}
			else{// above the same object
				this.intersectAction('onMouseMove', p, d, this.intersects);
			}
		}
		else{
			if (this.hoveredObject){
				this.intersectAction('onMouseLeave');
				this.hoveredObject = null;
			}
		}
		
		this.startActions(d);
	},
	
	onMouseWheel: function(delta){
		this.cameraVelocity.z += delta * this.getSpeedByCamera(this.zoomSpeed);
	},
	
	onContextMenu: function(){}
};