function Game() {
	var thePlayer,
		theComputer,
		theBoard = new Board(),
		gameEnded = false,
		moveNumber = 1;
		self = this;
  
	  
	this.selectSymbol = function(char) {
		if(char === 'X') {
			theComputer = new Computer('O');
			thePlayer = new Player('X');
			this.currentPlayer = thePlayer;
		} else if(char === 'O') {
			theComputer = new Computer('X');
			thePlayer = new Player('O');
			this.currentPlayer = theComputer; 
			this.executeMove(this.computerTurn(), thePlayer);  
		}
	}
	  
	this.currentSymbol = function() {
		return this.currentPlayer.getSymbol();
	}
	  
	this.playerScore = function() {
		return thePlayer.getScore();
	}
  
	this.computerTurn = function() {
		return this.currentPlayer.move(moveNumber, theBoard.returnSquares(), this.playerScore());	
	}
	  
	this.takeaTurn = function(index) {
		this.executeMove(index, theComputer);
		setTimeout(function() {
			if(!gameEnded && self.currentPlayer === theComputer) {
				self.executeMove(self.computerTurn(), thePlayer);
			}
		}, 1000);
	}

	this.executeMove = function(index, player) {
		if(!gameEnded && this.currentPlayer != player && theBoard.isSquareEmpty(index)) {
			theBoard.setSquareOccupied(index);
			this.currentPlayer.updateScore(theBoard.getValue(index));
			moveNumber += 1;
			interface.render(this.currentSymbol(), index);         
			this.ifOver();
			this.currentPlayer = player;
		}
	}

	this.ifOver = function() {
		var message;
		if(this.currentPlayer.isWinner()) {
			message = this.currentPlayer === thePlayer ? "You Win!" : "You Lose!";	
		} else if (theBoard.isAllFilledIn()) {
			message = "Tie Game!";
		} else {
			return false;
		}
		setTimeout(function() {
			interface.renderGame(message);
		}, 1000);
		gameEnded = true;
	}
	  
	this.resetGame = function() {
		theBoard.resetSquares();
		thePlayer.resetScore();
		theComputer.resetScore();
		gameEnded = false;
		moveNumber = 1;
		interface.renderNew();
	} 
}









