const WebSocket = require("ws");
const request = require('request');

const clients = [];

const sendMessages = () => {
  //get
  request('http://localhost:3000/chat/api/messages/', { json: true }, (err, res, body) => {
    if (err) return console.log(err);
    clients.forEach((client) => client.send(JSON.stringify(body)));
    console.log("");//por alguna razón si quito este console log, no se actualiza el front cuando elimino algo :(
  });
};

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (body) => {
      postMessage(JSON.parse(body));
      sendMessages();
    });
  });

  const postMessage = (body) => {
    request.post({
      url:'http://localhost:3000/chat/api/messages/',
      form:body
    }, function(error, response, body){
      console.log(body);
    });
  }
};

exports.wsConnection = wsConnection;
exports.sendMessages = sendMessages;