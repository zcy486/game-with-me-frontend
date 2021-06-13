import React, { useEffect } from "react";
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
import { connect, useSelector } from "react-redux";
import { getGames } from "../redux/actions";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { matchSorter } from "match-sorter";

import UserMenu from "./UserRelevant/UserMenu";

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
    width: "30ch",
  },
  iconButton: {
    color: "white",
  },
}));

function Header(props) {
  const classes = useStyles();

  const games = useSelector((state) => state.games.games);

  const user = useSelector((state) => state.user);

  const [userAnchor, setUserAnchor] = React.useState(null);

  const [searchInput, setSearchInput] = React.useState("");
  const [popUpClosed, setPopUpClosed] = React.useState(false);

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue);

  useEffect(() => {
    if (!games) {
      loadGames();
    }
  }, [games]);

  const loadGames = async () => {
    props.dispatch(getGames());
  };

  const onClickTitle = () => {
    props.history.push("/");
  };

  const onClickChat = () => {
    if (!user.user) {
      props.history.push("/login");
    }
  };

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
        <Autocomplete
          freeSolo
          value={null}
          onChange={(e) => {}}
          inputValue={searchInput}
          onInputChange={(e, v) => {
            setSearchInput(v);
          }}
          onOpen={(e) => setPopUpClosed(false)}
          onClose={(e) => setPopUpClosed(true)}
          open={searchInput.length > 0 && !popUpClosed}
          options={games && games.all.map((game) => game.name)}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <div className={classes.search} ref={params.InputProps.ref}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                placeholder={"Search posts by game or username"}
                {...params.inputProps}
              />
            </div>
          )}
        />
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

export default connect()(withRouter(Header));

/*
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            placeholder={"Search..."}
            inputProps={{ "aria-label": "search" }}
          />
 */
