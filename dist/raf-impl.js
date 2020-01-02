"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_check_timer_1 = require("./time-check-timer");
var now = typeof Date.now === 'function' ? Date.now : function () { return new Date().getTime(); };
function rafImpl(callback, interval) {
    var raf = window.requestAnimationFrame;
    var start = now();
    var stopped = false;
    function rafcb() {
        var delta = now() - start;
        if (delta >= interval) {
            start += interval;
            callback(delta);
        }
        if (!stopped)
            raf(rafcb);
    }
    raf(rafcb);
    return function () { return stopped = true; };
}
exports.RafTimer = time_check_timer_1.GenTimeCheckerImpl(rafImpl);
