import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import store from './stores';
import routes from './routes';

const initialState = window.INITIAL_STATE;

const app = (
  <Provider store={store.configure(initialState)}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
