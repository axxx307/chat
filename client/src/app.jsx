import React, { useEffect, useState } from "react";
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
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const selectChat = (chatId) => {
      setSelectedChat(chatId)
  }

  useEffect(() => {
    const getUserChats = async () => {
      const chats = await getChats('1');
      setChats(chats.data || []);
      const messagesRequest = chats.data.map(async (chat) => ({
        chatId: chat.id,
        messages: (await getChatMessages(chat.id)).data
      }));
      const messages = await Promise.all(messagesRequest);
      console.log(messages)
      setMessages(messages || []);
    }

    getUserChats()
  }, []);

  return (
    <div className={classes.root}>
     <Chats chats={chats} messages={messages} selectChat={selectChat} />
     <ChatWindow/>
    </div>
  );
};

export default App;
