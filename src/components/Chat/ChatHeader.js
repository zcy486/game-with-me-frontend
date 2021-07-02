import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

import MockAvatar from "../../images/avatar.svg";

const useStyles = makeStyles((theme) => ({
  chatHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    fontSize: 18,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(2),
  },
}));

function ChatHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.chatHeader}>
      <Avatar className={classes.avatar} src={MockAvatar} />
      {props.selectedUser && props.selectedUser.self
        ? "(yourself)"
        : props.selectedUser && props.selectedUser.username}
    </div>
  );
}

export default ChatHeader;
