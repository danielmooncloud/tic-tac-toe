import Game from "./game.js";
import "../scss/application.scss";

const view = { 
	init() {
		this.cacheDom();
		this.bindEvents();
		this.renderNew();
	},
  
	cacheDom() {
		this.$main = $(".main");
		this.$popBackground = $("#pop_background");
		this.$gameBox = $("#game_box");
		this.$popBox = $("#pop_box");
		this.$square = this.$main.find(".square");
		this.$symbol = this.$popBox.find(".symbol"); 
		this.$gameBoxText = this.$gameBox.find("h1");   
		this.$yes = this.$gameBox.find("#yes");
		this.$no = this.$gameBox.find("#no");
	},
  
	bindEvents() {
		this.$square.click((e) => {
			view.handleClickSquare(e.target.id);
		});
		this.$symbol.click((e) => {
			view.handleSymbol(e.target.id);
		});
		this.$yes.click(() => {
			view.handleRestart();
		});
		this.$no.click(() => {
			view.handleRestart();
		});
	},
  
	render(player, id) {
		$("#" + id).text(player);
	},
  
	renderNew() {
		this.$popBackground.fadeIn();
		this.$popBox.fadeIn("slow");
		this.$square.text("");
	},
  
	renderGame(string) {
		this.$popBackground.fadeIn();
		this.$gameBoxText.html(string);
		this.$gameBox.fadeIn("slow");  
	},
  
	handleClickSquare(index) {
		game.playerTurn(index);
	},
  
	handleRestart() {
		this.$gameBox.fadeOut("slow");
		setTimeout(() => {
			game.resetGame();
		}, 1000);  
	},
 
	handleSymbol(value) {
		this.$popBackground.fadeOut();
		this.$popBox.fadeOut();    
		game.selectSymbol(value);
	}
};

const game = new Game();

$(document).ready(function() {
	game.init(view);
});


