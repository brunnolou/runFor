const now = () => (global.performance ? global.performance.now() : Date.now());
const raf =
  global.requestAnimationFrame ||
  function (callback) {
    setTimeout(() => callback(now()), 1000 / 60);
  };

const stopRaf = global.cancelAnimationFrame || clearTimeout;

/**
 * runFor
 * @param {Function} progressFn
 * @param {Integer} duration
 * @return {Function}
 */
export default function runFor(progressFn, duration) {
  let dTime = 0;
  let start = null;
  let stopped = false;
  let onDone = () => {};
  let timer;

  const step = (time) => {
    if (!start) start = time;

    dTime = time - start;

    if (stopped) return timer;

    if (dTime >= duration) {
      progressFn(1);
      onDone();
      stopRaf(timer);

      return timer;
    }

    const progress = dTime / duration;

    progressFn(progress);

    return raf(step);
  };

  timer = raf(step);

  return {
    stop() {
      stopped = true;
      stopRaf(timer);

      return this;
    },
    start(restart) {
      start = now() - (restart ? 0 : dTime);
      stopped = false;
      raf(step);

      return this;
    },
    toggle() {
      if (stopped) {
        this.start();

        return this;
      }

      return this.stop();
    },
    restart() {
      return this.start(true);
    },
    onDone(cb) {
      onDone = cb;
    },
  };
}
