import { TimerCallback } from './typings';
import { GenTimeCheckerImpl } from './time-check-timer';

function oscillatorImpl(callback: TimerCallback, frequency: number) {

  const freq = frequency / 1000;
  // @ts-ignore
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  /**
   * Chrome needs our oscillator node to be attached to the destination
   * So we create a silent Gain Node
   */
  const silence = ctx.createGain();
  silence.gain.value = 0;
  silence.connect(ctx.destination);

  onEnd();

  let stopped = false;
  function onEnd() {
    const osc = ctx.createOscillator();
    osc.onended = onEnd;
    osc.connect(silence);
    osc.start(0);
    osc.stop(ctx.currentTime + freq);
    callback(ctx.currentTime);
    if (stopped) {
      osc.onended = () => {
        if (typeof ctx.close === 'function') {
          ctx.close();
        }
        return;
      };
    }
  }
  return () => stopped = true;
};

export const OscillatorTimer = GenTimeCheckerImpl(oscillatorImpl);