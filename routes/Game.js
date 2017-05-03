/**
 * Created by RPadro on 01/05/2017.
 */
import {Player} from './Player';
import {Card} from './Card';
const firebase = require('firebase');

class Game{

	constructor(){
		this._players = [];
		this._counter = 0;
		this._deck = [];
		this._playersReady = 0;
		this._shuffleArray = [];
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

	initDeck(){
		this.generator();
		this._shuffleArray = shuffle(this._deck);
		for (let i = 0; i < 9; i++) {
			console.log(this._shuffleArray[i].name);
		}
	}

	startGame(numplayers){
		this.initDeck();

		switch(this.count){
			case 2:
				console.log("2 players");

				for (let i=0; i < 20; i++) {
					this._players[0]._onHand[i]= this._shuffleArray[i++];
					this._players[1]._onHand[i] = this._shuffleArray[i];
				}

				break;
			case 3:
				console.log("3 players");

				for (let i=0; i < 27; i++) {
					this._players[0]._onHand[i]= this._shuffleArray[i++];
					this._players[1]._onHand[i] = this._shuffleArray[i++];
					this._players[2]._onHand[i] = this._shuffleArray[i];
				}

				break;
			case 4:
				console.log("4 players");

				for (let i=0; i < 32; i++) {

					this._players[0]._onHand[i]= this._shuffleArray[i++];
					this._players[1]._onHand[i] = this._shuffleArray[i++];
					this._players[2]._onHand[i] = this._shuffleArray[i++];
					this._players[3]._onHand[i] = this._shuffleArray[i];
				}

				break;
			case 5:
				console.log("5 players");

				for (let i=0; i < 42; i++) {
					this._players[0]._onHand[i]= this._shuffleArray[i++];
					this._players[1]._onHand[i] = this._shuffleArray[i++];
					this._players[2]._onHand[i] = this._shuffleArray[i++];
					this._players[3]._onHand[i] = this._shuffleArray[i++];
					this._players[4]._onHand[i] = this._shuffleArray[i];
				}
				break;
			default:
				break;
		}

	}

	set deck(deck){
		this._deck = deck;
	}
	

	get counter(){
		this._counter = (this._counter || 0) + 1;
		return this._counter;
	}

	get reducer(){
		if(this._counter == 0){
			this._counter = 0;
		}else{
			this._counter = this._counter - 1;
		}
		return this._counter;
	}

	set playersReady(value){
		this._playersReady = value;
	}

	get playersReady(){
		return this._playersReady;
	}

	addPlayerReady(){
		this._playersReady += 1;
	}

	allPlayersReady(){
		return this.playersReady == this.count;
	}

	set room(room){
		this._room = room;
	}

	get room(){
		return this._room;
	}

	get count(){
		return this._counter;
	}

	isEmpty(){
		return this.count == 0;
	}

	isFull(){
		return this.count == 5;
	}

	addPlayer(Player){
		this._players[this.count] = Player;
		console.log("Player added", Player, this.counter);
	}

	exitPlayer(Player){
		let index = Game._players.indexOf(Player);
		this._players.slice(index, 1);
		console.log("Player exited", this.reducer);
	}

	//GET DATA FROM FIREBASE----------------------------------------------------
	generateDeck(){
		return new Promise(function(resolve, reject){

			deck = [];
			let ref = firebase.database().ref();
			let urlRef = ref.child("cartas");

			urlRef.once("value", function(snapshot) {
			  snapshot.forEach(function(child) {

			    let cantidad = child.child("cantidad").val();
			    let nombre = child.child("nombre").val();
			    let tipo = child.child("tipo").val();
			    let valor = child.child("valor").val();
			    let src = child.child("src").val();
			    let newcard;

			    for (let i = 0; i < cantidad; i++) {
					newcard = new Card(nombre,src,tipo,valor);
					this._deck.push(newcard);
			    }


			   });
				resolve(deck);
			});
		});
	
	};

	generator(){
		this.generateDeck().then((newdeck) => {
			console.log("primera carta: " + newdeck[107].type);
			this.deck = newdeck;
			console.log();
		});
	}

}

export {Game};
