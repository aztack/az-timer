"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timer_id_generator_1 = require("./timer-id-generator");
function GenTimeCheckerImpl(impl) {
    return /** @class */ (function () {
        function class_1() {
            this.intervalIdIterator = new timer_id_generator_1.TimerIdGenerator();
            this.timeoutIdIterator = new timer_id_generator_1.TimerIdGenerator();
            this.intervalMap = {};
            this.timeoutMap = {};
        }
        class_1.prototype.setInterval = function (callback, interval) {
            var it = this.intervalIdIterator.next();
            var id = it.value;
            this.intervalMap[id] = impl(callback, interval);
            return id;
        };
        class_1.prototype.clearInterval = function (id) {
            if (!this.intervalMap[id])
                return;
            var stop = this.intervalMap[id];
            if (typeof stop === 'function')
                stop();
            delete this.intervalMap[id];
        };
        class_1.prototype.setTimeout = function (callback, timeout) {
            var it = this.timeoutIdIterator.next();
            var id = it.value;
            var stop = this.timeoutMap[id] = impl(function (time) {
                callback(time);
                stop();
            }, timeout);
            return id;
        };
        class_1.prototype.clearTimeout = function (id) {
            if (!this.timeoutMap[id])
                return;
            var stop = this.timeoutMap[id];
            if (typeof stop === 'function')
                stop();
            delete this.intervalMap[id];
        };
        return class_1;
    }());
}
exports.GenTimeCheckerImpl = GenTimeCheckerImpl;
