module.exports = {
	mesh: [],
	data: [
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
	],
	
	Start: function(){
		let geometry = new THREE.BoxGeometry(20, 20, 20);
		
		for (var i = 0; i < geometry.faces.length; i++) {
			let face = geometry.faces[i];
			face.vertexColors[0] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[1] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[2] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
		}
		
		let material = new THREE.MeshPhongMaterial({
			specular: 0xffffff,
			shading: THREE.FlatShading,
			vertexColors: THREE.VertexColors
		});
		
		for (i = 0; i < this.data.length; i++) {
			material.color.setHSL( random(0.5, 0.7), 0.75, random(0.75, 1) );
			
			let mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = random(-200, 200);
			mesh.position.y = random(-200, 200);
			mesh.position.z = random(-200, 200);
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			
			let textElem = document.createElement('div');
			textElem.className = 'title';
			textElem.innerHTML = this.data[i].name;
			mesh.textElem = textElem;
			document.body.appendChild(textElem);
			
			this.mesh.push(mesh);
		}
	}
};