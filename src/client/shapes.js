//------------------------------------ ONE SHAPE EVENTS

function onMouseEnter(){
	this.oldColor = this.material.color.clone();
	this.material.color.setRGB(0.5, 0.5, 0.5);
}

function onMouseLeave(){
	this.material.color.setRGB(this.oldColor.r, this.oldColor.g, this.oldColor.b);
}

function onClick(){
	this.material.color.setRGB(0.5, 0, 0);
	this.oldColor = this.material.color.clone();
}

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
		
		/*for (var i = 0; i < geometry.faces.length; i++) {
			let face = geometry.faces[i];
			face.vertexColors[0] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[1] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
			face.vertexColors[2] = new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) );
		}*/
		
		for (i = 0; i < this.data.length; i++) {
			let material = new THREE.MeshPhongMaterial({
				color: new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) ),
				specular: 0x999999,
				shading: THREE.FlatShading,
				vertexColors: THREE.VertexColors
			});
			
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
			
			mesh.onClick = onClick;
			mesh.onMouseEnter = onMouseEnter;
			mesh.onMouseLeave = onMouseLeave;
			
			this.mesh.push(mesh);
		}
	}
};