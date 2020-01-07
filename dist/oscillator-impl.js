"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_check_timer_1 = require("./time-check-timer");
function oscillatorImpl(callback, frequency) {
    var freq = frequency / 1000;
    // @ts-ignore
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    /**
     * Chrome needs our oscillator node to be attached to the destination
     * So we create a silent Gain Node
     */
    var silence = ctx.createGain();
    silence.gain.value = 0;
    silence.connect(ctx.destination);
    onEnd(false);
    var stopped = false;
    function onEnd(exec) {
        var osc = ctx.createOscillator();
        osc.onended = onEnd;
        osc.connect(silence);
        osc.start(0);
        osc.stop(ctx.currentTime + freq);
        if (exec !== false)
            callback(ctx.currentTime);
        if (stopped) {
            osc.onended = function () {
                if (typeof ctx.close === 'function') {
                    ctx.close();
                }
                return;
            };
        }
    }
    return function () { return stopped = true; };
}
exports.OscillatorTimer = time_check_timer_1.GenTimeCheckerImpl(oscillatorImpl);
