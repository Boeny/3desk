var objects, updates = [];

exports.Start = function(scene, camera, renderer, objs){
	objects = objs;
	
	for (var i in objects){
		let o = objects[i];
		
		o.objects = objs;
		o.scene = scene;
		o.camera = camera;
		o.renderer = renderer;
		
		o.Start();
		
		if (o.mesh){
			if (o.mesh instanceof Array){
				for (var j = 0; j < o.mesh.length; j++){
					scene.add(o.mesh[j]);
				}
			}
			else{
				scene.add(o.mesh);
			}
		}
		
		if (o.Update) updates.push(o.Update.bind(o));
	}
};

exports.Update = function(){
	for (var i = 0; i < updates.length; i++){
		updates[i]();
	}
};