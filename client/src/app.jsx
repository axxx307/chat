import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./app.scss";
import ChatMenu from "./components/chat-menu";
import ChatWindow from "./components/chat-window/chat-window";
import { getChatMessages, getChats, getUsers } from "./services/requests";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const selectChat = (chatId) => {
    const chat = chats.find((chat) => chat.id === chatId);
    setSelectedChat(chat);
    setSelectedMessages(messages.find((message) => message.chatId === chatId));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUserSelected = (event) => {
    setCurrentUserId(event.target.value);
    handleModalClose();
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers(currentUserId);
      setUsers(users.data);
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    const getData = async () => {
      const chats = await getChats(currentUserId);
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
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>
          Please select predefined user to send messages:
        </DialogTitle>
        <DialogContent>
          <Select value={currentUserId} onChange={handleUserSelected}>
            {users.map((user) => (
              <MenuItem value={user.id}>{user.userName}</MenuItem>
            ))}
          </Select>
        </DialogContent>
      </Dialog>
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
