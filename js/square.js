function Square(value) {
  'use strict';
  this.value = value;
  this.marked = false;
  this.squareValue = function() {
    return this.value;
  };
  this.setOccupied = function() {
    this.marked = true;
  };
  this.setEmpty = function() {
    this.marked = false;
  };
  this.isEmpty = function() {
    return (!this.marked);
  };
}
