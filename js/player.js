function Player(symbol) {
  'use strict'
  
  this.symbol = symbol;
  
  this.getSymbol = function() {
    return this.symbol;
  }
  
  this.getScore = function() {
    return this.score;
  }
  
  this.score = 0;
  
  this.threeinaRow = [38, 193, 280, 74, 289, 148, 19, 13];
  
  this.updateScore = function(points) {
    this.score += points;
  };
  
  this.isWinner = function() {
    for(var i = 0; i < this.threeinaRow.length; i++) {
      if((this.threeinaRow[i] & this.score) === this.threeinaRow[i]) {
        return true;
      }
    } return false;
  };
  
  this.resetScore = function() {
    this.score = 0;
  };  
}






