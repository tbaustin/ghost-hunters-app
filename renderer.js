import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import { matchRoutes } from 'react-router-config';
const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID });

import routes from './src/routes';
import createStore from './src/stores';

function handleRender(req, res) {
  let initial = {};

  if (req.vertexSession != null && req.vertexSession.user != null) {
    turbo
      .fetchOne('user', req.vertexSession.user.id)
      .then(data => {
        initial.user = { currentUser: data };

        const store = createStore.configure(initial); // create Store in order to get data from redux
        const promises = matchRoutes(routes, req.path)
          .map(({ route, match }) => {
            // Matches the route and loads data if loadData function is there
            return route.loadData
              ? route.loadData(store)
              : route.loadDataWithMatch ? route.loadDataWithMatch(store, match) : null;
          })
          .map(promise => {
            if (promise) {
              return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve); // lets all data load even if route fails
              });
            }
          });

        Promise.all(promises).then(() => {
          const context = {};
          if (context.url) {
            return res.redirect(301, context.url); // redirect for non auth users
          }

          if (context.notFound) {
            res.status(404); // set status to 404 for unknown route
          }

          const content = renderToString(
            <Provider store={store}>
              <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(routes)}</div>
              </StaticRouter>
            </Provider>
          );
          const initialState = serialize(store.getState());
          const helmet = Helmet.renderStatic();

          res.render('index', { content, initialState, helmet });
        });
      })
      .catch(err => {
        return err;
      });
  }
}

module.exports = handleRender;
