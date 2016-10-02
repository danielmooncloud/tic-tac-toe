var interface = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.renderNew();
  },
  cacheDom: function() {
    this.$square = $('.square');
    this.$restart = $('.restart');
    this.$popBackground = $('#pop_background');
    this.$popBox = $('#pop_box');
    this.$symbol = $('.symbol');    
  },
  bindEvents: function() {
    this.$square.click(function() {
      interface.handleClickSquare.call(this);
    });
    this.$restart.click(function() {
      interface.handleRestart.call(this);
    });
    this.$symbol.click(function() {
      interface.handleSymbol.call(this);
    })
  },
  render: function(player, id) {
    $('#' + id).text(player);
  },
  renderNew: function() {
    this.$popBackground.fadeIn();
    this.$popBox.fadeIn();
    this.$square.text('');
  },
  handleClickSquare: function() {
   var index = $(this).attr('id');
   theGame.takeaTurn(index);
  },
  handleRestart: function() {
    theGame.resetGame();
  },
  handleSymbol: function() {
    var symbol = $(this).attr('id');
    interface.$popBackground.fadeOut();
    interface.$popBox.fadeOut();    
    theGame.selectSymbol(symbol);
  }
}



