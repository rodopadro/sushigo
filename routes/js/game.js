
//main deck array 108 cards
var deck=[];
var shuffleArray=[];


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
	this.score = 0;
	this.combos = {
		tempuras: 0,
		makis:0,
		sashimis:0,
		kiosas: 0,
		puddings: 0
		//wasabi:null
	};
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

	
	console.log("number of players "+ playersArray.length);


	console.log("player1 first card1 "+playersArray[0].onHand[0].name);
	console.log("player1 first card2 "+playersArray[1].onHand[0].name);
	/*console.log("player1 first card2 "+playersArray[2].onHand[0].name);
	console.log("player1 first card2 "+playersArray[3].onHand[0].name);
	console.log("player1 first card2 "+playersArray[4].onHand[0].name);
	console.log("combos "+playersArray[4].combos.tempura);*/

	//swaponHand(playersArray,2);

	console.log(playersArray[0].onHand.length);

	//while(playersArray[0].onHand!=null){
	console.log(playersArray[0].onHand);

}


function chooseCard(cardIndex){

	if(playersArray[0].onHand.length != 0){

		var takecard = playersArray[0].onHand[cardIndex];

		playersArray[0].onHand.remove(cardIndex);

		playersArray[0].onPlay.push(takecard);



	}else{
		console.log("No More Cards");
	}


	/*for (var i = 0; i < playersArray[0].onPlay.length; i++) {
		console.log("onPlay"+playersArray[0].onPlay[i].name);
	}
	

	for (var i = 0; i < playersArray[0].onHand.length; i++) {
		console.log(playersArray[0].onHand[i].name);
	}*/

	console.log(playersArray[0].onHand.length);
	console.log(playersArray[0].onHand);
	console.log(playersArray[0].onPlay.length);
	console.log(playersArray[0].onPlay);
	
	return playersArray[0].onHand;
	
}

function getScore(){

	for (var i = 0; i < playersArray.length; i++) {

		for (var y = 0; y < playersArray[i].onPlay.length; y++) {

			switch(playersArray[i].onPlay[y].type){

				case "tempura" :
					playersArray[i].combos.tempuras++;
					break;
				case "maki_roll" :
					playersArray[i].combos.makis++;
					break;
				case "sashimi" :
					playersArray[i].combos.sashimis++;
					break;
				case "dumpling" :
					playersArray[i].combos.kiosas++;
					break;
				case "dumpling" :
					playersArray[i].combos.kiosas++;
					break;
				case "pudding" :
					playersArray[i].combos.puddings++;
					break;
				case "wasabi":
					if((y < playersArray[i].onPlay.length-1)){
						console.log("si entro");
						if(playersArray[i].onPlay[y+1].type == "nigiri_salmon" || playersArray[i].onPlay[y+1].type == "nigiri_egg" || playersArray[i].onPlay[y+1].type == "nigiri_squid" ){

							playersArray[i].score+=(playersArray[i].onPlay[y+1].value*2);
						}
					}







					break;

				default: 
					break;

			}


			
		}
	}

	console.log("los puddings"+playersArray[0].combos.puddings);
	console.log("dumplings"+playersArray[0].combos.kiosas);
	console.log("sashimis"+playersArray[0].combos.sashimis);
	console.log("makis"+playersArray[0].combos.makis);
	console.log("tempuras"+playersArray[0].combos.tempuras);

	console.log("los puddings"+playersArray[1].combos.puddings);
	console.log("dumplings"+playersArray[1].combos.kiosas);
	console.log("sashimis"+playersArray[1].combos.sashimis);
	console.log("makis"+playersArray[1].combos.makis);
	console.log("tempuras"+playersArray[1].combos.tempuras);


	for (var i = 0; i < playersArray.length; i++) {
		
		if(playersArray[i].combos.tempuras >=2 ){

			var x = playersArray[i].combos.tempuras/2;

			var answer = Math.floor(x);
			console.log(answer);

			playersArray[i].score+=answer*5;
		}
		if(playersArray[i].combos.sashimis >= 3){

			var x = playersArray[i].combos.sashimis/3;

			var answer = Math.floor(x);
			console.log(answer);

			playersArray[i].score+=answer*10;

		}
		if(playersArray[i].combos.makis >= 2 ){
			
			playersArray[i].score+=6;
			
		}
		if(playersArray[i].combos.kiosas !=0 ){
			if(playersArray[i].combos.kiosas == 1){
				playersArray[i].score+=1;
			}
			if(playersArray[i].combos.kiosas ==2){
				playersArray[i].score+=3;
			}
			if(playersArray[i].combos.kiosas == 3){
				playersArray[i].score+=6;
			}
			if(playersArray[i].combos.kiosas == 4){
				playersArray[i].score+=10;
			}
			if(playersArray[i].combos.kiosas >= 45){
				playersArray[i].score+=15;
			}else{

			}
			
		}

		if(playersArray[i].combos.puddings >= 3 ){
			
			playersArray[i].score+=10;
			
		}



	}

	console.log("score player1 "+playersArray[0].score);
	console.log("score player2 "+playersArray[1].score);
}




Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


function getHands(players){

}

function getDeck(){

}

function onPlay(){

}

//START RANDOM DECK FOR THE GAME--------------------------------------------
function initDeck(){
	shuffleArray = [];
	playersArray = [];
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




