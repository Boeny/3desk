var controls = require('./controls');

module.exports = {
	onMouseDown: function(btn){
		switch (btn){
			case controls.mouse.LEFT:
			case controls.mouse.RIGHT:
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
		this.mouse.x = 2 * p.x / global.innerWidth - 1;
		this.mouse.y = 1 - 2 * p.y / global.innerHeight;
		
		let intersects = this.getFirstIntersect();
		if (intersects){
			if (!this.hoveredObject){
				this.hoveredObject = intersects.object;
				this.hoveredObject.onMouseEnter();
			}
		}
		else{
			if (this.hoveredObject){
				this.hoveredObject.onMouseLeave();
				this.hoveredObject = null;
			}
		}
		
		this.startActions(d);
	},
	
	onMouseWheel: function(delta){
		this.cameraVelocity.z += delta * this.getSpeedByCamera(this.zoomSpeed);
	},
	
	onContextMenu: function(){
		let intersects = this.getFirstIntersect();
		if (intersects){
			intersects.object.onClick();
		}
	}
};