import Component from './component';

export default class Drag extends Component
{
	constructor(parent){
		super(parent);
		stop();
	}
	
	stop(){
		this.startPoint = this.process = null;
	}
	
	//---------------------------------------- EVENTS
	
	onMouseLeave(){
		this.stop();
	}
	
	onMouseUp(btn, p){
		this.stop();
	}
	
	onMouseDown(btn, p, proj){
		this.startPoint = proj.point.clone();
	}
	
	onMouseMove(p, d, proj){
		if (this.startPoint){
			this.process = true;
			
			let diff = proj.point.clone();
			diff.sub(this.startPoint);
			
			this.parent.move(diff);
			
			this.startPoint = proj.point;
		}
	}
}
