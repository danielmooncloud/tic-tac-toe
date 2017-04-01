import Player from "./player.js";


export default class Computer extends Player {
	constructor(symbol) {
		super(symbol);
		this._filled = [];
		this._rowCombos = 	[[34, 2],[6, 5],[36, 1], [65, 7], [192, 0], [129, 6], [24, 8], [264, 4], [272, 3], [10, 6], 
							[66, 3], [72, 1], [288, 0], [33, 8], [257, 5], [20, 7], [132, 4], [144, 2], [18, 0], [3, 4],
							[17, 1], [12, 0], [5, 3], [9, 2]]; 

		this._symbol = symbol;
	}
  
	move(movenumber, squares, score) {
		let index;
		for(let i = 0; i < 9; i++) {
			if(!squares[i].isEmpty() && this._filled.indexOf(i) === -1) {
				this._filled.push(i);
			}
		}
		index = (
			movenumber === 1 ? this.getRandom(0, 5) :
			movenumber === 2 ? this.secondMove() :
			movenumber === 3 ? this.thirdMove() :
			movenumber === 4 ? this.fourthMove(score) :
			this.fifthMove(score)
		);
		this._filled.push(index);
		return index;
	}
  
	secondMove() {
		return this._filled[0] === 0 ? this.getRandom(1, 5) : 0;
	}
  
	thirdMove() { 
		if(this._filled[0] === 0) {
			return this._filled[1] < 5 ? this.verticalRow(this._filled[1]) : this.secondMove();
		} else {
			return this.isDiagonal(this._filled[0], this._filled[1])	? 	this.verticalRow(this._filled[1]) 	: 
											this._filled[1] === 0	 	?	this.diagonal(this._filled[0]) 		: 	0;
		}	
	}

	fourthMove(playerScore) {
		return 	this.rowDetector(playerScore)	|| 
			(
			this.isDiagonal(this._filled[0], this._filled[2])	? 	this.getRandom(5, 9)			: 
										this._filled[2] > 4		?	this.adjacent(this._filled[2])	: 	this.getRandom(1, 5)
		);
	}

	fifthMove(playerScore) {
		return	this.rowDetector(this.score) || this.rowDetector(playerScore) ||
				(
				this.horzAdj(this._filled[0], this._filled[1])	?	this.verticalRow(this._filled[0])		:
				this.vertAdj(this._filled[0], this._filled[1])	?	this.horizontalRow(this._filled[0])		: 	
				this._filled[0] > 0 && this._filled[0] < 5 &&
				this._filled[1] > 0 && this._filled[1] < 5 &&
				this._filled[2] > 0 && this._filled[2] < 5		?	this.getRandom(0, 5)	:  this.getRandom(0, 9)   
			);
	}

	rowDetector(num1) {
		for(let i = 0; i < this._rowCombos.length; i++) {
			if(((num1 & this._rowCombos[i][0]) === this._rowCombos[i][0]) && this._filled.indexOf(this._rowCombos[i][1]) === -1) {       
				return this._rowCombos[i][1];
			}
		} return false;
	}

	isDiagonal(num1,num2) {
		return ((num1 === 1 && num2 === 4) || 
				(num1 === 4 && num2 === 1) || 
				(num1 === 2 && num2 === 3) || 
				(num1 === 3 && num2 === 2));
	}
  
	diagonal(num) {
		return (num === 1 ? 4 :
				num === 4 ? 1 :
				num === 2 ? 3 :
				num === 3 ? 2 : false);
	}
  
	verticalRow(num) {
		return (num === 1 ? 3 :
				num === 3 ? 1 :
				num === 2 ? 4 :
				num === 4 ? 2 : false);
	}

	horizontalRow(num) {
		return (num === 1 ? 2 :
				num === 2 ? 1 :
				num === 3 ? 4 :
				num === 4 ? 3 : false);
	}
  
	adjacent(num) {
		return (num === 5 || num === 6 ? 1 :
				num === 7 || num === 8 ? 4 : false);
	}
  
	horzAdj(num1, num2) {
		return ((num1 === 1 || num1 === 2) && (num2 === 5) ? true :
				(num1 === 3 || num1 === 4) && (num2 === 8) ? true : false);
	}

	vertAdj(num1, num2) {
		return ((num1 === 1 || num1 === 3) && (num2 === 6) ? true :
				(num1 === 2 || num1 === 4) && (num2 === 7) ? true : false);
	}

	getRandom(min, max) {
		let random;
		do {
			random = Math.floor((Math.random() * (max - min) + min));
		} while (this._filled.indexOf(random) != -1);
		return random;
	}
}




