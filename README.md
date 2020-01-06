# A set of timer implementations in modern browsers


## Web Worker Timer

Implementated with Web Worker

```js
import { timer } from 'az-timer';
const webWorkerTimer = timer('webworker');
const id = webWorkerTimer.setInterval(() => {...}, interval);
webWorkerTimer.clearInterval(id);
```

## Oscillator Timer

Implementated with WebAudio API.

```js
import { timer } from 'az-timer';
let id = -1;
// oscillator timers must be started by user gestures
start.onclick = () => {
  const oscTimer = timer('oscillator'); // or just timer()
  id = oscTimer.setInterval(() => {...}, interval);
}
stop.onclick = () => {
  oscTimer.clearInterval(id);
}
```

## RAF Timer

Implementated with `requestAnimationFrame`
(no vendor prefix considered)

```js
import { timer } from 'az-timer';
const rafTimer = timer('raf');
const id = rafTimer.setInterval(() => {...}, interval);
rafTimer.clearInterval(id);
```


## Native Timer

Implementated with `window.setInterval/clearInterval/setTimeout/clearTimeout`

```js
import { timer } from 'az-timer';
const nativeTimer = timer('native');
const id = nativeTimer.setInterval(() => {...}, interval);
nativeTimer.clearInterval(id);
```