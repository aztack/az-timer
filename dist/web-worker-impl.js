"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timer_id_generator_1 = require("./timer-id-generator");
var web_worker_script_1 = require("./web-worker-script");
var blob = new Blob([
    web_worker_script_1.getOnMessageHandler.toString() + "\n  onmessage = getOnMessageHandler();\n"
]);
var workerScript = window.URL.createObjectURL(blob);
var WebWorkerTimer = /** @class */ (function () {
    function WebWorkerTimer() {
        var _this = this;
        this.worker = new Worker(workerScript);
        this.intervalIdIterator = new timer_id_generator_1.TimerIdGenerator();
        this.timeoutIdIterator = new timer_id_generator_1.TimerIdGenerator();
        this.intervalMap = {};
        this.timeoutMap = {};
        this.worker.onmessage = function (e) {
            var _a = e.data, id = _a.id, method = _a.method;
            if (method === 'setInterval' && _this.intervalMap[id]) {
                _this.intervalMap[id]();
            }
            else if (method === 'setTimeout') {
                _this.timeoutMap[id]();
                delete _this.timeoutMap[id];
            }
            else if (method === 'clearInterval') {
                delete _this.intervalMap[id];
            }
            else if (method === 'clearTimeout') {
                delete _this.timeoutMap[id];
            }
        };
        this.worker.onerror = console.error;
    }
    WebWorkerTimer.prototype.setInterval = function (callback, interval) {
        var it = this.intervalIdIterator.next();
        var id = it.value;
        this.intervalMap[id] = function () { return callback(-1); };
        this.worker.postMessage({
            method: 'setInterval',
            id: id,
            time: interval
        });
        return id;
    };
    WebWorkerTimer.prototype.clearInterval = function (id) {
        if (this.intervalMap[id]) {
            this.worker.postMessage({
                method: 'clearInterval',
                id: id
            });
            delete this.intervalMap[id];
        }
    };
    WebWorkerTimer.prototype.setTimeout = function (callback, timeout) {
        var it = this.timeoutIdIterator.next();
        var id = it.value;
        this.timeoutMap[id] = function () { return callback(-1); };
        this.worker.postMessage({
            method: 'setTimeout',
            id: id,
            time: timeout
        });
        return id;
    };
    WebWorkerTimer.prototype.clearTimeout = function (id) {
        if (this.timeoutMap[id]) {
            this.worker.postMessage({
                method: 'clearTimeout',
                id: id
            });
            delete this.timeoutMap[id];
        }
    };
    return WebWorkerTimer;
}());
exports.WebWorkerTimer = WebWorkerTimer;
