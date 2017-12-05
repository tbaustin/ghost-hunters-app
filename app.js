// require('babel-core/register')({
//   presets: ['env', 'react']
// });
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID });
const app = vertex.app();

// const renderer = require('./renderer');
const SSRes5 = require('./SSRes5');
const index = require('./routes/index');
const users = require('./routes/users');

// set routes
app.use('/', index);
app.use('/api/users', users);

// solution for refresh until turbo can use backend babel
app.use(SSRes5);

// app.use(renderer);

module.exports = app;
