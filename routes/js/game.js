
//main deck array 108 cards
var deck=[];
var shuffleArray=[];

//deck for each player on each turn
var onHand = [];

//deck generated during the round final deck combination each round
var onPlay = [];



//variable card
function card(nombre,src,tipo,valor){
	this.name = nombre;
	this.src = src;
	this.type = tipo;
	this.value = valor;
}

function player(nombre,onPlay,onHand){

	this.name = nombre;
	this.onPlay = onPlay;
	this.onHand = onHand;
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
	//console.log(deck[0].type);
});
//----------------------------------------------------------------------------

function startGame(players){
	initDeck();

	switch(players){
		case 2:
			console.log("2 players");
			break;
		case 3:
			console.log("3 players");
			break;
		case 4:
			console.log("4 players");
			break;
		case 5:
			console.log("5 players");
			break;
		default:

	}




}


function getHands(players){

}

function getDeck(){

}

function onPlay(){

}
function initDeck(){
	shuffleArray = shuffle(deck);
	/*for (var i = 0; i < shuffleArray.length; i++) {
		console.log(shuffleArray[i].name);
	}*/
	
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






