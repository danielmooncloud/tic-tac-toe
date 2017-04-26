import { expect } from "chai";
import Player from "../app/js/player.js";


const getScore = (...theArgs) => {
	return theArgs.reduce((prev, curr) => {
		return prev + Math.pow(2, curr);
	}, 0)
}


describe("PLAYER METHODS", () => {
	describe("isWinner", () => {
		let player;
		beforeEach(() => {
			player = new Player();
		})
		it("should return true when the player has three in a row", () => {
			player._threeinaRow.forEach((score) => {
				player._score = score;
				expect(player.isWinner()).to.be.true;
			})
		})

		it("should return false when the player does not have three in a row", () => {
			player._score = getScore(3, 0, 1);
			expect(player.isWinner()).to.be.false;
			player._score = getScore(1, 2, 3, 4);
			expect(player.isWinner()).to.be.false;
			player._score = getScore(5, 6, 7, 8);
			expect(player.isWinner()).to.be.false;
		})
	})
})
