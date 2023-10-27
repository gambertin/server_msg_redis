const app = require('./app');
const appWs = require('./app-ws');

user1 = String;
user2 = String;

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})
 
// appWs(server);

const wss = appWs(server);

setInterval(() => {
  console.log('1 ' + user1);
  console.log('2 ' +user2);
  wss.broadcast({ n: Math.random() });
}, 3000)

