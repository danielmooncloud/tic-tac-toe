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
        }
        else if(char === 'O') {
        theComputer = new Computer('X');
        thePlayer = new Player('O');
        this.currentPlayer = theComputer; 
        this.computerTurn();  
        }
      }
      
      this.playerSymbol = function() {
        return this.currentPlayer.getSymbol();
      }
      
      this.playerScore = function() {
        return thePlayer.getScore();
      }
  
      this.computerTurn = function() {
       if(!gameEnded) {
        if(this.currentPlayer === theComputer) {
            var index = this.currentPlayer.move(moveNumber, theBoard.returnSquares(), this.playerScore());
            var symbol = this.playerSymbol();
            if(theBoard.isSquareEmpty(index)) {
            theBoard.setSquareOccupied(index);
            this.currentPlayer.updateScore(theBoard.getValue(index));
            moveNumber += 1;
            interface.render(symbol, index);
    
            if(this.currentPlayer.isWinner()) {
              setTimeout(function() {
                interface.renderGame('You Lose!');
              }, 1000);
              gameEnded = true;
            }
            
            if(this.isTie()) {
              setTimeout(function() {
                interface.renderGame('Tie Game!');
              }, 1000);
              gameEnded = true;
            }
            this.currentPlayer = thePlayer;
            } 
          }
        } 
      }
      
      this.takeaTurn = function(squareIndex) {
        
        if(!gameEnded) {
        if(this.currentPlayer = thePlayer) {
          if(theBoard.isSquareEmpty(squareIndex)) {
            theBoard.setSquareOccupied(squareIndex);
            this.currentPlayer.updateScore(theBoard.getValue(squareIndex));
            moveNumber += 1;
            interface.render(this.playerSymbol(), squareIndex);         
            if(this.currentPlayer.isWinner()) {
              setTimeout(function() {
                interface.renderGame('You Win!');
              }, 1000);
              gameEnded = true;
            }
            
            if(this.isTie()) {
              setTimeout(function() {
                interface.renderGame('Tie Game!');
              }, 1000);
              gameEnded = true;
            }
            
            this.currentPlayer = theComputer;
            setTimeout(function() {
                self.computerTurn();
                  },1000);
                }
              }
            }
            
          }
       
      this.isTie = function() {
        if(theBoard.isAllFilledIn()) {
          if(!this.currentPlayer.isWinner()) {
            return true;
          }
        } return false;
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









