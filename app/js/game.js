import Board from "./board.js";
import Player from "./player.js";
import Computer from "./computer.js";
import pubSub from "./pubsub";


export default class Game {
	constructor() {
		this.board = new Board();
		this.gameEnded = false;
		this.moveNumber = 1;
		this.computer;
		this.player;
		this.currentPlayer;
		this.bindEvents();
		
	}

	bindEvents() {
		pubSub.subscribe("playerTurn", index => {
			this.playerTurn(index);
		});
		pubSub.subscribe("resetGame", () => {
			this.resetGame();
		});
		pubSub.subscribe("selectSymbol", value => {
			this.selectSymbol(value);
		});
	}
   
	selectSymbol(char) {
		if(char === "X") {
			// If the player chooses X
			this.computer = new Computer("O");
			this.player = new Player("X");
			this.currentPlayer = this.player;
		} else if(char === "O") {
			//If the player choose O
			this.computer = new Computer("X");
			this.player = new Player("O");
			this.currentPlayer = this.computer;
			//The computer selects a square
			const squareIndex = this.computerTurn();
			//The game sets the computer's square as occupied and switches the current Player
			this.executeMove(squareIndex, this.player);  
		}
	}
  
	currentSymbol() {
		return this.currentPlayer.symbol;
	}

	playerScore() {
		return this.player.score;
	}
  
	computerTurn() {
		return this.computer.move(this.moveNumber, this.board.squares, this.playerScore());	
	}

	playerTurn(index) { 
		this.executeMove(index, this.computer);
	}

	executeMove(index, opposingPlayer) {
		if(!this.gameEnded && this.currentPlayer != opposingPlayer && this.board.isSquareEmpty(index)) {
			this.board.setSquareOccupied(index);
			this.currentPlayer.updateScore(this.board.getValue(index));
			this.moveNumber += 1;
			pubSub.publish("renderSquare", {symbol: this.currentSymbol(), index});   
			this.isGameOver();
			this.currentPlayer = opposingPlayer;
			if(!this.gameEnded && this.currentPlayer === this.computer) {
				setTimeout(() => {
					const squareIndex = this.computerTurn();
					this.executeMove(squareIndex, this.player);
				}, 1000);
			}
		}
	}

	isGameOver() {
		let message;
		if(this.currentPlayer.isWinner()) {
			message = this.currentPlayer === this.player ? "You Win!" : "You Lose!";	
		} else if (this.board.isAllFilledIn()) {
			message = "Tie Game!";
		} else {
			return false;
		}
		setTimeout(() => {
			pubSub.publish("renderMessage", message);
		}, 500);
		this.gameEnded = true;
	}

	resetGame() {
		this.board.resetSquares();
		this.player.resetScore();
		this.computer.resetScore();
		this.gameEnded = false;
		this.moveNumber = 1;
		pubSub.publish("renderNewGame", null);
	} 
}







