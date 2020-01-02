export type TimerId = number;
export type TimerCallback = (time: number) => void;
export interface ITimer {
  setInterval(callback: TimerCallback, interval: number): TimerId;
  clearInterval(id: TimerId): void;
  setTimeout(callback: TimerCallback, timeout: number): TimerId;
  clearTimeout(id: number): void;
};

export type TimeCheckTimerCreator = (callback: (time: number) => void, frequency: number) => () => void