export default class Colors
{
	constructor(shape, activateCondition){
		this.shape = shape;
		this.material = shape.material;
		this.controls = shape.controls;
		
		shape.isActive = false;
		this.oldColor = [];
		
		this.activateCondition = activateCondition;
	}
	
	get color(){
		let c = this.material.color;
		return [c.r, c.g, c.b];
	}
	set color(arrayRGB){
		this.material.color.setRGB(...arrayRGB);
	}
	
	get activeColor(){
		return [0.5, 0.3, 0.3];
	}
	get hoverColor(){
		return this.shape.isActive ? [0.7, 0.5, 0.5] : [0.5, 0.5, 0.5];
	}
	get downColor(){
		return this.shape.isActive ? [0.5, 0.3, 0.3] : [0.3, 0.3, 0.3];
	}
	
	//---------------------------------------- EVENTS
	
	onMouseEnter(){
		this.oldColor = this.color;
		this.color = this.hoverColor;
	}
	
	onMouseLeave(){
		this.color = this.oldColor;
	}
	
	onMouseUp(btn, p){
		if (btn == this.controls.mouse.LEFT && this.activateCondition()){
			this.shape.isActive = true;
			this.oldColor = this.activeColor;
		}
		
		this.color = this.hoverColor;
	}
	
	onMouseDown(btn, p){
		this.color = this.downColor;
	}
	
	onMouseMove(p, d){}
}
