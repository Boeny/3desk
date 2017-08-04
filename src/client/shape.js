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
		
		this.textElem = new TextElement(name, this.position.toScreenPos(this._parent.camera));
		
		let components = ['colors','drag'];
		this.drag = new Drag(this);
		this.colors = new Colors(this);
		
		let events = ['onMouseEnter','onMouseLeave','onMouseUp','onMouseDown','onMouseMove'];
		for (var i = 0; i < events.length; i++){
			let e = events[i];
			
			this[e] = (...args) => {
				for (var i = 0; i < components.length; i++){
					this[components[i]][e](...args);
				}
			};
		}
		
		this._isActive = false;
	}
	
	move(){
		
	}
	
	get isActive(){
		return this._isActive;
	}
	
	set isActive(status){
		if (status && !this.controls.keys.CTRL) this._parent.toggleActiveAll(false);
		this._isActive = status;
		this.colors.toggle(status);
		this._parent[status ? 'addToActive' : 'removeFromActive'](this);
	}
	
	updateScreenElements(){
		this.textElem.update(this.position.toScreenPos(this._parent.camera));
	}
}
