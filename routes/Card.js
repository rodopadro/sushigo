class Card {
	constructor(nombre,src,tipo,valor){
			this._name = nombre;
			this._src = src;
			this._type = tipo;
			this._value = valor;
	}

	get cardname(){
		return this._name;
	}

	get src(){
		return this._src;
	}

    get type(){
		return this._type;
	}

    get value(){
		return this._value;
	}
}
export {Card};