
// dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars'); // templating engine
const http = require('http');
const axios = require('axios');
const fs = require('fs');

const app = express();
const server = http.Server(app);

// init all the routes
const routes = require('./lib/routes.js');
// init all the sockets events
const sockets = require('./lib/socket.js')(app, server);

// view engine setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts',
    partialsDir: ['src/iews/partials/'],
    extname: 'hbs'
}));
// define a views directory and engine
app.set('view engine', 'handlebars');

console.log(__dirname)
app.set('views', path.join(__dirname, 'src', 'views'));

// parse submited forms as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// define a static directory for client
app.use(express.static(path.join(__dirname, 'src', 'dist')));

// use the routes
app.get('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
    });
});

// enables import for this module
module.exports = server;
