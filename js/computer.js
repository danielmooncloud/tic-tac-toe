function Computer(symbol) {
  'use strict';
  var filled = [];
  var rowCombos = [[34, 2],[6, 5],[36, 1], [65, 7], [192, 0], [129, 6], [24, 8], [264, 4], [272, 3], [10, 6], 
                   [66, 3], [72, 1], [288, 0], [33, 8], [257, 5], [20, 7], [132, 4], [144, 2], [18, 0], [3, 4],
                   [17, 1], [12, 0], [5, 3], [9, 2]]; 
  
  this.symbol = symbol;
  
  this.move = function(num, array, score) {
    for(var i = 0; i < 9; i++) {
      var digit = i;
      if(array[i].marked && filled.indexOf(digit) === -1) {
        filled.push(digit);
      }
    }
    
  	var index;
    switch(num) {
    	case 1:
    	index = this.firstMove();
      filled.push(index);
      return index;
    	break; 

    	case 2:
    	index = this.secondMove();
      filled.push(index);
      return index;
    	break;

      case 3:
      index = this.thirdMove();
      filled.push(index)
      return index;
      break;

      case 4:
      index = this.fourthMove(score);
      filled.push(index);
      return index;
      break;
    }

    if(num >= 5) {
      var special;
      index = this.fifthMove(score);
      filled.push(index);
      return index;
    }

  };
  this.firstMove = function() {
  	var random = Math.floor(Math.random()*5);
  	return random;
  };
  
  this.secondMove = function() {
  	if(filled[0] !== 0) {
  		return 0;
  	}
  	else {
  		var random = Math.floor((Math.random() * 4) + 1);
  		return random;
  	}
  };
  
  this.thirdMove = function() { 
  		if(filled[0] === 0) {
        if(filled[1] < 5) {
          return this.verticalRow(filled[1])
        }
        else {
          return this.secondMove();
        }
      }
      else {
        if(this.isDiagonal(filled[0], filled[1])) {
          return this.verticalRow(filled[1])
        }
        else if(filled[1] === 0) {
          return this.diagonal(filled[0]);
        }
        else {
          return 0;
        }
      }	
  }

  this.fourthMove = function(playerScore) {
    if(this.rowDetector(playerScore)) {
      return this.rowDetector(playerScore);
    }
    else if(this.isDiagonal(filled[0], filled[2])) {
      var random = Math.floor((Math.random() * 4) + 5);
      return random;
    }
    else if (filled[2] > 4) {
      return this.adjacent(filled[2]);
    };
  }

  this.fifthMove = function(playerScore) {
    if(this.rowDetector(this.score)) {
      return this.rowDetector(this.score);
    }

    else if(this.rowDetector(playerScore)) {
      return this.rowDetector(playerScore);
    }

    else if(this.horzAdj(filled[0], filled[1])) {
      return this.verticalRow(filled[0]);
  }
    else if(this.vertAdj(filled[0], filled[1])) {
      return this.horizontalRow(filled[0]);
    }
    else {
      return this.getRandom(0,9);
    }
  }

  this.rowDetector = function(num1) {
    for(var i = 0; i < rowCombos.length; i++) {
        if(((num1 & rowCombos[i][0]) === rowCombos[i][0]) && filled.indexOf(rowCombos[i][1]) === -1) {       
          return rowCombos[i][1];
        }
    } return false;
  }

  this.isDiagonal = function(num1,num2) {
    if((num1 === 1 && num2 === 4) || (num1 === 4 && num2 === 1) || (num1 === 2 && num2 === 3) || (num1 === 3 && num2 === 2)) {
      return true;
    } 
    return false;
  }
  
  this.diagonal = function(num) {
    switch(num) {
      case 1:
      return 4;
      break;

      case 2:
      return 3;
      break;

      case 3:
      return 2;
      break;

      case 4:
      return 1;
      break;
    }
  };
  
  this.verticalRow = function(num) {
    switch(num) {
      case 1:
      return 3;
      break;

      case 2:
      return 4;
      break;

      case 3:
      return 1;
      break;

      case 4:
      return 2;
      break;
    }
  };

  this.horizontalRow = function(num) {
    switch(num) {
      case 1:
      return 2;
      break;

      case 2:
      return 1;
      break;

      case 3:
      return 4;
      break;

      case 4:
      return 3;
      break;
    }
  };
  
  this.adjacent = function(num) {
    if(num === 5 || num === 6) {
      return 1;
    }
    if(num === 7 || num === 8) {
      return 4;
    }
  }
  
  this.horzAdj = function(num1, num2) {
    if((num1 === 1 || num1 === 2) && (num2 === 5)) {
      return true;
    }
    if((num1 === 3 || num1 === 4) && (num2 === 8)) {
      return true;
    } return false;
  };

  this.vertAdj = function(num1, num2) {
    if((num1 === 1 || num1 === 3) && (num2 === 6)) {
      return true;
    }
    if((num1 === 2 || num1 === 4) && (num2 === 7)) {
      return true;
    } return false;
  }

  this.getRandom = function(min, max) {
    var random = Math.floor((Math.random() * (max - min) + min));
    if(filled.indexOf(random) !== -1) {
      return this.getRandom(min, max);
    }
    else {
      return random;
    }
  }  
}

Computer.prototype = new Player();
