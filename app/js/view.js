import pubSub from "./pubsub";


export default class View { 
	constructor() {
		this.cacheDom();
		this.bindEvents();
		this.renderNewGame();
	}
  
	cacheDom() {
		this.$main = $(".main");
		this.$popBackground = $("#pop_background");
		this.$gameBox = $("#game_box");
		this.$popBox = $("#pop_box");
		this.$loopBox = $("#loop_box");
		this.$square = this.$main.find(".square");
		this.$symbol = this.$popBox.find(".symbol"); 
		this.$gameBoxText = this.$gameBox.find("h1");   
		this.$yes = this.$gameBox.find("#yes");
		this.$no = this.$gameBox.find("#no");
	}
  
	bindEvents() {
		pubSub.subscribe("renderSquare", ({symbol, index}) => {
			this.renderSquare({symbol, index});
		});
		pubSub.subscribe("renderMessage", message => {
			this.renderMessage(message);
		});
		pubSub.subscribe("renderNewGame", () => {
			this.renderNewGame();
		});
		this.$square.click((e) => {
			this.handleClickedSquare(e.target.id);
		});
		this.$symbol.click((e) => {
			this.handleSymbol(e.target.id);
		});
		this.$yes.click(() => {
			this.handleRestart();
		});
		this.$no.click(() => {
			this.handleNo();
		});
	}
  
	renderSquare({symbol, index}) {
		$("#" + index).text(symbol);
	}
  
	renderNewGame() {
		this.$popBackground.fadeIn();
		this.$popBox.fadeIn("slow");
		this.$square.text("");
	}
  
	renderMessage(string) {
		this.$popBackground.fadeIn();
		this.$gameBoxText.html(string);
		this.$gameBox.fadeIn("slow");  
	}
  
	handleClickedSquare(index) {
		pubSub.publish("playerTurn", index);
	}
  
	handleRestart() {
		this.$gameBox.fadeOut("slow");
		setTimeout(() => {
			pubSub.publish("resetGame", null);
		}, 1000);  
	}

	handleNo() {
		this.$gameBox.fadeOut("slow");
		setTimeout(() => {
			this.$loopBox.fadeIn("slow");
		}, 1000);
		setTimeout(() => {
			this.$loopBox.fadeOut("slow");
		}, 2000);
		setTimeout(() => {
			pubSub.publish("resetGame", null);
		}, 3000);
	}
 
	handleSymbol(value) {
		this.$popBackground.fadeOut();
		this.$popBox.fadeOut();
		pubSub.publish("selectSymbol", value);    
	}
}






