require('babel-core/register')({
  presets: ['env', 'react']
});

const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const renderer = require('./renderer.js');
// initialize app
const app = vertex.app();

// import routes
const index = require('./routes/index');
const users = require('./routes/users');

// set routes
app.use('/', index);
app.use('/api/users', users);

// SSR
app.use(renderer);

module.exports = app;
