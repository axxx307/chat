import { Button, Card, Divider, TextField, Typography } from "@material-ui/core";
import React from "react";
import SendIcon from '@material-ui/icons/Send';

const SelectedChatWindow = (props) => {
  return (
    <Card>
      <Typography>
        <p>Chat Name</p>
      </Typography>
      <Divider />
      <div>MainWidnow</div>
      <div>
        <TextField />
        <Button><SendIcon /></Button>
      </div>
    </Card>
  )
} 

export default SelectedChatWindow;