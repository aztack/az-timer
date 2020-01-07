"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_check_timer_1 = require("./time-check-timer");
var now = typeof Date.now === 'function' ? Date.now : function () { return new Date().getTime(); };
var raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    // @ts-ignore
    || window.mozRequestAnimationFrame
    // @ts-ignore
    || window.msRequestAnimationFrame
    // @ts-ignore
    || window.oRequestAnimationFrame;
var caf = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    // @ts-ignore
    || window.mozCancelAnimationFrame
    // @ts-ignore
    || window.msCancelAnimationFrame
    // @ts-ignore
    || window.oCancelAnimationFrame;
function rafImpl(callback, interval) {
    var start = now();
    var stopped = false;
    var id = -1;
    function rafcb() {
        var delta = now() - start;
        if (delta >= interval) {
            start += interval;
            callback(delta);
        }
        if (!stopped)
            id = raf(rafcb);
    }
    raf(rafcb);
    return function () {
        stopped = true;
        caf(id);
    };
}
exports.RafTimer = time_check_timer_1.GenTimeCheckerImpl(rafImpl);
