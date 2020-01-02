import { TimerCallback } from './typings';
import { GenTimeCheckerImpl } from './time-check-timer';

let now = typeof Date.now === 'function' ? Date.now : () => new Date().getTime();

function rafImpl (callback: TimerCallback, interval: number) {
  const raf = window.requestAnimationFrame;
  let start = now();
  let stopped = false;
  function rafcb() {
    const delta = now() - start;
    if (delta >= interval) {
      start += interval;
      callback(delta);
    }
    if (!stopped) raf(rafcb);
  }
  raf(rafcb);
  return () => stopped = true
}

export const RafTimer = GenTimeCheckerImpl(rafImpl);
