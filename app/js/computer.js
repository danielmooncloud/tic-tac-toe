import Player from "./player.js";


export default class Computer extends Player {
	constructor(symbol) {
		super(symbol);
		//The computers list of occupied squares
		this._filled = [];

		//they keys represent square indices,
		//the keys array values represent scores for each row or column running through that square
		this._rowCombos = {
			0: [12, 18, 192, 288],
			1: [17, 36, 72],
			2: [9, 34, 144],
			3: [5, 66, 272],
			4: [3, 132, 264],
			5: [6, 257],
			6: [10, 129],
			7: [20, 65],
			8: [24, 33]
		};

		this.movesList = {
			1: this.getRandomCornerSquare.bind(this),
			2: this.secondMove.bind(this),
			3: this.thirdMove.bind(this),
			4: this.fourthMove.bind(this),
			5: this.laterMoves.bind(this),
			6: this.laterMoves.bind(this),
			7: this.laterMoves.bind(this),
			8: this.laterMoves.bind(this),
			9: this.laterMoves.bind(this)
		};
	}


	move(moveNumber, squares, playerScore) {
		//Fills in any previously unoccupied squarse
		for(let i = 0; i < 9; i++) {
			if(!squares[i].isEmpty() && this._filled.indexOf(i) === -1) {
				this._filled.push(i);
			}
		}
		// A table which tells the computer which function to use depending on the moveNumber
		const index = this.movesList[moveNumber](playerScore); 	
		this._filled.push(index);
		return index;
	}
  

	secondMove() {
		return this.isOccupied(0) ? this.getRandomCornerSquare() : 0;
	}
  


	thirdMove() {
		const computerSquare = this._filled[0];
		const playerSquare = this._filled[1];
		const centerSquare = 0;
		//If the computer and player squares are diagonal to each other return the square vertical to the player's square
		if(playerSquare === this.diagonalTo(computerSquare)) return this.verticalTo(playerSquare);
		else if(playerSquare === this.verticalTo(computerSquare)) return this.diagonalTo(computerSquare);
		else if(playerSquare === this.horizontalTo(computerSquare)) return this.diagonalTo(computerSquare);
		//Computer takes the center square if it is empty
		else if(!this.isOccupied(centerSquare)) return centerSquare;
		//If the player has the center square, computer takes the square diagonal to its last square
		else if(playerSquare === centerSquare) return this.diagonalTo(computerSquare);
		//If the computer has the center square it takes the square vertical to the player's square
		else return this.verticalTo(playerSquare);
	}


	fourthMove(playerScore) {
		const num1 = this._filled[0];
		const num2 = this._filled[2];
		const rowsToBlock = this.rowDetector(playerScore);
		//If there is a row that should be blocked, return the last square in that row
		if(rowsToBlock !== null) return rowsToBlock;
		else if(num2 === this.diagonalTo(num1, num2)) return this.getRandomSideSquare();
		else if(this.isSideSquare(num2)) return this.adjacentTo(num2);
		else return this.getRandomCornerSquare();
	}


	laterMoves(playerScore) {
		const num1 = this._filled[0];
		const num2 = this._filled[1];
		const num3 = this._filled[2];
		const rowsToComplete = this.rowDetector(this._score);
		const rowsToBlock = this.rowDetector(playerScore);
		if(rowsToComplete !== null) return rowsToComplete;
		else if(rowsToBlock !== null) return rowsToBlock;
		else if(this.isHorzAdj(num1, num2)) return this.verticalTo(num1);
		else if(this.isVertAdj(num1, num2)) return this.horizontalTo(num1);
		else if(this.isCornerSquare(num1) && this.isCornerSquare(num2) && !this.isSideSquare(num3)) return this.getRandomCornerSquare();	
		else return this.getRandomSquare();
	}


	rowDetector(score) {
		//Iterates through rowCombos values and checks for a match bit-match with score
		//if a value matches score, the key of that value (the square index) is returned
		const keys = Object.keys(this._rowCombos);
		for(let key = 0; key < keys.length; key++) {
			const curr = this._rowCombos[key];
			for(let rowScore = 0; rowScore < curr.length; rowScore++) {
				//Uses a bitwise operator to compare the score with the rows value
				if((score & curr[rowScore]) === curr[rowScore] && this._filled.indexOf(key) === -1) {
					return key;
				}
			}
		}
		//console.log(null);
		return null;
	}

	//These functions return a square that meets the criteria provided by the initial square
  
	diagonalTo(num) {
		const options = {1: 4, 4: 1, 2: 3, 3: 2};
		return options[num] || false;
	}

	verticalTo(num) {
		const options = {1: 3, 3: 1, 2: 4, 4: 2};
		return options[num] || false;
	}

	horizontalTo(num) {
		const options = {1: 2, 2: 1, 3: 4, 4: 3};
		return options[num] || false;
	}
  
	adjacentTo(num) {
		const options = {5: 1, 6: 1, 7: 4, 8: 4};
		return options[num] || false;
	}

	//These functions return information about the relative position of the given squares
	
  
	isHorzAdj(num1, num2) {
		const options = {
			5: {1: true, 2: true},
			8: {3: true, 4: true}
		};
		return options[num2] && options[num2][num1] || false;
	}

	isVertAdj(num1, num2) {
		const options = {
			6: { 1: true, 3: true },
			7: { 2: true, 4: true }
		};
		return options[num2] && options[num2][num1] || false;
	}

	// Utility functions

	getRandom(min, max) {
		let random;
		do {
			random = Math.floor((Math.random() * (max - min + 1) + min));
		} while (this._filled.indexOf(random) != -1);
		return random;
	}

	getRandomSquare() {
		return this.getRandom(0, 9);
	}

	getRandomCornerSquare() {
		return this.getRandom(1, 4);
	}

	getRandomCornerSquareOrCenter() {
		return this.getRandom(0, 4);
	}

	getRandomSideSquare() {
		return this.getRandom(5, 9);
	}

	isOccupied(num) {
		return this._filled.indexOf(num) > -1;
	}

	isCornerSquare(num) {
		return num > 0 && num < 5;
	}

	isSideSquare(num) {
		return num >= 5;
	}
}




