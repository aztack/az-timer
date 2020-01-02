"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimerIdGenerator = /** @class */ (function () {
    function TimerIdGenerator() {
        this.value = 0;
    }
    TimerIdGenerator.prototype.next = function () {
        if (this.value === Number.MAX_VALUE) {
            this.value = 0;
        }
        else {
            this.value++;
        }
        return {
            done: false,
            value: this.value
        };
    };
    return TimerIdGenerator;
}());
exports.TimerIdGenerator = TimerIdGenerator;
