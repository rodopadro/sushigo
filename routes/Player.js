/**
 * Created by RPadro on 02/05/2017.
 */

class Player {
	constructor (username){
		this._username = username;
		this._onPlay = [];
		this._onHand = [];
	}

	get username(){
		return this._username;
	}

	get hand(){
		return this._onHand;
	}

	set hand(hand){
		this._onHand = _onHand;
	}

	set score(score){
		this._score = score;
	}
}

export {Player};
