import { TimerCallback, TimerId, ITimer } from './typings';
import { TimerIdGenerator } from './timer-id-generator';

export class NativeTimer implements ITimer {
  setInterval(callback: TimerCallback, interval: number): number {
    return window.setInterval(callback, interval);
  }
  clearInterval(id: number): void {
    window.clearInterval(id);
  }
  setTimeout(callback: TimerCallback, timeout: number): number {
    return window.setTimeout(callback, timeout);
  }
  clearTimeout(id: number): void {
    window.clearTimeout(id);
  }
};
