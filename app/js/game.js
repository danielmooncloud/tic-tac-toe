import Board from "./board.js";
import Player from "./player.js";
import Computer from "./computer.js";



export default class Game {
	constructor() {
		this.board = new Board();
		this.gameEnded = false;
		this.moveNumber = 1;
	}

	init(view) {
		this.view = view;
		this.view.init();
	}
   
	selectSymbol(char) {
		if(char === 'X') {
			this.computer = new Computer('O');
			this.player = new Player('X');
			this.currentPlayer = this.player;
		} else if(char === 'O') {
			this.computer = new Computer('X');
			this.player = new Player('O');
			this.currentPlayer = this.computer; 
			this.executeMove(this.computerTurn(), this.player);  
		}
	}
	  
	currentSymbol() {
		return this.currentPlayer.symbol;
	}
	  
	playerScore() {
		return this.player.score;
	}
  
	computerTurn() {
		return this.currentPlayer.move(this.moveNumber, this.board.squares, this.playerScore());	
	}
	  
	playerTurn(index) {
		this.executeMove(index, this.computer);
		setTimeout(() => {
			if(!this.gameEnded && this.currentPlayer === this.computer) {
				this.executeMove(this.computerTurn(), this.player);
			}
		}, 1000);
	}

	executeMove(index, player) {
		if(!this.gameEnded && this.currentPlayer != player && this.board.isSquareEmpty(index)) {
			this.board.setSquareOccupied(index);
			this.currentPlayer.updateScore(this.board.getValue(index));
			this.moveNumber += 1;
			this.view.render(this.currentSymbol(), index);         
			this.ifOver();
			this.currentPlayer = player;
		}
	}

	ifOver() {
		let message;
		if(this.currentPlayer.isWinner()) {
			message = this.currentPlayer === this.player ? "You Win!" : "You Lose!";	
		} else if (this.board.isAllFilledIn()) {
			message = "Tie Game!";
		} else {
			return false;
		}
		setTimeout(() => {
			this.view.renderGame(message);
		}, 1000);
		this.gameEnded = true;
	}
	  
	resetGame() {
		this.board.resetSquares();
		this.player.resetScore();
		this.computer.resetScore();
		this.gameEnded = false;
		this.moveNumber = 1;
		this.view.renderNew();
	} 
}







