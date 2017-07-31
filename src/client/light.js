module.exports = {
	Start: function(){
		this.mesh = [
			this.getLight('Hemisphere', [0xeeeeff, 0x777788, 0.75], [0.5, 1, 0.75]),
			this.getLight('Directional', [0xffffff], [1, 1, 1]),
			this.getLight('Directional', [0x002288], [-1, -1, -1]),
			this.getLight('Ambient', [0x222222]),
		];
	},
	
	getLight: function(type, args, pos){
		var light = new THREE[type+'Light'](...args);
		if (pos) light.position.set(...pos);
		return light;
	}
};