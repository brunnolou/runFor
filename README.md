# `runFor(fn, ms)`

[![npm version](https://badge.fury.io/js/runfor.svg?v0)](https://badge.fury.io/js/runfor)
![](https://img.shields.io/github/size/brunnolou/runfor/lib/index.min.js.svg)

### Run a performant function for a period of time
Run `requestAnimationFrame` for the specified duration.

## Install
`npm install --save runfor`

or

`yarn add runfor`

## Usage
```js
runFor(progressFn, msDuration);
```

## Example
```js
import runFor from 'runfor';

function moveX(progress) {
	// Move right 200px
  div.style.transform = `translateX(${progress * 200}px`;
}

// Run moveX for 1sec with a progress between 0 and 1.
runFor(p => moveX(p), 1000);

```

Check the `examples/` folder to see full examples.

## API

Optionally you can stop or start the animation with this functions:
```js
const runner = runFor(fn, 1000);

runner.toggle()
runner.stop()
runner.start()
```

### `.stop()`
Stops the animation.
### `.start()`
Starts the animation keeping the previous progress.
### `.toggle()`
Toggle start / stop.
### `.restart()`
Restart animation from the beginning


## Development
`yarn install`

`yarn run dev`

## Test
`yarn test`
