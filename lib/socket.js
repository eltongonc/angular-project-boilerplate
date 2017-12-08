const socketIO = require('socket.io') // websockets

function sockets (app, server) {
    const io = socketIO.listen(server);

    // Websocket connection
    io.on('connection', (client) => {
        // console.log(`client: ${client.id} entered` );

        // whenever a client disconnects do something
       client.on('disconnect', ()=>{
           // console.log(`client: ${client.id} left` );
       })
    });
}


module.exports = sockets;
