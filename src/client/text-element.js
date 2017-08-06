import Component from './component';

export default class TextElement extends Component
{
	constructor(parent, text, pos){
		super(parent);
		
		let elem = document.createElement('div');
		elem.className = 'title';
		elem.innerHTML = text;
		document.body.appendChild(elem);
		this.DOM = elem;
		this.maxFontSize = 42;
		this.update(pos, 20);
		
		let handlers = {
			mouseenter: 'onMouseEnter',
			mouseleave: 'onMouseLeave',
			mousemove: 'onMouseMove',
			mousedown: 'onMouseDown',
			mouseup: 'onMouseUp',
			click: 'onClick',
			wheel: 'onMouseWheel',
			contextmenu: 'onContextMenu',
			
			touchstart: 'onTouchStart',
			touchend: 'onTouchEnd',
			touchmove: 'onTouchMove',
		};
		
		for (let eventName in this.handlers){
			let handlerName = this.handlers[eventName];
			
			if (parent[handlerName]){
				elem.addEventListener(eventName, (e) => {
					parent.controls.eventHandler(e, parent, handlerName);
				}, false);
			}
		}
	}
	
	/**
	 * {Vector2} pos
	 * {Number(natural)} depth
	 */
	update(pos, depth){
		this.DOM.style.left = pos.x+'px';
		this.DOM.style.top = pos.y+'px';
		this.DOM.style.opacity = 1 / depth;
		this.DOM.style.fontSize = Math.min(this.DOM.style.opacity * 100, this.maxFontSize) + 'px';
	}
}
