import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./app.scss";
import ChatMenu from "./components/chat-menu";
import ChatWindow from "./components/chat-window/chat-window";
import { getChatMessages, getChats, getUsers } from "./services/requests";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();
  const [currentUserId, setCurrentUserId] = useState(1);
  const [users, setUsers] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const selectChat = (chatId) => {
    const chat = chats.find((chat) => chat.id === chatId);
    setSelectedChat(chat);
    setSelectedMessages(messages.find((message) => message.chatId === chatId));
  };

  useEffect(() => {
    const getData = async () => {
      const users = await getUsers(currentUserId);
      setUsers(users.data);

      const chats = await getChats("1");
      setChats(chats.data || []);

      const messagesRequest = chats.data.map(async (chat) => ({
        chatId: chat.id,
        messages: (await getChatMessages(chat.id)).data,
      }));
      const messages = await Promise.all(messagesRequest);
      setMessages(messages || []);
    };

    getData();
  }, [currentUserId]);

  return (
    <div className={classes.root}>
      <ChatMenu chats={chats} messages={messages} selectChat={selectChat} />
      <ChatWindow
        selectedChat={selectedChat}
        messages={selectedMessages}
        users={users}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default App;
