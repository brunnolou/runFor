import runFor from '../src/';
import { addDiv } from './utils';

// Util to create a div DOM element.
const div = addDiv('Move');

function moveX(progress) {
  div.style.transform = `translateX(${progress * 200}px`;
}

// Run moveX for 1sec with a progress between 0 and 1.
const runner = runFor(p => moveX(p), 1000);

runner.onDone(() => console.log('Done!'));

window.addEventListener('click', () => runner.toggle());
