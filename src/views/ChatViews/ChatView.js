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

function ChatView(props) {
  const classes = useStyles();

  let { match } = props;

  const me = useSelector((state) => state.user.user);

  const [input, setInput] = React.useState("");
  const [scroll, setScroll] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [postLink, setPostLink] = React.useState(null);

  useEffect(() => {
    if (
      match.params.gameId &&
      match.params.gameName &&
      match.params.price &&
      match.params.postId
    ) {
      setPostLink({
        gameId: match.params.gameId,
        gameName: match.params.gameName,
        price: match.params.price,
        postId: match.params.postId,
        targetId: match.params.targetID,
      });
    }
  }, [match.params]);

  useEffect(() => {
    if (me) {
      console.log("Entering the chat room...");
      socket.auth = { userID: me._id, username: me.username };
      if (match.params.targetID && match.params.targetName) {
        socket.auth.targetID = match.params.targetID;
        socket.auth.targetName = match.params.targetName;
      }
      socket.connect();
    }
    // clean up when this view unmounts
    return () => {
      console.log("Leaving the chat room...");
      socket.disconnect();
    };
  }, [me]);

  useEffect(() => {
    socket.on("session", ({ userID }) => {
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
    socket.on("users", (users) => {
      let _allUsers = [...allUsers];
      users.forEach((user) => {
        for (let i = 0; i < _allUsers.length; i++) {
          const existingUser = _allUsers[i];
          if (existingUser.userID === user.userID) {
            existingUser.connected = user.connected;
            return;
          }
        }
        initReactiveProperties(user);
        if (user.userID === match.params.targetID) {
          setSelectedUser(user);
        }
        _allUsers.push(user);
      });
      // put the current user first, and sort by username
      _allUsers.sort((a, b) => {
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

    socket.on("loaded messages", (messages) => {
      messages.forEach((message) => {
        message.fromSelf = message.from === socket.userID;
      });
      if (selectedUser) {
        selectedUser.messages = messages;
        setScroll((value) => !value);
      }
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
          if (selectedUser && selectedUser.userID === user.userID) {
            setScroll((value) => !value);
          } else {
            user.hasNewMessages = true;
          }
          break;
        }
      }
      setAllUsers(_allUsers);
    });
    // clean up
    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("loaded messages");
      socket.off("private message");
    };
  }, [socket, allUsers, selectedUser]);

  const initReactiveProperties = (user) => {
    user.messages = [];
    user.loaded = false;
    user.hasNewMessages = false;
  };

  const onSelectUser = (user) => {
    user.hasNewMessages = false;
    setSelectedUser(user);
    setLoaded(user.loaded);
    setScroll((value) => !value);
  };

  const sendMessage = (content) => {
    if (selectedUser && content.length > 0) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({
        content,
        fromSelf: true,
      });
      setScroll((value) => !value);
    }
    setInput("");
  };

  const onChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const onClickLoad = (event) => {
    event.preventDefault();
    if (selectedUser && !selectedUser.loaded) {
      setLoaded(true);
      selectedUser.loaded = true;
      socket.emit("load messages", {
        from: socket.userID,
        to: selectedUser.userID,
      });
    }
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
          <ChatHeader selectedUser={selectedUser} postLink={postLink} />
          <Divider />
          <MessagePanel
            selectedUser={selectedUser}
            scroll={scroll}
            loaded={loaded}
            onLoad={onClickLoad}
          />
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
