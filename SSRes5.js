const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID });
const Helmet = require('react-helmet').Helmet;
const serialize = require('serialize-javascript');

const store = require('./public/dist/es5/stores');

function SSRes5(req, res) {
  let initial = {};
  const helmet = Helmet.renderStatic();

  if (req.vertexSession != null && req.vertexSession.user != null) {
    turbo
      .fetchOne('user', req.vertexSession.user.id)
      .then(data => {
        initial.user = { currentUser: data };

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
}

module.exports = SSRes5;
