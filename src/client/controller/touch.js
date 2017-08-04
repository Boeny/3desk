module.exports = {
	button: null,
	
	onTouchStart: function(points){
		this.points = points;
		this.button = points.length > 1 ? this.controls.mouse.MIDDLE : this.controls.mouse.RIGHT;
		this.onMouseDown(this.button, points[0]);
	},
	
	onTouchMove: function(points){
		var oldp = this.points[0];
		var p = points[0];
		
		this.onMouseMove(p, new THREE.Vector2( (p.x - oldp.x)/10, (p.y - oldp.y)/10 ));
	},
	
	onTouchEnd: function(points){
		this.onMouseUp(this.button, points[0]);
	}
};
