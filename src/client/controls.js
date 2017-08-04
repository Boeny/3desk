var defaults = {
	enabled: false,
	enableKeys: true,
	
	keys: {
		SPACE: 32,
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		W: 87,
		A: 65,
		S: 83,
		D: 68,
		CTRL: false
	},
	mouse: {
		LEFT: 0,
		WHEEL: 1,
		MIDDLE: 1,
		RIGHT: 2
	},
	
	handlers: {
		keydown: 'onKeyDown',
		keyup: 'onKeyUp',
		
		mousemove: 'onMouseMove',
		mousedown: 'onMouseDown',
		mouseup: 'onMouseUp',
		click: 'onClick',
		wheel: 'onMouseWheel',
		contextmenu: 'onContextMenu',
		
		touchstart: 'onTouchStart',
		touchend: 'onTouchEnd',
		touchmove: 'onTouchMove',
		
	}
};

export class Controls
{
	constructor(){
		merge(this, defaults);
		
		// Hook pointer lock state change events
		document.addEventListener('pointerlockchange', (e) => this.onPointerLockingChange(e), false);
		document.addEventListener('mozpointerlockchange', (e) => this.onPointerLockingChange(e), false);
		document.addEventListener('webkitpointerlockchange', (e) => this.onPointerLockingChange(e), false);
		
		document.addEventListener('pointerlockerror', (e) => this.onPointerLockingError(e), false);
		document.addEventListener('mozpointerlockerror', (e) => this.onPointerLockingError(e), false);
		document.addEventListener('webkitpointerlockerror', (e) => this.onPointerLockingError(e), false);
	}
	
	Start(objects){
		for (var name in objects){
			let obj = objects[name];
			
			for (let eventName in this.handlers){
				let handlerName = this.handlers[eventName];
				
				if (obj[handlerName]){
					this.renderer.domElement.addEventListener(eventName, (e) => {
						if (!this.enabled) return;
						this.keys.CTRL = e.ctrlKey;
						this.eventHandler(e, obj, handlerName);
					}, false);
				}
			}
		}
		
		global.addEventListener('resize', () => {
			this.camera.aspect = global.innerWidth / global.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(global.innerWidth, global.innerHeight);
		}, false);
	}
	
	eventHandler(e, obj, handlerName){
		var handler = obj[handlerName].bind(obj);
		
		e.preventDefault();
		e.stopPropagation();
		
		switch (handlerName){
			case 'onKeyDown':
			case 'onKeyUp':
				if (!this.enableKeys) return;
				return handler(e.keyCode);
			
			case 'onMouseMove':
				return handler(
					new THREE.Vector2(e.clientX, e.clientY),
					new THREE.Vector2(
						e.movementX || e.mozMovementX || e.webkitMovementX || 0,
						e.movementY || e.mozMovementY || e.webkitMovementY || 0
					)
				);
			
			case 'onMouseWheel':
				return handler(e.deltaY);
			
			case 'onClick':
			case 'onMouseUp':
			case 'onMouseDown':
				return handler(e.button, new THREE.Vector2(e.clientX, e.clientY));
			
			case 'onTouchStart':
			case 'onTouchMove':
			case 'onTouchEnd':
				let points = new Array(e.touches.length);
				
				for (var i = 0; i < points.length; i++){
					points[i] = new THREE.Vector2(e.touches[i].pageX, e.touches[i].pageY);
				}
				
				return handler(points);
			
			default:
				return handler();
		}
	}
	
	onPointerLockingError(){}
	onPointerLockingChange(){}
	
	// Ask the browser to lock the pointer
	lockPointer(elem){
		let lock = elem.requestPointerLock || elem.mozRequestPointerLock || elem.webkitRequestPointerLock;
		lock && lock();
	}
	isPointerLocked(elem){
		return document.pointerLockElement === elem || document.mozPointerLockElement === elem || document.webkitPointerLockElement === elem;
	}
}
