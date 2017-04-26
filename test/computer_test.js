import {expect} from "chai"
import Computer from "../app/js/computer.js";
import Board from "../app/js/board.js";


describe("COMPUTER METHODS", () => { 
	
	describe("secondMove", () => {
		let computer;
		beforeEach(() => {
			computer = new Computer();
		})

		it("should return a number", () => {
			const random = Math.floor(Math.random() * 10);
			expect(computer.secondMove(random)).to.be.a("number");
		})

		it("should return the center if the center square is empty", () => {
			expect(computer.secondMove(1)).to.equal(0);
		})

		it("should return a corner square if the center square is occupied", () => {
			expect(computer.secondMove(0)).to.be.least(1);
			expect(computer.secondMove(0)).to.be.most(4);
		})
	});


	describe("thirdMove", () => {
		let computer;
		beforeEach(() => {
			computer = new Computer();
		})

		it("should return a number", () => {
			expect(computer.thirdMove(0, 8)).to.be.a("number");
		})

		it("should return a corner square if the center is occupied", () => {
			expect(computer.thirdMove(0, 3)).to.be.least(1);
			expect(computer.thirdMove(0, 3)).to.be.most(5);
		})

		it("should return the square vertical to the player's square if the player's square is a corner and the center is occupied", () => {
			expect(computer.thirdMove(0, 2)).to.equal(4);
		})

		it("should return a corner square if the occupied squares are kitty-corners", () => {
			expect(computer.thirdMove(1, 4)).to.be.least(2);
			expect(computer.thirdMove(1, 4)).to.be.most(3);
			expect(computer.thirdMove(1, 4)).to.not.equal(0);
		})

		it("should return the square diagonal to the first move if the player occupies the center", () => {
			expect(computer.thirdMove(1, 0)).to.equal(4);
		})


		it("should return the center if the center is empty and the occupied squares aren't kitty-corners", () => {
			expect(computer.thirdMove(1, 2)).to.equal(0);
		})
	});


	describe("fourthMove", () => {
		let computer;
		beforeEach(() => {
			computer = new Computer();
		})

		it("should return a number", () => {
			expect(computer.fourthMove(132, 0, 4)).to.be.a("number");
		})

		it("should block the player if the player has two in a row", () => {
			expect(computer.fourthMove(257, 0, 8)).to.equal(5);
			expect(computer.fourthMove(65, 1, 6)).to.equal(7);
		})

		it("should take an edge square if the player's squares are kitty-corners", () => {
			expect(computer.fourthMove(18, 1, 4)).to.be.least(5);
			expect(computer.fourthMove(18, 1, 4)).to.be.most(9);
		})

		it("should take the square adjacent to the player's second move if the player's second move is an edge square and the player doesn't have two in a row", () => {
			expect(computer.fourthMove(40, 3, 5)).to.equal(1);
			expect(computer.fourthMove(130, 1, 7)).to.equal(4);
		})

		it("otherwise should take a corner square", () => {
			expect(computer.fourthMove(72, 6, 3)).to.be.least(1);
			expect(computer.fourthMove(72, 6, 3)).to.be.most(4);
			expect(computer.fourthMove(72, 6, 3)).to.not.equal(3);
		})

	});


	describe("fifthMove", () => {
		let computer;

		beforeEach(() => {
			computer = new Computer();
		})

		it("should complete the row if the computer has two in a row", () => {
			expect(computer.fifthMove(3, 12, 0, 2, 1)).to.equal(4);
			expect(computer.fifthMove(10, 5, 1, 0, 3)).to.equal(6);
		})

		it("should block the player if the player has two in a row", () => {
			expect(computer.fifthMove(0, 33, 3, 0, 2)).to.equal(8);
		})

		it("should otherwise try to make a triangle", () => {
			expect(computer.fifthMove(0, 0, 1, 5, 0)).to.equal(3);
			expect(computer.fifthMove(0, 0, 1, 6, 0)).to.equal(2);
		})

		it("should take the last corner if all the other corners are filled and noone can win", () => {
			computer._filled = [1, 3, 2, 5];
			expect(computer.fifthMove(0, 0, 1, 2, 3)).to.equal(4);
		})
	});

	describe("rowDetector", () => {
		let computer;

		beforeEach(() => {
			computer = new Computer();
		})

		it("should return the last square of a row if the the first two are occupied", () => {
			computer._filled = [];
			expect(computer.rowDetector(6)).to.equal(5);
			expect(computer.rowDetector(18)).to.equal(0);
			expect(computer.rowDetector(192)).to.equal(0);
		})

		it("should return false if the last square of a row is already blocked", () => {
			computer._filled = [0, 5];
			expect(computer.rowDetector(6)).to.be.false;
			expect(computer.rowDetector(18)).to.be.false;
			expect(computer.rowDetector(192)).to.be.false;
		})
	})

	describe("move", () => {
		let computer;
		let board;

		beforeEach(() => {
			computer = new Computer();
			board = new Board();
			computer._filled = [];
			computer._score = null;
		})

		it("should return a number", () => {
			expect(computer.move(3, board.squares, 5)).to.be.a("number");
		})

		it("should return either the center or a corner square if its the first or second move", () => {
			expect(computer.move(1, board.squares, 0)).to.be.most(5);
			expect(computer.move(2, board.squares, 0)).to.be.most(5);
		})

		it("should block the player from getting three in a row", () => {
			computer._filled = [0, 1, 2];
			expect(computer.move(4, board.squares, 5)).to.equal(3);
			computer._filled = [1, 0, 3];
			expect(computer.move(5, board.squares, 10)).to.equal(6);
		})

		it("should get three in a row if it can", () => {
			computer._filled = [1, 2, 4];
			computer._score = 18;
			expect(computer.move(5, board.squares, 0)).to.equal(0);
		})
	})
})









