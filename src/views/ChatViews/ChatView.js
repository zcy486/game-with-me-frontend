import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

import socket from "../../socket";
import ChatList from "../../components/Chat/ChatList";
import ChatHeader from "../../components/Chat/ChatHeader";
import MessagePanel from "../../components/Chat/MessagePanel";
import UserInput from "../../components/Chat/UserInput";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  rightPanel: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

function ChatView() {
  const classes = useStyles();

  const me = useSelector((state) => state.user.user);

  const [input, setInput] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);

  useEffect(() => {
    if (me) {
      console.log("Enter chat room and try first connection.");
      socket.auth = { userID: me._id, username: me.username };
      socket.connect();
    }
    // clean up when this view unmounts
    return () => socket.disconnect();
  }, [me]);

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username and userID") {
        console.log("Error: invalid username and userID");
      }
    });
    // clean up
    return () => {
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      let _allUsers = [...allUsers];
      _allUsers.forEach((user) => {
        if (user.self) {
          user.connected = true;
        }
      });
      setAllUsers(_allUsers);
    });

    socket.on("disconnect", () => {
      let _allUsers = [...allUsers];
      _allUsers.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
      setAllUsers(_allUsers);
    });

    socket.on("users", (users) => {
      let _allUsers = [...allUsers];
      users.forEach((user) => {
        user.messages.forEach((message) => {
          message.fromSelf = message.from === socket.userID;
        });
        for (let i = 0; i < _allUsers.length; i++) {
          const existingUser = _allUsers[i];
          if (existingUser.userID === user.userID) {
            existingUser.connected = user.connected;
            existingUser.messages = user.messages;
            return;
          }
        }
        user.self = user.userID === socket.userID;
        initReactiveProperties(user);
        _allUsers.push(user);
      });
      // put the current user first, and sort by username
      _allUsers.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setAllUsers(_allUsers);
    });

    socket.on("user connected", (user) => {
      let _allUsers = [...allUsers];
      for (let i = 0; i < _allUsers.length; i++) {
        const existingUser = _allUsers[i];
        if (existingUser.userID === user.userID) {
          existingUser.connected = true;
          setAllUsers(_allUsers);
          return;
        }
      }
      initReactiveProperties(user);
      _allUsers.push(user);
      setAllUsers(_allUsers);
    });

    socket.on("user disconnected", (id) => {
      let _allUsers = [...allUsers];
      for (let i = 0; i < _allUsers.length; i++) {
        const user = _allUsers[i];
        if (user.userID === id) {
          user.connected = false;
          break;
        }
      }
      setAllUsers(_allUsers);
    });

    socket.on("private message", ({ content, from, to }) => {
      let _allUsers = [...allUsers];
      for (let i = 0; i < _allUsers.length; i++) {
        const user = _allUsers[i];
        const fromSelf = socket.userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          user.messages.push({
            content,
            fromSelf,
          });
          if (
            !selectedUser ||
            (selectedUser && selectedUser.userID !== user.userID)
          ) {
            user.hasNewMessages = true;
          }
          break;
        }
      }
      setAllUsers(_allUsers);
    });
    // clean up
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    };
  }, [socket, allUsers, selectedUser]);

  const initReactiveProperties = (user) => {
    user.hasNewMessages = false;
  };

  const onSelectUser = (user) => {
    user.hasNewMessages = false;
    setSelectedUser(user);
  };

  const sendMessage = (content) => {
    if (selectedUser && content.length > 0) {
      let _selectedUser = { ...selectedUser };
      socket.emit("private message", {
        content,
        to: _selectedUser.userID,
      });
      _selectedUser.messages.push({
        content,
        fromSelf: true,
      });
      setSelectedUser(_selectedUser);
    }
    setInput("");
  };

  const onChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  return (
    <div className={classes.root}>
      <ChatList
        allUsers={allUsers}
        selectedUser={selectedUser}
        onSelectUser={onSelectUser}
      />
      {selectedUser ? (
        <div className={classes.rightPanel}>
          <ChatHeader selectedUser={selectedUser} />
          <Divider />
          <MessagePanel selectedUser={selectedUser} />
          <Divider />
          <UserInput
            input={input}
            onChange={onChange}
            sendMessage={sendMessage}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default connect()(ChatView);
