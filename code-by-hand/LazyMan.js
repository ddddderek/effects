class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];

    this.tasks.push(() => {
      console.log(`Hi I am ${name}`);
      return Promise.resolve();
    });

    // 使用 setTimeout 确保所有任务入队后再执行
    setTimeout(() => {
      this.runTasks();
    }, 0);
  }
  // 执行任务队列
  async runTasks() {
    for (const task of this.tasks) {
      await task();
    }
  }
  eat(food) {
    this.tasks.push(() => {
      console.log(`I am eating ${food}`);
      return Promise.resolve();
    });
    return this;
  }
  sleep(seconds) {
    this.tasks.push(() => {
      console.log(`等待${seconds}秒...`);
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    });
    return this;
  }
}
