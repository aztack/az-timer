import { TimerCallback } from './typings';
import { GenTimeCheckerImpl } from './time-check-timer';

let now = typeof Date.now === 'function' ? Date.now : () => new Date().getTime();
const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  // @ts-ignore
  || window.mozRequestAnimationFrame
  // @ts-ignore
  || window.msRequestAnimationFrame
  // @ts-ignore
  || window.oRequestAnimationFrame;

const caf = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  // @ts-ignore
  || window.mozCancelAnimationFrame
  // @ts-ignore
  || window.msCancelAnimationFrame
  // @ts-ignore
  || window.oCancelAnimationFrame;

function rafImpl (callback: TimerCallback, interval: number) {
  let start = now();
  let stopped = false;
  let id = -1;
  function rafcb() {
    const delta = now() - start;
    if (delta >= interval) {
      start += interval;
      callback(delta);
    }
    if (!stopped) id = raf(rafcb);
  }
  raf(rafcb);
  return () => {
    stopped = true;
    caf(id);
  };
}

export const RafTimer = GenTimeCheckerImpl(rafImpl);
