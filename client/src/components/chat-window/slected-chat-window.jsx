import {
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./message";
import io from 'socket.io-client';

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
  const [userNames] = useState(formatUserNames(users));
  const [establishedConnection, setEstablishedConnection] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000/`);
    setSocket(newSocket);
    setEstablishedConnection(true);
    return () => newSocket.close();
  }, []);

  const getUserName = (fromUserId) => userNames.get(fromUserId);
  return (
    <Card>
      <Typography>
        <p>Chat "{chat.name}"</p>
      </Typography>
      <Divider />
      <Card className={classes.messageCard}>
        {messagesObject.messages.map((message) => (
          <Message
            key={message.id}
            userName={getUserName(message.fromUserId)}
            text={message.text}
            isSender={message.fromUserId === currentUserId}
          />
        ))}
      </Card>
      <Divider />
      <Card >
        <TextField disabled={!establishedConnection} />
        <Button disabled={!establishedConnection}>
          <SendIcon />
        </Button>
      </Card>
    </Card>
  );
};

export default SelectedChatWindow;
