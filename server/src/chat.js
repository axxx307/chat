const uuidv4 = require('uuid').v4;

function connect(io, socket, db) {
  const sendMessage = (value) => io.sockets.emit('message', value);
  const saveMessage = async (value) => {
    const { text, fromUserId, chatId } = value;
    const message = {
      chatId,
      text,
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
  io.on('connection', (socket) => connect(io, socket, db));
}

module.exports = Chat;
