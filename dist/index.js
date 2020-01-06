"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_impl_1 = require("./native-impl");
var raf_impl_1 = require("./raf-impl");
var oscillator_impl_1 = require("./oscillator-impl");
var web_worker_impl_1 = require("./web-worker-impl");
var native_impl_2 = require("./native-impl");
exports.NativeTimer = native_impl_2.NativeTimer;
var raf_impl_2 = require("./raf-impl");
exports.RafTimer = raf_impl_2.RafTimer;
var oscillator_impl_2 = require("./oscillator-impl");
exports.OscillatorTimer = oscillator_impl_2.OscillatorTimer;
var web_worker_impl_2 = require("./web-worker-impl");
exports.WebWorkerTimer = web_worker_impl_2.WebWorkerTimer;
var nativeTimer = new native_impl_1.NativeTimer();
var rafTimer = new raf_impl_1.RafTimer();
var oscillatorTimer = new oscillator_impl_1.OscillatorTimer();
var webworkerTimer = new web_worker_impl_1.WebWorkerTimer();
function timer(impl) {
    if (!impl)
        return oscillatorTimer;
    switch (impl) {
        case 'native':
            return nativeTimer;
        case 'raf':
            return rafTimer;
        case 'webworker':
            return webworkerTimer;
        default:
            return oscillatorTimer;
    }
}
exports.timer = timer;
