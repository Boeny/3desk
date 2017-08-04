export default class Component
{
	constructor(parent){
		this.parent = parent;
		this.controls = parent.controls;
	}
	
	onMouseEnter(){}
	onMouseLeave(){}
	onMouseUp(btn, p){}
	onMouseDown(btn, p){}
	onMouseMove(p, d){}
}
