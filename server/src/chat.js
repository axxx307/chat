const uuidv4 = require('uuid').v4;

const users = new Map();
function Connect(io, socket, db) {
  const sendMessage = (value) => io.sockets.emit('message', value);
  const saveMessage = async (value) => {
    const { text, fromUserId, toUserId } = value;
    const message = {
      chatId: 'r',
      text,
      toUserId,
      fromUserId,
      id: uuidv4(),
      createdAt: Date.now(),
      status: 'sent',
    };

    await db.get('messages').push(message).write();
    sendMessage(message);
  };

  socket.on('message', (value) => {
    saveMessage(value);
  });
}

function Chat(io, db) {
  io.on('connection', (socket) => new Connect(io, socket, db));
}

module.exports = Chat;
