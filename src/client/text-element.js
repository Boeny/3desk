export default class TextElement
{
	constructor(text){
		let elem = document.createElement('div');
		elem.className = 'title';
		elem.innerHTML = text;
		document.body.appendChild(elem);
		return elem;
	}
}
