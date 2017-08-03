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