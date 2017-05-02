
//main deck array 108 cards
var deck=[];
var shuffleArray=[];

//deck for each player on each turn
var onHand = [];

//deck generated during the round final deck combination each round
var onPlay = [];

//array with the players objects
var playersArray = [];



//CARD
function card(nombre,src,tipo,valor){
	this.name = nombre;
	this.src = src;
	this.type = tipo;
	this.value = valor;
}
//PLAYER
function player(nombre){

	this.name = nombre;
	this.onPlay = [];
	this.onHand = [];
}



function startGame(players){
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

	
	console.log("players "+ playersArray.length);


	console.log("player1 first card1 "+playersArray[0].onHand[0].name);
	console.log("player1 first card2 "+playersArray[1].onHand[0].name);
	console.log("player1 first card2 "+playersArray[2].onHand[0].name);
	console.log("player1 first card2 "+playersArray[3].onHand[0].name);
	console.log("player1 first card2 "+playersArray[4].onHand[0].name);

	


}


function swaponHand(playersArray){

}


function getHands(players){

}

function getDeck(){

}

function onPlay(){

}

//START RANDOM DECK FOR THE GAME--------------------------------------------
function initDeck(){
	shuffleArray = shuffle(deck);
	for (var i = 0; i < 9; i++) {
		console.log(shuffleArray[i].name);
	}
}

//random Deck
function shuffle(array){
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
//--------------------------------------------------------------------------

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




