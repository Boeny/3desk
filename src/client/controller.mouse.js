var controls = require('./controls');

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