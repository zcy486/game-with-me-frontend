import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import AnnouncementIcon from "@material-ui/icons/Announcement";

import MockAvatar from "../../images/avatar.svg";

const useStyles = makeStyles(() => ({
  chatList: {
    width: 350,
    height: 689,
    overflowY: "auto",
    color: "ghostwhite",
    backgroundColor: "#9e8dec",
  },
  listItemText: {
    fontSize: 16,
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
}));

function ChatList(props) {
  const classes = useStyles();

  const online = { backgroundColor: "#56d243" };
  const offline = { backgroundColor: "#bbbbbb" };

  const onSelectUser = (user) => {
    props.onSelectUser(user);
  };

  return (
    <List className={classes.chatList}>
      {props.allUsers &&
        props.allUsers.map((user, i) => {
          return (
            <ListItem
              key={i}
              button
              onClick={() => onSelectUser(user)}
              selected={
                props.selectedUser && props.selectedUser.userID === user.userID
              }
            >
              <ListItemAvatar>
                <Avatar src={MockAvatar} />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                disableTypography
                primary={user.username}
                secondary={
                  user.connected ? (
                    <div className={classes.statusRow}>
                      <span className={classes.circle} style={online} />
                      {" in chat"}
                    </div>
                  ) : (
                    <div className={classes.statusRow}>
                      <span className={classes.circle} style={offline} />
                      {" not in chat"}
                    </div>
                  )
                }
              />
              {user.hasNewMessages ? <AnnouncementIcon /> : <div />}
            </ListItem>
          );
        })}
    </List>
  );
}

export default ChatList;
