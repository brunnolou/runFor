# runFor(fn, ms)

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
const run = runFor(progressFn, duration);
```

## Example
```js
import runFor from 'runfor';

function moveX(progress) {
  div.style.transform = `translateX(${progress * 200}px`;
}

// Run moveX for 1sec with a progress between 0 and 1.
const runner = runFor(p => moveX(p), 1000);

```

Check the `examples/` folder to see full examples.

Or check out the [DEMO](https://brunnolou.github.io/runfor/) page


## Development
`yarn install`

`yarn run dev`

## Test
`yarn test`
