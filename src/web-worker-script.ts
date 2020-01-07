export function getOnMessageHandler() {
  const timerIds: Record<number, number> = {};
  return function(event: MessageEvent) {
    const data = event.data;
    const { method, id, time } = data;
    switch (method) {
      case 'setInterval':
        timerIds[id] = self.setInterval(() => {
          // @ts-ignore
          self.postMessage({ id, method });
        }, time);
        break;
      case 'clearInterval':
        if (timerIds.hasOwnProperty(id)) {
          self.clearInterval(timerIds[id]);
          // @ts-ignore
          self.postMessage({id, method});
          delete timerIds[id];
        }
        break;
      case 'setTimeout':
        timerIds[id] = self.setTimeout(() => {
          // @ts-ignore
          self.postMessage({ id, method});
          if (timerIds.hasOwnProperty(id)) {
            delete timerIds[id];
          }
        }, time);
        break;
      case 'clearTimeout':
        if (timerIds.hasOwnProperty(id)) {
          self.clearTimeout(timerIds[id]);
          // @ts-ignore
          self.postMessage({id, method});
          delete timerIds[id];
        }
        break;
    }
  };
}
