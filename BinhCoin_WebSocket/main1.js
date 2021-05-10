const p2p_1 = require("./p2p");
const p2pPort = parseInt(process.env.P2P_PORT) || 6001;
p2p_1.initP2PServer(p2pPort);











// const WebSocket = require('ws').Server;
// const s = new  WebSocket({port:3003});
// s.on('connection',function(ws){
//     ws.on('message',function (message){
//         console.log('received + ',message);
//         s.clients.forEach(function (client){
//            if(client!=ws){client.send(message)};
//         });
        
//     })
//     ws.on('close',function () {
//         console.log('You are disconnected');
//     })
//     //console.log('one more client connected');
// })
