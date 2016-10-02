function Board() {
  'use strict';
  this.squares = [];
  this.addSquares = function() {
    for(var i = 0; i < 9; i++) {
      this.squares[i] = new Square(Math.pow(2, i));
    }
  };
  this.addSquares();
  this.getValue = function(squareIndex) {
    return this.squares[squareIndex].squareValue();
  };
  this.setSquareOccupied = function(squareIndex) {
    this.squares[squareIndex].setOccupied();
  };
  this.isSquareEmpty = function(squareIndex) {
    return this.squares[squareIndex].isEmpty();
  };
  this.returnSquares = function() {
    return this.squares;
  };
  this.resetSquares = function() {
    for(var i = 0; i < this.squares.length; i++) {
      this.squares[i].setEmpty();
    }
  };
  this.isAllFilledIn = function() {
    for(var i = 0; i < this.squares.length; i++) {
      if(this.squares[i].isEmpty()) {
        return false;
      }
    } return true;
  }
}





