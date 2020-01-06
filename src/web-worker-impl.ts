import { ITimer, TimerId, TimerCallback } from './typings';
import { TimerIdGenerator } from './timer-id-generator';
import { getOnMessageHandler } from './web-worker-script';

const blob = new Blob([
  `${getOnMessageHandler.toString()}
  onmessage = getOnMessageHandler();
`]);
const workerScript = window.URL.createObjectURL(blob);

export class WebWorkerTimer implements ITimer {
  worker = new Worker(workerScript);
  intervalIdIterator: TimerIdGenerator = new TimerIdGenerator();
  timeoutIdIterator: TimerIdGenerator = new TimerIdGenerator();
  intervalMap: Record<TimerId, () => void> = {};
  timeoutMap: Record<TimerId, () => void> = {};

  constructor() {
    this.worker.onmessage = (e: MessageEvent) => {
      const { id, method } = e.data;
      if (method === 'setInterval' && this.intervalMap[id]) {
        this.intervalMap[id]();
      } else if (method === 'setTimeout') {
        this.timeoutMap[id]();
        delete this.timeoutMap[id];
      } else if (method === 'clearInterval') {
        delete this.intervalMap[id];
      } else if (method === 'clearTimeout') {
        delete this.timeoutMap[id];
      }
    };
    this.worker.onerror = console.error;
  }

  setInterval(callback: TimerCallback, interval: number): number {
    const it = this.intervalIdIterator.next();
    const id = it.value;
    this.intervalMap[id] = () => callback(-1);
    this.worker.postMessage ({
      method: 'setInterval',
      id,
      time: interval
    });
    return id;
  }
  clearInterval(id: number): void {
    if (this.intervalMap[id]) {
      this.worker.postMessage({
        method: 'clearInterval',
        id
      });
      delete this.intervalMap[id];
    }
  }
  setTimeout(callback: TimerCallback, timeout: number): number {
    const it = this.timeoutIdIterator.next();
    const id = it.value;
    this.timeoutMap[id] = () => callback(-1);
    this.worker.postMessage ({
      method: 'setTimeout',
      id,
      time: timeout
    });
    return id;
  }
  clearTimeout(id: number): void {
    if (this.timeoutMap[id]) {
      this.worker.postMessage({
        method: 'clearTimeout',
        id
      });
      delete this.timeoutMap[id];
    }
  }
}