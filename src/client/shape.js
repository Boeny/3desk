import TextElement from './text-element';
import Colors from './shape.colors';
import Drag from './shape.drag';

export class Shape extends THREE.Mesh
{
	constructor(parent, name, geometry, controls){
		let material = new THREE.MeshPhongMaterial({
			color: new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) ),
			specular: 0x999999,
			shading: THREE.FlatShading,
			vertexColors: THREE.VertexColors
		});
		
		super(geometry, material);
		
		this._parent = parent;// to avoid a conflicts with Mesh.parent
		this.controls = controls;
		this.name = name;
		
		this.position.x = random(-200, 200);
		this.position.y = random(-200, 200);
		this.position.z = random(-200, 200);
		
		this.castShadow = true;
		this.receiveShadow = true;
		
		let components = ['colors','drag','title'];
		this.drag = new Drag(this);
		this.colors = new Colors(this);
		this.title = new TextElement(this, name, this.position.toScreenPos(this._parent.camera));
		
		let events = ['onMouseEnter','onMouseLeave','onMouseUp','onMouseDown','onMouseMove'];
		for (var i = 0; i < events.length; i++){
			let e = events[i];
			
			this[e] = (...args) => {
				for (var i = 0; i < components.length; i++){
					this[components[i]][e](...args);
				}
			};
		}
		
		this.isActive = false;
	}
	
	toggleActive(status){
		if (this.controls.keys.CTRL){
			status = !this.isActive;
		}
		else{
			if (status){
				this._parent.toggleActiveAll(false);
			}
		}
		this.isActive = status;
		this.colors.toggle(status);
		this._parent[status ? 'addToActive' : 'removeFromActive'](this);
	}
	
	move(diff){
		this.translateX(diff.x);
		this.translateY(diff.y);
		this.updateScreenElements();
	}
	
	updateScreenElements(){
		let pos = this.position.clone();
		let cam = this._parent.camera.position.clone();
		cam.sub(pos);
		this.title.update(pos.toScreenPos(this._parent.camera), cam.length() * 0.01);
	}
}
