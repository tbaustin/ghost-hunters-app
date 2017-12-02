const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID });
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

// const renderer = require('../renderer');

// router.get('/', renderer, function(req, res) {
//   res.render('index', null);
// });

router.get('/', function(req, res) {
  res.render('index', null);
});

module.exports = router;
