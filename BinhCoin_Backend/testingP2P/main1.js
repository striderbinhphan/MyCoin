const WebSocket = require('ws').Server;
const s = new  WebSocket({port:3003});
s.on('connection',function(ws){
    ws.on('message',function (message){
        messageJSON = JSON.parse(message);
        if(messageJSON.type == "name"){
            ws.personName  = messageJSON.data;
            return;
        }
        console.log('received + ',messageJSON);
        s.clients.forEach(function (client){
           if(client!=ws){client.send(JSON.stringify({
               name: ws.personName,
               message: messageJSON.data
           }))};
           console.log(JSON.stringify({
                name: ws.personName,
                message: messageJSON.data
            }));
        });
        
    })
    ws.on('close',function () {
        console.log('You are disconnected');
    })
    //console.log('one more client connected');
})
