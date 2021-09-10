const jsonServer = require('json-server');
const socketio = require('socket.io');
const Chat = require('./src/chat');

const server = jsonServer.create();
const router = jsonServer.router('./src/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const appServer = server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const io = socketio(appServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  },
});
Chat(io, router.db);
