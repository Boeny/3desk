module.exports = {
	onMouseDown: function(btn, p){
		this.intersectAction('onMouseDown', btn, p);
		
		switch (btn){
			case this.controls.mouse.LEFT:
				break;
			
			case this.controls.mouse.RIGHT:
				this.canRotate = true;
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
		this.mouse.x = 2 * p.x / global.innerWidth - 1;
		this.mouse.y = 1 - 2 * p.y / global.innerHeight;
		
		this.intersects = this.getFirstIntersect();
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
				this.intersectAction('onMouseMove', p, d);
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