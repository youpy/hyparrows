import { Arrows } from './arrows';
import ReactDOM from 'react-dom';
import React from 'react';

export const render = () => {
  const el = document.createElement('div');

  el.style.position = 'absolute';
  el.style.top = '0';
  el.style.left = '0';
  el.style.pointerEvents = 'none';
  el.style.width = '0';

  document.body.appendChild(el);

  ReactDOM.render(<Arrows />, el);
};
