const WebSocket = require('ws');

function onError(ws, err) {
  console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
  console.log(`onMessage: ${data}`);
  ws.send(`recebido! ` + data);

}

function onConnection(ws, req) {
  ws.on('message', data => onMessage(ws, data));
  ws.on('error', error => onError(ws, error));
  console.log(`onConnection`);
}

function broadcast(jsonObject) {
  if (!this.clients) return;
  this.clients.forEach(client => {
    // console.log(this.clients);

    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(jsonObject));
    }
  });
}

function corsValidation(origin) {
  // TODO: cors
  return true;
  return process.env.CORS_ORIGIN === '*' || process.env.CORS_ORIGIN.startsWith(origin);
}

function verifyClient(info, callback) {
  if (!corsValidation(info.origin)) return callback(false);

  const token = info.req.url.split('token=')[1];
  console.log(token);
  if (token) {
    if (token == '123456')
      user1 = token;
    if (token == '1234567')
      user2 = token;

    return callback(true);
  }

  return callback(false);
}
module.exports = (server) => {
  const wss = new WebSocket.Server({
    server,
    verifyClient
  });

  wss.on('connection', onConnection);
  wss.broadcast = broadcast;

  console.log(`App Web Socket Server is running!`);
  return wss;
}