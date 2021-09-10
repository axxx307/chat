import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./app.scss";
import Chats from "./components/chats";
import ChatWindow from "./components/chat-window/chat-window";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
     <Chats />
     <ChatWindow/>
    </div>
  );
};

export default App;
