/**
 * Created by RPadro on 01/05/2017.
 */
import {Player} from './Player';

class Game{
	/*
	//main deck array 108 cards
	let deck=[];
	let shuffleArray=[];
	//array with the players objects
	let playersArray = [];
*/
	constructor(){
		this._players = [];
		this._counter = 0;
		this._deck = [];
		this._playersReady = 0;
	}


	/*class card{
		constructor(nombre,src,tipo,valor){
			this.name = nombre;
			this.src = src;
			this.type = tipo;
			this.value = valor;
		}
	}

	class player{
		constructor(nombre){
			this.name = nombre;
			this.onPlay = [];
			this.onHand = [];
		}
	}*/
	
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
		shuffleArray = [];
		playersArray = [];
		shuffleArray = shuffle(deck);
		for (let i = 0; i < 9; i++) {
			console.log(shuffleArray[i].name);
		}
	}

	startGame(numplayers){
		let player1, player2, player3, player4, player5;
		this.initDeck();

		switch(this.count){
			case 2:
				console.log("2 players");
				player1 = new Player("felix");
				player2 = new Player("Brayan");

				for (let i=0; i < 20; i++) {
					player1._onHand[i]= shuffleArray[i++];
					player2._onHand[i] = shuffleArray[i];
				}

				playersArray.push(player1);
				playersArray.push(player2);


				break;
			case 3:
				console.log("3 players");

				player1 = new Player("felix");
				player2 = new Player("Brayan");
				player3 = new Player("fer");

				for (let i=0; i < 27; i++) {
					player1._onHand[i] = shuffleArray[i++];
					player2._onHand[i] = shuffleArray[i++];
					player3._onHand[i] = shuffleArray[i];
				}

				playersArray.push(player1);
				playersArray.push(player2);
				playersArray.push(player3);

				break;
			case 4:
				console.log("4 players");

				player1 = new Player("felix");
				player2 = new Player("Brayan");
				player3 = new Player("fer");
				player4 = new Player("rodo");

				for (let i=0; i < 32; i++) {
					player1._onHand[i] = shuffleArray[i++];
					player2._onHand[i] = shuffleArray[i++];
					player3._onHand[i] = shuffleArray[i++];
					player4._onHand[i] = shuffleArray[i];
				}

				playersArray.push(player1);
				playersArray.push(player2);
				playersArray.push(player3);
				playersArray.push(player4);

				break;
			case 5:
				console.log("5 players");

				player1 = new Player("felix");
				player2 = new Player("Brayan");
				player3 = new Player("fer");
				player4 = new Player("rodo");
				player5 = new Player("rodo");

				for (let i=0; i < 42; i++) {
					player1._onHand[i] = shuffleArray[i++];
					player2._onHand[i] = shuffleArray[i++];
					player3._onHand[i] = shuffleArray[i++];
					player4._onHand[i] = shuffleArray[i++];
					player4._onHand[i] = shuffleArray[i];
				}

				playersArray.push(player1);
				playersArray.push(player2);
				playersArray.push(player3);
				playersArray.push(player4);
				playersArray.push(player5);

				break;
			default:

		}


		console.log("number of players "+ playersArray.length);


		console.log("player1 first card1 "+playersArray[0]._onHand[0].name);
		console.log("player1 first card2 "+playersArray[1]._onHand[0].name);
		console.log("player1 first card2 "+playersArray[2]._onHand[0].name);
		console.log("player1 first card2 "+playersArray[3]._onHand[0].name);
		console.log("player1 first card2 "+playersArray[4]._onHand[0].name);

		//swaponHand(playersArray,2);

		console.log(playersArray[0]._onHand.length);

		//while(playersArray[0].onHand!=null){
		console.log(playersArray[0]._onHand);

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
		Game._players.slice(index, 1);
		console.log("Player exited", this.reducer);
	}

	//GET DATA FROM FIREBASE----------------------------------------------------
	generateDeck(){
		return new Promise(function(resolve,reject){

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


			    for (let i = 0; i < cantidad; i++) {
				let newcard = new card(nombre,src,tipo,valor);
				deck.push(newcard);

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
			console.log(deck.length);
		});
	}

}

export {Game};
