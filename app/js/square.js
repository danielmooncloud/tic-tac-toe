export default class Square {
	constructor(value) {
		this._value = value;
		this._marked = false;
	}

	get value() {
		return this._value;
	};

	setOccupied() {
		this._marked = true;
	};

	setEmpty() {
		this._marked = false;
	};

	isEmpty() {
		return !this._marked;
	};
}
