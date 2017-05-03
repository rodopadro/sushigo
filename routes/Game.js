/**
 * Created by RPadro on 01/05/2017.
 */

class Game{
	
	//main deck array 108 cards
	var deck=[];
	var shuffleArray=[];
	//array with the players objects
	var playersArray = [];

	constructor(){
		this._players = [];
		this._counter = 0;
		this._playersReady = 0;
	}

	card(nombre,src,tipo,valor){
		this.name = nombre;
		this.src = src;
		this.type = tipo;
		this.value = valor;
	} 

	player(nombre){
		this.name = nombre;
		this.onPlay = [];
		this.onHand = [];
	}
	
	shuffle(array){
	  	var currentIndex = array.length, temporaryValue, randomIndex;

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
		for (var i = 0; i < 9; i++) {
			console.log(shuffleArray[i].name);
		}
	}

	startGame(numplayers){

		initDeck();

		switch(players){
			case 2:
				console.log("2 players");
				var player1 = new player("felix");
				var player2 = new player("Brayan");

				for (var cont=0,i=0,y=1; cont < 10; i+=2,y+=2,cont++) {
					player1.onHand.push(shuffleArray[i]);
					player2.onHand.push(shuffleArray[y]);
				}

				playersArray.push(player1);
				playersArray.push(player2);


				break;
			case 3:
				console.log("3 players");

				var player1 = new player("felix");
				var player2 = new player("Brayan");
				var player3 = new player("fer");

				for (var cont=0,i=0,y=1,z=2; cont < 9; i+=3,y+=3,z+=3,cont++) {
					player1.onHand.push(shuffleArray[i]);
					player2.onHand.push(shuffleArray[y]);
					player3.onHand.push(shuffleArray[z]);
				}

				playersArray.push(player1);
				playersArray.push(player2);
				playersArray.push(player3);

				break;
			case 4:
				console.log("4 players");

				var player1 = new player("felix");
				var player2 = new player("Brayan");
				var player3 = new player("fer");
				var player4 = new player("rodo");

				for (var cont=0,i=0,y=1,z=2,w=3; cont < 8; i+=4,y+=4,z+=4,w+=4,cont++) {
					player1.onHand.push(shuffleArray[i]);
					player2.onHand.push(shuffleArray[y]);
					player3.onHand.push(shuffleArray[z]);
					player4.onHand.push(shuffleArray[w]);
				}

				playersArray.push(player1);
				playersArray.push(player2);
				playersArray.push(player3);
				playersArray.push(player4);

				break;
			case 5:
				console.log("5 players");

				var player1 = new player("felix");
				var player2 = new player("Brayan");
				var player3 = new player("fer");
				var player4 = new player("rodo");
				var player5 = new player("rodo");

				for (var cont=0,i=0,y=1,z=2,w=3,x=4; cont < 7; i+=5,y+=5,z+=5,w+=5,x+=5,cont++) {
					player1.onHand.push(shuffleArray[i]);
					player2.onHand.push(shuffleArray[y]);
					player3.onHand.push(shuffleArray[z]);
					player4.onHand.push(shuffleArray[w]);
					player5.onHand.push(shuffleArray[x]);
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


		console.log("player1 first card1 "+playersArray[0].onHand[0].name);
		console.log("player1 first card2 "+playersArray[1].onHand[0].name);
		console.log("player1 first card2 "+playersArray[2].onHand[0].name);
		console.log("player1 first card2 "+playersArray[3].onHand[0].name);
		console.log("player1 first card2 "+playersArray[4].onHand[0].name);

		//swaponHand(playersArray,2);

		console.log(playersArray[0].onHand.length);

		//while(playersArray[0].onHand!=null){
		console.log(playersArray[0].onHand);

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
		//Game._players.push(Player);
		console.log("Player added", Player, this.counter);
	}

	exitPlayer(Player){
		let index = Game._players.indexOf(Player);
		Game._players.slice(index, 1);
		console.log("Player exited", this.reducer);
	}

	//GET DATA FROM FIREBASE----------------------------------------------------
	function generateDeck(){
		return new Promise(function(resolve,reject){

			deck = [];
			var ref = firebase.database().ref();
			var urlRef = ref.child("cartas");

			urlRef.once("value", function(snapshot) {
			  snapshot.forEach(function(child) {

			    var cantidad = child.child("cantidad").val();
			    var nombre = child.child("nombre").val();
			    var tipo = child.child("tipo").val();
			    var valor = child.child("valor").val();
			    var src = child.child("src").val();


			    for (var i = 0; i < cantidad; i++) {
				var newcard = new card(nombre,src,tipo,valor);
				deck.push(newcard);

			    }


			   });
				resolve(deck);
			});
		});
	
	};

	generateDeck().then(
		function(newdeck){
		console.log("primera carta: " + newdeck[107].type);
		deck = newdeck;
		console.log(deck.length);
	});
	//----------------------------------------------------------------------------

}

export {Game};
