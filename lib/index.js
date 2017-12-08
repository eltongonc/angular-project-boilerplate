
// dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expNun = require('express-nunjucks');
const http = require('http');

const app = express();
const server = http.Server(app);

// init all the routes
const routes = require('./routes.js');
// init all the sockets events
const sockets = require('./socket.js')(app, server);

app.use(sockets);
// define a views directory and engine
app.set('views', path.join(__dirname, '..','src', 'views'));

expNun(app, {
    watch: true,
    noCache: true
});

// parse submited forms as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// define a static directory for client
app.use(express.static(path.join(__dirname, '..','src', 'dist')));

// use the routes
app.get('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: err,
        title: 'error'
    });
});

// enables import for this module
module.exports = server;
