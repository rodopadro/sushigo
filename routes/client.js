/**
 * Created by RPadro on 02/05/2017.
 */
let hand = [];
let play =[];
let player;
const socket = io();

var data = sessionStorage.getItem('userId');


let tempuras= 0,
    makis=0,
    sashimis=0,
    kiosas= 0,
    puddings= 0,
    score=0;

let userId = '<%= Session["userId"] %>';


socket.on('addPlayer', (Player)=>{
  addPlayer(Player);
});

socket.on('updateScores', (Player, score)=>{
  updatePoints(Player,score);

});

socket.on('updateBoard', (Player, card) => {
  fillRow(Player,card.src);
});

socket.on('updateHand', (Hand)=>{
  populateHand(Hand);
});

/*socket.on('getUserID4Score', (Player)=>{
  calculateScore(Player);
});*/


function populateHand(hand){
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

function chooseCard(Player,CardIndex){



}


function calculateScore(Player){
    for (var y = 0; y < Player.onPlay.length; y++) {

      switch(Player.onPlay[y].type){

        case "tempura" :
          tempuras++;
          break;
        case "maki_roll" :
          makis++;
          break;
        case "sashimi" :
          sashimis++;
          break;
        case "dumpling" :
          kiosas++;
          break;
        case "pudding" :
          puddings++;
          break;
        case "wasabi":
          if((y < Player.onPlay.length-1)){
            console.log("si entro");
            if(Player.onPlay[y+1].type == "nigiri_salmon" || Player.onPlay[y+1].type == "nigiri_egg" || Player.onPlay[y+1].type == "nigiri_squid" ){

              score+=(Player.onPlay[y+1].value*2);
            }
          }
          break;
        default: 
          break;

      }


      
    }
    
    if(tempuras >=2 ){

      var x = playersArray[i].combos.tempuras/2;

      var answer = Math.floor(x);
      console.log(answer);

      score+=answer*5;
    }
    if(sashimis >= 3){

      var x = playersArray[i].combos.sashimis/3;

      var answer = Math.floor(x);
      console.log(answer);

      score+=answer*10;

    }
    if(playersArray[i].combos.makis >= 2 ){
      
      score+=6;
      
    }
    if(kiosas !=0 ){
      if(kiosas == 1){
        score+=1;
      }
      if(kiosas ==2){
        playersArray[i].score+=3;
      }
      if(kiosas == 3){
        playersArray[i].score+=6;
      }
      if(kiosas == 4){
        playersArray[i].score+=10;
      }
      if(kiosas >= 45){
        playersArray[i].score+=15;
      }else{

      }
      
    }
    if(puddings >= 3 ){
      
      score+=10;
      
    }
    socket.emit('scoreCalculated',Player,score);
    // return score;

}