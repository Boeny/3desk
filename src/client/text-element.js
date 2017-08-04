export default class TextElement// extends HTMLDivElement
{
	constructor(text, pos){
		//super();
		let elem = document.createElement('div');
		elem.className = 'title';
		elem.innerHTML = text;
		
		elem.update = this.update.bind(elem);
		elem.update(pos);
		
		document.body.appendChild(elem);
		return elem;
	}
	
	update(pos){
		this.style.left = pos.x+'px';
		this.style.top = pos.y+'px';
	}
}
