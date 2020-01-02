import { NativeTimer } from './native-impl';
import { RafTimer } from './raf-impl';
import { OscillatorTimer } from './oscillator-impl';
import { ITimer } from './typings';

export { NativeTimer } from './native-impl';
export { RafTimer } from './raf-impl';
export { OscillatorTimer } from './oscillator-impl';

const nativeTimer = new NativeTimer();
const rafTimer = new RafTimer();
const oscillatorTimer = new OscillatorTimer();

export function timer(impl: 'native' | 'raf' | 'oscillator' | undefined): ITimer {
  if (!impl) return oscillatorTimer;
  switch (impl) {
    case 'native':
      return nativeTimer;
    case 'raf':
      return rafTimer;
    default:
      return oscillatorTimer;
  }
}
