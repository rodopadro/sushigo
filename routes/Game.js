/**
 * Created by RPadro on 01/05/2017.
 */

class Game{

	constructor(){
		this._players = [];
		this._counter = 0;
		this._playersReady = 0;
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

}

export {Game};