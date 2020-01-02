export function getOnMessageHandler(event: MessageEvent) {
  const timerIds: Record<number, number> = {};
  return function() {
    const data = event.data;
    const { method, id, time } = data;
    switch (method) {
      case 'setInterval':
        timerIds[id] = window.setInterval(() => {
          postMessage({ id, method }, '*');
        }, time);
        break;
      case 'clearInterval':
        if (timerIds.hasOwnProperty(id)) {
          window.clearInterval(timerIds[id]);
          delete timerIds[id];
        }
        break;
      case 'setTimeout':
        timerIds[id] = window.setTimeout(() => {
          postMessage({ id, method}, '*');
          if (timerIds.hasOwnProperty(id)) {
            delete timerIds[id];
          }
        }, time);
        break;
      case 'clearTimeout':
        if (timerIds.hasOwnProperty(id)) {
          window.clearTimeout(timerIds[id]);
          delete timerIds[id];
        }
        break;
    }
  };
}
