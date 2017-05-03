/**
 * Created by RPadro on 03/05/2017.
 */
const cards = require('./Cards');
import {Card} from './Card';


class Deck {
	constructor(){
		this._deck = [];
	}

	set deck(deck){
		this._deck = deck;
	}

	get deck(){
		return this._deck;
	}

	initDeck(){
		console.log("init");
		let newDeck = this.generateDeck();
		this.deck = this.shuffle(newDeck);
	}

	shuffle(array){
		let currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}


	generateDeck(){
		let newDeck = [];
		let tmp, count = 0;
		let newCard;
		for(let i = 1; i < 12; i++){
			tmp = cards[i.toString()];
			for(let y = 0; y < tmp.cantidad; y++){
				newCard = new Card(tmp.nombre, tmp.src, tmp.tipo, tmp.valor);
				newDeck[count++] = newCard;
			}
		}
		return newDeck;
	}

}

export {Deck};