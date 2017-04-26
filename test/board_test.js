import { expect } from "chai";
import Board from "../app/js/board.js";


describe("BOARD METHODS", function() {
	describe("isAllFilledIn", function() {
		let board;
		beforeEach(() => {
			board = new Board();
		})

		it("should return true when the board is all filled in", () => {
			board._squares.forEach((square) => {
				square.setOccupied();
			})
			expect(board.isAllFilledIn()).to.be.true;
		})

		it("should return false when the board is not filled in", () => {
			board._squares.forEach((square) => {
				square.setOccupied();
			})
			board._squares[3].setEmpty();
			expect(board.isAllFilledIn()).to.be.false;
		})
	})

	describe("addSquares", () => {
		let board;
		beforeEach(() => {
			board = new Board();
		})

		it("should create a set of squares with value equal to 2 raised to its index", () => {
			board._squares.forEach((square, index) => {
				expect(board.getValue(index)).to.equal(Math.pow(2, index));
			})
		})
	})

	describe("resetSquares", () => {
		let board;
		beforeEach(() => {
			board = new Board();
		})

		it("should set all the squares to empty", () => {
			board.resetSquares();
			board._squares.forEach((square, index) => {
				expect(board.isSquareEmpty(index)).to.be.true;
			})
		})
	})
})






