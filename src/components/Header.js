import React from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";

import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: theme.palette.background.appBar,
  },
  toolbar: {
    flexGrow: 1,
  },
  title: {
    color: "black",
    fontFamily: theme.typography.fontFamily.title,
    fontSize: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    cursor: "pointer",
  },
  placeHolder: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 30,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  iconButton: {
    color: "white",
  },
}));

function Header(props) {
  const classes = useStyles();

  const [userAnchor, setUserAnchor] = React.useState(null);

  const onClickTitle = () => {
    props.history.push("/");
  };

  const onClickChat = () => {
    props.history.push("/login");
  }

  return (
    <AppBar position={"sticky"} className={classes.appbar}>
      <UserMenu
        open={Boolean(userAnchor)}
        anchor={userAnchor}
        //everytime when closing the menu, set the anchor to null
        onClose={() => setUserAnchor(null)}
      />
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} onClick={onClickTitle}>
          GameWithMe
        </Typography>
        <div className={classes.placeHolder} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            placeholder={"Search..."}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <IconButton className={classes.iconButton} onClick={onClickChat}>
          <MessageIcon />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          //triggered by event "clicking", the clicked icon becomes the anchor
          onClick={(event) => setUserAnchor(event.currentTarget)}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
