export class TimerIdGenerator {
  value: number = 0;
  next() {
    if (this.value === Number.MAX_VALUE) {
      this.value = 0;
    } else {
      this.value++;
    }
    return {
      done: false,
      value: this.value
    };
  }
}