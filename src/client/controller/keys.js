module.exports = {
	onKeyDown: function (key) {
		switch (key) {
			case this.controls.keys.UP:
			case this.controls.keys.W:
				this.velocity.z -= 4.0
				break;
			
			case this.controls.keys.LEFT:
			case this.controls.keys.A:
				this.velocity.x -= 4.0
				break;
			
			case this.controls.keys.DOWN:
			case this.controls.keys.S:
				this.velocity.z += 4.0
				break;
			
			case this.controls.keys.RIGHT:
			case this.controls.keys.D:
				this.velocity.x += 4.0
				break;
		}
	}
};
