var data = [
	{name: '.git',	isFolder: true},
	{name: '3d',	isFolder: true},
	{name: 'dist',	isFolder: true},
	{name: 'simple-server',	isFolder: true},
	{name: 'src',			isFolder: true},
	
	{name: 'LICENSE',		isFolder: false},
	{name: '.gitignore',	isFolder: false},
	{name: 'package.json',	isFolder: false},
	{name: 'README.md',		isFolder: false},
	{name: 'webpack.config.js',	isFolder: false},
	{name: 'webpack.config.prod.js',	isFolder: false},
];

export class Shapes {
	Start(objects){
		this.mesh = [];
		let geometry = new THREE.BoxGeometry(20, 20, 20);
		
		/*for (var i = 0; i < geometry.faces.length; i++) {
			let face = geometry.faces[i];
			face.vertexColors[0] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[1] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[2] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
		}*/
		
		let { Shape } = require('./shape');
		
		for (var i = 0; i < data.length; i++) {
			let mesh = new Shape(data[i].name, geometry, objects.controls);
			this.mesh.push(mesh);
		}
	}
}