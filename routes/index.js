const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID });
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

const Helmet = require('react-helmet').Helmet;
const serialize = require('serialize-javascript');

const store = require('../public/dist/es5/stores');
console.log(store);
console.log(store.configure());

// const renderer = require('../renderer');

// router.get('/', renderer, function(req, res) {
//   res.render('index', null);
// });

router.get('/', function(req, res) {
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
});

module.exports = router;
