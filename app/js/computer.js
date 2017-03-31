var Player = require("./player.js");


function Computer(symbol) {
	'use strict';
	var filled = [];
	var rowCombos = [[34, 2],[6, 5],[36, 1], [65, 7], [192, 0], [129, 6], [24, 8], [264, 4], [272, 3], [10, 6], 
					[66, 3], [72, 1], [288, 0], [33, 8], [257, 5], [20, 7], [132, 4], [144, 2], [18, 0], [3, 4],
					[17, 1], [12, 0], [5, 3], [9, 2]]; 
  
	this.symbol = symbol;
  
	this.move = function(movenumber, squares, score) {
		var index;
		for(var i = 0; i < 9; i++) {
			if(squares[i].marked && filled.indexOf(i) === -1) {
				filled.push(i);
			}
		}

		index = (
			movenumber === 1 ? this.getRandom(0, 5) :
			movenumber === 2 ? this.secondMove() :
			movenumber === 3 ? this.thirdMove() :
			movenumber === 4 ? this.fourthMove(score) :
			this.fifthMove(score)
		)
		filled.push(index);
		return index;
	};
  
	this.secondMove = function() {
		return filled[0] === 0 ? this.getRandom(1, 5) : 0
	};
  
	this.thirdMove = function() { 
		if(filled[0] === 0) {
			return filled[1] < 5 ? this.verticalRow(filled[1]) : this.secondMove();
		} else {
			return this.isDiagonal(filled[0], filled[1])	? 	this.verticalRow(filled[1]) : 
										filled[1] === 0	 	?	this.diagonal(filled[0]) 	: 	0
		}	
	}

	this.fourthMove = function(playerScore) {
		return 	this.rowDetector(playerScore)	|| 
			(
			this.isDiagonal(filled[0], filled[2])	? 	this.getRandom(5, 9)		: 
									filled[2] > 4	?	this.adjacent(filled[2])	: 	this.getRandom(1, 5)
		);
	}

	this.fifthMove = function(playerScore) {
		return	this.rowDetector(this.score) || this.rowDetector(playerScore) ||
				(
				this.horzAdj(filled[0], filled[1])	?	this.verticalRow(filled[0])		:
				this.vertAdj(filled[0], filled[1])	?	this.horizontalRow(filled[0])	: 	this.getRandom(0, 9)
			);
	}

	this.rowDetector = function(num1) {
		for(var i = 0; i < rowCombos.length; i++) {
			if(((num1 & rowCombos[i][0]) === rowCombos[i][0]) && filled.indexOf(rowCombos[i][1]) === -1) {       
				return rowCombos[i][1];
			}
		} return false;
	}

	this.isDiagonal = function(num1,num2) {
		return ((num1 === 1 && num2 === 4) || 
				(num1 === 4 && num2 === 1) || 
				(num1 === 2 && num2 === 3) || 
				(num1 === 3 && num2 === 2))
	}
  
	this.diagonal = function(num) {
		return (num === 1 ? 4 :
				num === 4 ? 1 :
				num === 2 ? 3 :
				num === 3 ? 2 : false)
	};
  
	this.verticalRow = function(num) {
		return (num === 1 ? 3 :
				num === 3 ? 1 :
				num === 2 ? 4 :
				num === 4 ? 2 : false)
	};

	this.horizontalRow = function(num) {
		return (num === 1 ? 2 :
				num === 2 ? 1 :
				num === 3 ? 4 :
				num === 4 ? 3 : false)
	};
  
	this.adjacent = function(num) {
		return (num === 5 || num === 6 ? 1 :
				num === 7 || num === 8 ? 4 : false)
	}
  
	this.horzAdj = function(num1, num2) {
		return ((num1 === 1 || num1 === 2) && (num2 === 5) ? true :
				(num1 === 3 || num1 === 4) && (num2 === 8) ? true : false)
	};

	this.vertAdj = function(num1, num2) {
		return ((num1 === 1 || num1 === 3) && (num2 === 6) ? true :
				(num1 === 2 || num1 === 4) && (num2 === 7) ? true : false)
	}

	this.getRandom = function(min, max) {
		var random;
		do {
			random = Math.floor((Math.random() * (max - min) + min));
		} while (filled.indexOf(random) != -1)
			return random;
	}
}

Computer.prototype = new Player();

module.exports = Computer;
