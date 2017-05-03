class Card {
	constructor(nombre,src,tipo,valor){
			this.name = nombre;
			this.src = src;
			this.type = tipo;
			this.value = valor;
	}

	get cardname(){
		return this.name;
	}

	set cardname(nombre){
		this.name = nombre;
	}

	get src(){
		return this.src;
	}

	set src(src){
		this.src = src;
	}
  
  get type(){
		return this.type;
	}

	set type(tipo){
		this.type = tipo;
	}
  
  get value(){
		return this.value;
	}

	set value(valor){
		this.value = valor;
	}
  
}
