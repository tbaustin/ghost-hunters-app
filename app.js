const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
// initialize app
const app = vertex.app();

// import routes
const index = require('./routes/index');
const users = require('./routes/users');

// set routes
app.use('/', index);
app.use('/api/users', users);

module.exports = app;
