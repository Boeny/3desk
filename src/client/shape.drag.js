export default class Drag
{
	constructor(shape){
		this.shape = shape;
		this.controls = shape.controls;
		
		this.canDrag = false;
		this.dragging = false;
	}
	
	stopDrag(){
		if (this.dragging){
			console.log('stop dragging');
		}
		this.canDrag = this.dragging = false;
	}
	
	//---------------------------------------- EVENTS
	
	onMouseEnter(){}
	
	onMouseLeave(){
		this.stopDrag();
	}
	
	onMouseUp(btn, p){
		this.stopDrag();
	}
	
	onMouseDown(btn, p){
		this.canDrag = true;
	}
	
	onMouseMove(p, d){
		if (this.canDrag){
			this.dragging = true;
			console.log('start dragging');
		}
	}
}
