"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeTimer = /** @class */ (function () {
    function NativeTimer() {
    }
    NativeTimer.prototype.setInterval = function (callback, interval) {
        return window.setInterval(callback, interval);
    };
    NativeTimer.prototype.clearInterval = function (id) {
        window.clearInterval(id);
    };
    NativeTimer.prototype.setTimeout = function (callback, timeout) {
        return window.setTimeout(callback, timeout);
    };
    NativeTimer.prototype.clearTimeout = function (id) {
        window.clearTimeout(id);
    };
    return NativeTimer;
}());
exports.NativeTimer = NativeTimer;
;
