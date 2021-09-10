import { Card } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    width: 250,
    margin: 20,
    background: (isSender) => (isSender ? "greenyellow" : "grey"),
    alignSelf: (isSender) => (isSender ? "flex-end" : "flex-start"),
  },
}));

const Message = (props) => {
  const { userName, text, isSender } = props;

  const classes = useStyles(isSender);
  return (
    <Card className={classes.card}>
      {userName}
      {text}
    </Card>
  );
};

export default Message;
