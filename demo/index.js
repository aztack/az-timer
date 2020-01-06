import { timer } from '../dist/index.js';

startInterval.onclick = () => {
  ['native', 'raf', 'oscillator', 'webworker'].forEach(impl => {
      let counter = 1;
      let t = timer(impl);
      const id = t.setInterval(() => {
          if (counter > 5) t.clearInterval(id);
          document.getElementById(impl).innerHTML += `${counter++}, `;
      }, 1000);
  });
}

startTimeout.onclick = () => {
  ['native', 'raf', 'oscillator', 'webworker'].forEach(impl => {
      let t = timer(impl);
      const d = document.getElementById(impl)
      const id = t.setTimeout(() => {
        d.innerHTML += `timeout`;
        t.clearTimeout(id);
      }, 3000);
  });
}