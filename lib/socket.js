const socketIO = require('socket.io') // websockets

module.exports = (app, server) => {
    io = socketIO.listen(server);

    // Websocket connection
    io.on('connection', (client) => {
        console.log(`client: ${client.id} entered` );

        // whenever a client disconnects do something
       client.on('disconnect', ()=>{
           console.log(`client: ${client.id} left` );
       })
    });
};
