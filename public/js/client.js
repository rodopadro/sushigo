/**
 * Created by RPadro on 02/05/2017.
 */
let myhand = [];
let player;
let username = "Fernando";
const socket = io();

socket.on('addPlayer', (Player)=>{
	addPlayer(Player);

});

socket.on('fillTables', (Players)=>{
	fillTables(Players);
});

socket.on('updateScores', (Player, score)=>{
	updatePoints(Player,score);
});

socket.on('updateBoard', (Player, card) => {
	console.log(card);
	fillRow(Player,card.src);
});

socket.on('updateHand', (username, Hand)=>{
	populateHand(Hand);
});

socket.on('error', error => alert(error));

function populateHand(hand){
	$( "#hand" ).empty();
	myhand = hand;
	for (let i = 0; i < hand.length; i++) {
		let cartamano = '<div class="col-md-1 contecarta" id="Hand'+i+'"><img class ="cartamano" src="'+hand[i]._src+'" alt=""></div>'
		$( "#hand" ).append(cartamano);
	}
	$('div.contecarta').click(function() {
		let id = $(this).attr('id');
		console.log(myhand[id]);
		socket.emit('cardPicked', myhand[id], username, id);
		$( "#"+id ).remove();
		console.log("Removiendo lugar:" + id);

		myhand.splice(id,1);
		console.log(myhand);
		return false;
	});
}

function populateScore(){
	for (let i = 0; i < usernamelist.length; i++) {
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

function fillTables(username, card){
	for (let i = 0; i < usernamelist.length; i++) {
		let linea = '<div class="row cajita3" style="width: 95%; "id="tabla'+usernamelist[i]+'"><div class="col-md-1 cajita4"><h5>USUARIO</h5><h1>'+(i+1)+'</h1></div></div><br>'
		$( "#tablero" ).append(linea);
	}
}

function fillRow(user,card){
	let carta = '<div class="col-md-1 "><img class ="carta" src="'+card.src+'" alt=""></div>'
	$( "#tabla"+user ).append(carta);
}

function populateFriends(){
	for (let i = 0; i < friendlist.length; i++) {
		let friend = '<h4>'+friendlist[i]+'</h4><hr>';
		$( "#friends" ).append(friend);
	}
}

function ready(){
	socket.emit('playerReady');
}

//Obtiene los datos de la ventada anterior

//Detecta el click en la carta
$(document).ready(function () {
	if(sessionStorage.getItem('tipo') == 'create'){
		console.log(sessionStorage.getItem('id'));
		socket.emit('createRoom', sessionStorage.getItem('id'), username);
	}else{
		console.log(sessionStorage.getItem('id'));
		console.log("Hola, esto falla");
		socket.emit('connectToRoom', sessionStorage.getItem('id'), username);
	}

});
