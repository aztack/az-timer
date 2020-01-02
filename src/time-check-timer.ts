import { TimerIdGenerator } from './timer-id-generator';
import { TimerId, TimerCallback, TimeCheckTimerCreator, ITimer } from './typings';

export function GenTimeCheckerImpl(impl: TimeCheckTimerCreator) {
  return class implements ITimer {
    intervalIdIterator: TimerIdGenerator = new TimerIdGenerator();
    timeoutIdIterator: TimerIdGenerator = new TimerIdGenerator();
    intervalMap: Record<TimerId, () => void> = {};
    timeoutMap: Record<TimerId, () => void> = {};

    setInterval(callback: TimerCallback, interval: number): TimerId {
      const it = this.intervalIdIterator.next();
      const id = it.value;
      this.intervalMap[id] = impl(callback, interval);
      return id;
    }
    clearInterval(id: TimerId): void {
      if (!this.intervalMap[id]) return;
      const stop = this.intervalMap[id];
      if (typeof stop === 'function') stop();
      delete this.intervalMap[id];
    }
    setTimeout(callback: TimerCallback, timeout: number): TimerId {
      const it = this.timeoutIdIterator.next();
      const id = it.value;
      const stop = this.timeoutMap[id] = impl((time) => {
        callback(time);
        stop();
      }, timeout);
      return id;
    }
    clearTimeout(id: number): void {
      if (!this.timeoutMap[id]) return;
      const stop = this.timeoutMap[id];
      if (typeof stop === 'function') stop();
      delete this.intervalMap[id];
    }
  };
}
