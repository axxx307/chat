import {
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./message";
import io from "socket.io-client";

const formatUserNames = (users) =>
  users.reduce((acc, user) => {
    acc.set(user.id, user.name);
    return acc;
  }, new Map());

const useStyles = makeStyles((theme) => ({
  messageCard: {
    display: "flex",
    flexDirection: "column",
  },
}));
const SelectedChatWindow = (props) => {
  const classes = useStyles();
  const { chat, messages: messagesObject, users, currentUserId } = props;
  const [messages, setMessages] = useState(messagesObject.messages);
  const [userNames] = useState(formatUserNames(users));
  const [text, setText] = useState("");
  const [establishedConnection, setEstablishedConnection] = useState(false);
  const [socket, setSocket] = useState(null);

  const receivedMessageHandler = useCallback(
    (message) => {
      setMessages([...messages, message]);
    },
    [messages]
  );

  const sendMessage = () => {
    socket.emit("message", {
      text: text,
      fromUserId: currentUserId,
      chatId: chat.id,
    });
    setText("");
  };

  const handleTextChange = (event) => setText(event.target.value);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000/`);
    setSocket(newSocket);
    setEstablishedConnection(true);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("message", receivedMessageHandler);
    return () => {
      socket.off("message");
    };
  }, [socket, receivedMessageHandler]);

  const getUserName = (fromUserId) => userNames.get(fromUserId);
  return (
    <Card>
      <Typography>
        <p>Chat "{chat.name}"</p>
      </Typography>
      <Divider />
      <Card className={classes.messageCard}>
        {messages.map((message) => (
          <Message
            key={message.id}
            userName={getUserName(message.fromUserId)}
            text={message.text}
            isSender={message.fromUserId === currentUserId}
          />
        ))}
      </Card>
      <Divider />
      <Card>
        <TextField
          value={text}
          onChange={handleTextChange}
          disabled={!establishedConnection}
        />
        <Button disabled={!establishedConnection} onClick={sendMessage}>
          <SendIcon />
        </Button>
      </Card>
    </Card>
  );
};

export default SelectedChatWindow;
