
var interface = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.renderNew();
  },
  cacheDom: function() {
    this.$square = $('.square');
    this.$popBackground = $('#pop_background');
    this.$popBox = $('#pop_box');
    this.$gameBox = $('#game_box');
    this.$gameBoxText = $('#game_box h1');
    this.$symbol = $('.symbol');    
    this.$yes = $('#yes');
    this.$no = $('#no');
  },
  bindEvents: function() {
    this.$square.click(function() {
      interface.handleClickSquare.call(this);
    });
    this.$symbol.click(function() {
      interface.handleSymbol.call(this);
    });
    this.$yes.click(function() {
      interface.handleRestart();
    });
    this.$no.click(function() {
      interface.handleRestart();
    })
  },
  render: function(player, id) {
    $('#' + id).text(player);
  },
  renderNew: function() {
    this.$popBackground.fadeIn();
    this.$popBox.fadeIn('slow');
    this.$square.text('');
  },
  renderGame: function(string) {
    this.$popBackground.fadeIn();
    this.$gameBoxText.html(string);
    this.$gameBox.fadeIn('slow');  
  },
  handleClickSquare: function() {
   var index = $(this).attr('id');
   theGame.takeaTurn(index);
  },
  handleRestart: function() {
    this.$gameBox.fadeOut('slow');
    setTimeout(function() {
      theGame.resetGame();
    }, 1000);
    
  },
  handleSymbol: function() {
    var symbol = $(this).attr('id');
    interface.$popBackground.fadeOut();
    interface.$popBox.fadeOut();    
    theGame.selectSymbol(symbol);
  },

}



