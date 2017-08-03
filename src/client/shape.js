import TextElement from './text-element';
import Colors from './shape.colors';
import Drag from './shape.drag';

export class Shape extends THREE.Mesh
{
	constructor(name, geometry, controls){
		let material = new THREE.MeshPhongMaterial({
			color: new THREE.Color().setHSL( random(0.5, 0.8), 0.75, random(0.75, 1) ),
			specular: 0x999999,
			shading: THREE.FlatShading,
			vertexColors: THREE.VertexColors
		});
		
		super(geometry, material);
		
		this.controls = controls;
		this.name = name;
		
		this.position.x = random(-200, 200);
		this.position.y = random(-200, 200);
		this.position.z = random(-200, 200);
		
		this.castShadow = true;
		this.receiveShadow = true;
		
		this.textElem = new TextElement(name);
		
		this.drag = new Drag(this);
		this.colors = new Colors(this, () => !this.drag.dragging);
	}
	
	//---------------------------------------- EVENTS
	
	onMouseEnter(){
		this.colors.onMouseEnter();
		this.drag.onMouseEnter();
	}
	
	onMouseLeave(){
		this.colors.onMouseLeave();
		this.drag.onMouseLeave();
	}
	
	onMouseUp(btn, p){
		this.colors.onMouseUp(btn, p);
		this.drag.onMouseUp(btn, p);
	}
	
	onMouseDown(btn, p){
		this.colors.onMouseDown(btn, p);
		this.drag.onMouseDown(btn, p);
	}
	
	onMouseMove(p, d){
		this.colors.onMouseMove(p, d);
		this.drag.onMouseMove(p, d);
	}
}
