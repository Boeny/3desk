import Component from './component';

export default class Colors extends Component
{
	constructor(parent, activateCondition){
		super(parent);
		this.material = parent.material;
		
		this.oldColor = this.deactiveColor = this.color;
		
		this.activateCondition = activateCondition || function(){return true};
	}
	
	get color(){
		return this.material.color.getHex();
	}
	set color(c){
		this.material.color.set(c);
	}
	
	get activeColor(){
		return 0x885555;
	}
	get hoverColor(){
		return this.parent.isActive ? 0xbb8888 : 0x888888;
	}
	get downColor(){
		return this.parent.isActive ? 0x885555 : 0x555555;
	}
	
	toggle(status){
		this.oldColor = this.color = this[status ? 'activeColor' : 'deactiveColor'];
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
		this.color = this.hoverColor;
	}
	
	onMouseDown(btn, p){
		if (this.activateCondition()){
			this.parent.isActive = true;
		}
		this.color = this.downColor;
	}
}
