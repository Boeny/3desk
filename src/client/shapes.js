var data = {
	'.git': {items: {}, size: 20},
	'3d': {items: {}, size: 20},
	'dist': {items: {}, size: 30},
	'simple-server': {items: {}, size: 20},
	'src': {items: {}, size: 10},
	
	'LICENSE': {size: 10},
	'.gitignore': {size: 1},
	'package.json': {size: 10},
	'README.md': {size: 10},
	'webpack.config.js': {size: 20},
	'webpack.config.prod.js': {size: 10},
};

export class Shapes {
	Start(objects){
		this.mesh = [];
		
		/*for (var i = 0; i < geometry.faces.length; i++) {
			let face = geometry.faces[i];
			face.vertexColors[0] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[1] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[2] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
		}*/
		
		let { Shape } = require('./shape');
		
		for (var name in data) {
			let size = data[name].size;
			let geometry = new THREE.BoxGeometry(size, size, size);
			let mesh = new Shape(this, name, geometry, objects.controls);
			this.mesh.push(mesh);
		}
		
		this.activeObjects = {};
	}
	
	addToActive(obj){
		this.activeObjects[obj.name] = obj;
	}
	
	removeFromActive(obj){
		delete this.activeObjects[name];
	}
	
	toggleActive(obj, status){
		obj.toggleActive(status);
	}
	
	toggleActiveAll(status){
		for (var name in this.activeObjects){
			this.toggleActive(this.activeObjects[name], status);
		}
	}
	
	updateScreenElements(){
		for (var i = 0; i < this.mesh.length; i++){
			this.mesh[i].updateScreenElements();
		}
	}
}