import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  userInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));

function UserInput(props) {
  const classes = useStyles();

  return (
    <div className={classes.userInput}>
      <TextField
        value={props.input}
        onChange={props.onChange}
        label="Write here..."
        variant="outlined"
        color={"secondary"}
        fullWidth
        multiline
        rowsMax={4}
      />
      <IconButton onClick={() => props.sendMessage(props.input)}>
        <SendIcon />
      </IconButton>
    </div>
  );
}

export default UserInput;
