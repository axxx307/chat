import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./app.scss";
import Chats from "./components/chats";
import ChatWindow from "./components/chat-window/chat-window";
import { getChatMessages, getChats } from "./services/requests";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    const getUserChats = async () => {
      const chats = await getChats('1');
      const messagesRequest = chats.data.map(async (chat) => getChatMessages(chat.id));
      const messages = await Promise.all(messagesRequest);
      console.log(chats)
    }

    getUserChats()
  }, []);

  return (
    <div className={classes.root}>
     <Chats />
     <ChatWindow/>
    </div>
  );
};

export default App;
