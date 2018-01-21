

const pubSub = {

	events: {},

	subscribe(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},

	unsubscribe(eventName, fn) {
		if(this.events[eventName]) {
			this.events[eventName].forEach((fxn, i) => {
				if(fxn === fn) {
					this.events[eventName].splice(i, 1);
				}
			});
		}
	},

	publish(eventName, data) {
		if(this.events[eventName]) {
			this.events[eventName].forEach(fn => {
				fn(data);
			});
		}
	}
};

export default pubSub;