/**
 * Created by RPadro on 02/05/2017.
 */

class Player {
	constructor (username){
		this._username = username;
	}

	get username(){
		return this._username;
	}

	get hand(){
		return this._hand;
	}

	set hand(hand){
		this._hand = hand;
	}

	set score(score){
		this._score = score;
	}
}

export {Player};