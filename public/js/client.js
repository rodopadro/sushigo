/**
 * Created by RPadro on 02/05/2017.
 */
let myHand = [];
let onPlay = [];
let player;
const socket = io();

socket.on('addPlayer', (username)=>{
	addPlayer(username);
});

socket.on('updateScores', (Player, score)=>{
	updatePoints(Player.username,score);

});

socket.on('updateBoard', (Player, card) => {
	fillRow(Player,card.src);
});

socket.on('updateHand', (Hand)=>{
	populateHand(Hand);
});

function populateHand(hand){
	myHand = hand;
	for (var i = 0; i < hand.length; i++) {
		let cartamano = '<div class="col-md-1 contecarta" id="Hand'+i+'"><img class ="cartamano" src="'+hand[i].src+'" alt=""></div>'
		$( "#hand" ).append(cartamano);
	}
}

function populateScore(){
	for (var i = 0; i < usernamelist.length; i++) {
		let punt = '<div class="row"><div class="col-sm-5 col-sm-offset-1" id="punt'+usernamelist[i]+'"><h4>'+usernamelist[i]+'</h4></div><div class="col-sm-2 " id="points'+usernamelist[i]+'"><h4>'+10+'</h4></div><div class="col-sm-1" ><h4>PTS</h4></div></div><hr>'
		$( "#puntuacion" ).append(punt);
	}
}

function addPlayer(player){
	let p = '<div class="row"><div class="col-sm-5 col-sm-offset-1" id="punt'+player+'"><h4>'+player+'</h4></div><div class="col-sm-2 " id="points'+player+'"><h4>'+0+'</h4></div><div class="col-sm-1" ><h4>PTS</h4></div></div><hr>'
	$( "#puntuacion" ).append(p);
}

function updatePoints(user,points){
	$( "#points"+user ).html('<h4>'+points+'</h4>');
}

function fillTables(){
	for (var i = 0; i < usernamelist.length; i++) {
		let linea = '<div class="row cajita3" style="width: 95%; "id="tabla'+usernamelist[i]+'"><div class="col-md-1 cajita4"><h5>USUARIO</h5><h1>'+(i+1)+'</h1></div></div><br>'
		$( "#tablero" ).append(linea);
	}

}

function fillRow(user,card){
	let carta = '<div class="col-md-1 "><img class ="carta" src="'+card+'" alt=""></div>'
	$( "#tabla"+user ).append(carta);
}

function populateFriends(){
	for (var i = 0; i < friendlist.length; i++) {
		let friend = '<h4>'+friendlist[i]+'</h4><hr>';
		$( "#friends" ).append(friend);
	}
}
