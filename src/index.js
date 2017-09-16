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
  let timestamp = 0;
  let onDone = () => {};

  const step = (time) => {
    if (!start) start = time;

    timestamp = time;

    dTime = time - start;

    if (stopped) return;

    if (dTime >= duration) {
      progressFn(1);
      onDone();
      return;
    }

    const progress = dTime / duration;

    progressFn(progress);

    return raf(step);
  };

  const timer = raf(step);

  return {
    stop() {
      stopped = true;
			stopRaf(timer);
    },
    start() {
      start = now() - dTime;
      stopped = false;
      raf(step);
		},
		toggle(){
			if (stopped) {
				this.start();

				return;
			}

			this.stop();
		},
    onDone(cb) {
      onDone = cb;
    },
  };
}
