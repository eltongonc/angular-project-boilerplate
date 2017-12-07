const server = require('./lib');
const port = process.env.PORT || 5000;

// Starts the server
server.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
