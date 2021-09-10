const jsonServer = require('json-server');
const socketio = require('socket.io');
const Chat = require('./src/chat');

const server = jsonServer.create();
const router = jsonServer.router('./src/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/getUserChats/:userId', async (req, res) => {
  const { userId } = req.params;

  const result = await router.db.get('chats').filter((chat) => chat.userIds.indexOf(userId) > -1);
  res.json(result);
});

server.use(jsonServer.bodyParser);
server.use(router);
const appServer = server.listen(4000, () => {
  console.log('Server is running on port 4000');
});

const io = socketio(appServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  },
});
Chat(io, router.db);
