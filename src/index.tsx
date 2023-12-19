// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
