//
// DOM utilities to simplify examples.
//

export const createElement = tag => document.createElement(tag);

export const addElement = element => document.getElementById('root').appendChild(element);

export const addText = innerText => (element) => {
  element.innerText = innerText;

  return element;
};

export const addDiv = innerText => addElement(addText(innerText)(createElement('div')));
