"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOnMessageHandler(event) {
    var timerIds = {};
    return function () {
        var data = event.data;
        var method = data.method, id = data.id, time = data.time;
        switch (method) {
            case 'setInterval':
                timerIds[id] = window.setInterval(function () {
                    postMessage({ id: id, method: method }, '*');
                }, time);
                break;
            case 'clearInterval':
                if (timerIds.hasOwnProperty(id)) {
                    window.clearInterval(timerIds[id]);
                    delete timerIds[id];
                }
                break;
            case 'setTimeout':
                timerIds[id] = window.setTimeout(function () {
                    postMessage({ id: id, method: method }, '*');
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
exports.getOnMessageHandler = getOnMessageHandler;
