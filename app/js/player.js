export default class Player {
	constructor(symbol) {
		this._symbol = symbol;
		this._score = 0;
		this._threeinaRow = [38, 193, 280, 74, 289, 148, 19, 13];
	}

	get symbol() {
		return this._symbol;
	}

	get score() {
		return this._score;
	}

	updateScore(points) {
		this._score += points;
	}

	resetScore() {
		this._score = 0;
	}

	isWinner() {
		for(var i = 0; i < this._threeinaRow.length; i++) {
			if((this._threeinaRow[i] & this.score) === this._threeinaRow[i]) {
				return true;
			}
		} return false;
	}
}






