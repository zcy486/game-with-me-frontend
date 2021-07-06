import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import ScrollContainer from "../../components/ScrollContainer";
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  messagePanel: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  loadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  messageSelf: {
    display: "flex",
    justifyContent: "flex-end",
  },
  messageOther: {
    display: "flex",
  },
}));

function MessagePanel(props) {
  const classes = useStyles();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.scroll]);

  return (
    <ScrollContainer>
      <div className={classes.messagePanel}>
        {props.selectedUser && !props.loaded ? (
          <div className={classes.loadButton}>
            <Button onClick={props.onLoad}>
              Load History Messages
            </Button>
          </div>
        ) : (
          <div />
        )}
        {props.selectedUser &&
          props.selectedUser.messages.map((message, i) => {
            return (
              <div
                key={i}
                className={
                  message.fromSelf ? classes.messageSelf : classes.messageOther
                }
              >
                <Message
                  from={message.fromSelf ? "me" : props.selectedUser.username}
                  content={message.content}
                />
              </div>
            );
          })}
      </div>
      <div ref={messagesEndRef} />
    </ScrollContainer>
  );
}

export default MessagePanel;
