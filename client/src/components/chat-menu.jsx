import React, { useState } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  chatText: {
    display: "flex",
    flexDirection: "column",
  },
}));

const ChatMenu = (props) => {
  const { chats, messages, selectChat } = props;
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    selectChat(chatId);
  };

  const filterLastMessageText = (chatId) => {
    if (!messages) {
      return "";
    }

    const chat = messages.find((message) => message.chatId === chatId);
    if (!chat) {
      return ''
    }

    const lastMessageText = chat.messages[chat.messages.length - 1].text || "";
    return lastMessageText.slice(0, 10);
  };

  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {chats &&
          chats.map((chat) => (
            <>
              <ListItem
                className={classes.chatText}
                button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
              >
                <ListItemText primary={chat.name} />
                <ListItemText primary={`"${filterLastMessageText(chat.id)}"`} />
              </ListItem>
              <Divider />
            </>
          ))}
      </List>
    </Drawer>
  );
};

export default ChatMenu;
