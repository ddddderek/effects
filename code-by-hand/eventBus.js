class EventBus {
  constructor() {
    this.eventObj = {};
    this.callbackId = 0;
  }

  $on(name, callback) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }
    const id = this.callbackId++;
    this.eventObj[name][id] = callback;
    return id;
  }

  $once(name, callback) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }

    const id = this.callbackId++;
    const wrapper = (...args) => {
      callback(...args);
      this.$off(name, id);
    };
    this.eventObj[name][id] = wrapper;
    return id;
  }

  $emit(name, ...args) {
    const eventList = this.eventObj[name];
    if (!eventList) return;

    const ids = Object.keys(eventList);
    for (const id of ids) {
      if (eventList[id]) {
        eventList[id](...args);
      }
    }
  }

  $off(name, id) {
    if (!this.eventObj[name] || !this.eventObj[name][id]) return;
    delete this.eventObj[name][id];
    if (Object.keys(this.eventObj[name]).length === 0) {
      delete this.eventObj[name];
    }
  }
}
