import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SelectedChatWindow from "./slected-chat-window";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  notSelectedChat: {
    textAlign: "center",
  },
}));

const ChatWindow = (props) => {
  const { selectedChat, messages, users, currentUserId } = props;

  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {!selectedChat && (
        <Typography paragraph>
          <p className={classes.notSelectedChat}>
            Select chat to start messaging
          </p>
        </Typography>
      )}
      {selectedChat && (
        <SelectedChatWindow
          chat={selectedChat}
          messages={messages}
          users={users}
          currentUserId={currentUserId}
        />
      )}
    </main>
  );
};

export default ChatWindow;
