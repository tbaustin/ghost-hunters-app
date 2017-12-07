// require('babel-core/register')({
//   presets: ['env', 'react']
// });
const turbo = require('turbo360')({ site_id: '59e0c137221d130012ee41dc' });
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const app = vertex.app();
const Helmet = require('react-helmet').Helmet;
const serialize = require('serialize-javascript');

const store = require('./public/dist/es5/stores');
// const renderer = require('./renderer');
const SSRes5 = require('./SSRes5');
const index = require('./routes/index');
const users = require('./routes/users');

// set routes
app.use('/', index);
app.use('/api/users', users);

// solution for refresh until turbo can use backend babel
// app.use(SSRes5); // this is causing internal server error
app.get('*', function(req, res) {
  let initial = {};
  const helmet = Helmet.renderStatic();

  if (req.vertexSession != null && req.vertexSession.user != null) {
    turbo
      .fetchOne('user', req.vertexSession.user.id)
      .then(data => {
        initial.user = { currentUser: data, all: [] };

        const initialStore = store.default.configure(initial);
        const initialState = serialize(initialStore.getState());

        res.render('index', { initialState: initialState, helmet: helmet });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        });
      });
  } else {
    res.render('index', { initialState: {}, helmet: helmet });
  }
});

// app.use(renderer);

module.exports = app;
