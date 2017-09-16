"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = runFor;

var now = function now() {
    return global.performance ? global.performance.now() : Date.now();
};

var raf = global.requestAnimationFrame || function(callback) {
    setTimeout(function() {
        return callback(now());
    }, 1e3 / 60);
};

var stopRaf = global.cancelAnimationFrame || clearTimeout;

function runFor(progressFn, duration) {
    var dTime = 0;
    var _start = null;
    var stopped = false;
    var timestamp = 0;
    var _onDone = function onDone() {};
    var step = function step(time) {
        if (!_start) _start = time;
        timestamp = time;
        dTime = time - _start;
        if (stopped) return;
        if (dTime >= duration) {
            progressFn(1);
            _onDone();
            return;
        }
        var progress = dTime / duration;
        progressFn(progress);
        return raf(step);
    };
    var timer = raf(step);
    return {
        stop: function stop() {
            stopped = true;
            stopRaf(timer);
        },
        start: function start() {
            _start = now() - dTime;
            stopped = false;
            raf(step);
        },
        onDone: function onDone(cb) {
            _onDone = cb;
        }
    };
}