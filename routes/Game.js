/**
 * Created by RPadro on 01/05/2017.
 */

class Game{

	constructor(turn, score, season){
		this.score = score;
		this.turn = turn;
		this.season = season;
	}

	static get counter(){
		Game._counter = (Game._counter || 0) + 1;
		return Game._counter;
	}

	static get reducer(){
		if(Game._counter == 0){
			Game._counter = 0;
		}else{
			Game._counter = Game._counter - 1;
		}
		return Game._counter;
	}

	static get count(){
		return Game._counter;
	}

	isEmpty(){
		return Game.count == 0;
	}

	isFull(){
		return Game.count == 5;
	}

	addPlayer(username){
		console.log("Player added", Game.counter);
	}

	exitPlayer(username){
		console.log("Player exited", Game.reducer);
	}

}

export {Game};