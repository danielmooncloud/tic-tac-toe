import Square from "./square.js";


export default class Board {
	constructor() {
		this._squares = [];
		this.addSquares();
	}


	addSquares() {
		for(var i = 0; i < 9; i++) {
			this._squares[i] = new Square(Math.pow(2, i));
		}
	}

	getValue(squareIndex) {
		return this._squares[squareIndex]._value;
	}

	setSquareOccupied(squareIndex) {
		this._squares[squareIndex].setOccupied();
	}

	isSquareEmpty(squareIndex) {
		return this._squares[squareIndex].isEmpty();
	}

	get squares() {
		return this._squares;
	}

	resetSquares() {
		for(var i = 0; i < this.squares.length; i++) {
			this._squares[i].setEmpty();
		}
	}

	isAllFilledIn() {
		for(var i = 0; i < this.squares.length; i++) {
			if(this._squares[i].isEmpty()) {
				return false;
			}
		} return true;
	}
}




