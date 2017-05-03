/**
 * Created by RPadro on 01/05/2017.
 */
import {Player} from './Player';
import {Card} from './Card';
import {Deck} from './Deck';

class Game{

	constructor(){
		this._players = [];
		this._counter = 0;
		this._deck = [];
		this._playersReady = 0;
		this._deck = new Deck();
		this._deckposition = 0;
	}

	get deckposition(){
		return this._deckposition;
	}

	set deckposition(pos){
		this._deckposition = pos;
	}

	get deck(){
		return this._deck;
	}

	set deck(deck){
		this._deck = deck;
	}

	get players(){
		return this._players;
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

	addPlayer(username){
		let newPlayer = new Player(username);
		this.players[this.count] = newPlayer;
		console.log("Player added", newPlayer.username, this.counter);
	}

	exitPlayer(Player){
		let index = this.players.indexOf(Player);
		this.players.splice(index, 1);
		console.log("Player exited", this.reducer);
	}

	switchHand(){
		let tmp = this.players[0].hand;
		for(let i = 1; i < this.count; i++){
			this.players[i-1].hand = this.players[i].hand;
		}
		this.players[this.count -1].hand = tmp;
	}

	startGame(){
		console.log("Hola despues de init");
		this.deck.initDeck();
		switch(this.count){
			case 2:
				console.log("2 players");

				for (let i=0, count = 0; i < 20; i++, count++) {
					this.players[0].hand[count]= this.deck.deck[i++];
					this.players[1].hand[count] = this.deck.deck[i];
				}
				this.deckposition += 20;

				break;
			case 3:
				console.log("3 players");

				for (let i=0, count = 0; i < 27; i++, count++) {
					this.players[0].hand[count]= this.deck.deck[i++];
					this.players[1].hand[count] = this.deck.deck[i++];
					this.players[2].hand[count] = this.deck.deck[i];
				}

				break;
			case 4:
				console.log("4 players");

				for (let i=0, count = 0; i < 32; i++, count++) {

					this.players[0].hand[count]= this.deck.deck[i++];
					this.players[1].hand[count] = this.deck.deck[i++];
					this.players[2].hand[count] = this.deck.deck[i++];
					this.players[3].hand[count] = this.deck.deck[i];
				}

				break;
			case 5:
				console.log("5 players");

				for (let i=0, count = 0; i < 35; i++, count++) {
					this.players[0].hand[count]= this.deck.deck[i++];
					this.players[1].hand[count] = this.deck.deck[i++];
					this.players[2].hand[count] = this.deck.deck[i++];
					this.players[3].hand[count] = this.deck.deck[i++];
					this.players[4].hand[count] = this.deck.deck[i];
				}
				break;
			default:
				console.log("No suficientes players");
				break;
		}

	}


}

export {Game};
