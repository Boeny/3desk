module.exports = {
	mesh: [],
	
	Start: function(){
		let geometry = new THREE.BoxGeometry(20, 20, 20);
		
		for (var i = 0; i < geometry.faces.length; i++) {
			let face = geometry.faces[i];
			face.vertexColors[0] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[1] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[2] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		}
		
		let material = new THREE.MeshPhongMaterial({
			specular: 0xffffff,
			shading: THREE.FlatShading,
			vertexColors: THREE.VertexColors
		});
		
		for ( var i = 0; i < 500; i ++ ) {
			material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			
			let mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
			mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
			mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			
			this.mesh.push(mesh);
		}
	}
};