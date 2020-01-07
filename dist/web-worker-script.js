"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOnMessageHandler() {
    var timerIds = {};
    return function (event) {
        var data = event.data;
        var method = data.method, id = data.id, time = data.time;
        switch (method) {
            case 'setInterval':
                timerIds[id] = self.setInterval(function () {
                    // @ts-ignore
                    self.postMessage({ id: id, method: method });
                }, time);
                break;
            case 'clearInterval':
                if (timerIds.hasOwnProperty(id)) {
                    self.clearInterval(timerIds[id]);
                    // @ts-ignore
                    self.postMessage({ id: id, method: method });
                    delete timerIds[id];
                }
                break;
            case 'setTimeout':
                timerIds[id] = self.setTimeout(function () {
                    // @ts-ignore
                    self.postMessage({ id: id, method: method });
                    if (timerIds.hasOwnProperty(id)) {
                        delete timerIds[id];
                    }
                }, time);
                break;
            case 'clearTimeout':
                if (timerIds.hasOwnProperty(id)) {
                    self.clearTimeout(timerIds[id]);
                    // @ts-ignore
                    self.postMessage({ id: id, method: method });
                    delete timerIds[id];
                }
                break;
        }
    };
}
exports.getOnMessageHandler = getOnMessageHandler;
