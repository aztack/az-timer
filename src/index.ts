import { NativeTimer } from './native-impl';
import { RafTimer } from './raf-impl';
import { OscillatorTimer } from './oscillator-impl';
import { WebWorkerTimer } from './web-worker-impl';
import { ITimer } from './typings';

export { NativeTimer } from './native-impl';
export { RafTimer } from './raf-impl';
export { OscillatorTimer } from './oscillator-impl';
export { WebWorkerTimer } from './web-worker-impl';

const nativeTimer = new NativeTimer();
const rafTimer = new RafTimer();
const oscillatorTimer = new OscillatorTimer();
const webworkerTimer = new WebWorkerTimer();

export function timer(impl: 'native' | 'raf' | 'oscillator' | 'webworker' | undefined): ITimer {
  if (!impl) return oscillatorTimer;
  switch (impl) {
    case 'native':
      return nativeTimer;
    case 'raf':
      return rafTimer;
    case 'webworker':
      return webworkerTimer;
    default:
      return oscillatorTimer;
  }
}
