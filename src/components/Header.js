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

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import Autocomplete from "@material-ui/lab/Autocomplete";

import UserMenu from "./UserRelevant/UserMenu";
import SearchService from "../services/SearchService";
//import _ from "lodash";

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

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function Header(props) {
  const classes = useStyles();

  //UserMenu-relevant
  const user = useSelector((state) => state.user);
  const [userAnchor, setUserAnchor] = React.useState(null);

  //----all you need with the search bar is on below!----
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [loadingText, setLoadingText] = React.useState("Loading...");
  const loading = open && options.length === 0 && inputValue.length > 0;

  /* alternative
  const doSearch = async (value) => {
    const response = await SearchService.search(value);
    setOptions(response);
    if (response.length === 0) {
      setLoadingText("No matches");
    }
  }
  const debounceSearch = _.debounce(doSearch, 200);
  */

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await SearchService.search(inputValue);
      await sleep(200);

      if (active) {
        setOptions(response);
        if (response.length === 0) {
          setLoadingText("No matches");
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue, loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onInputChange = (event, value) => {
    setOptions([]);
    setInputValue(value);
    setLoadingText("Loading...");
    //if (value.length > 0) {
    //  debounceSearch(value);
    //}
  };

  const onChange = (event, value, reason) => {
    setValue(value);
    if (reason === "select-option") {
      if (value.group === "Games") {
        const gameId = value.id;
        props.history.push("/games/" + gameId);
      } else if (value.group === "Companions") {
        const companionId = value.id;
        props.history.push("/companion/" + companionId);
      }
    }
  };
  //----all you need with the search bar is on above!----

  const onClickTitle = () => {
    props.history.push("/");
  };

  const onClickChat = () => {
    if (!user.user) {
      props.history.push("/login");
    } else {
      props.history.push("/chat");
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
          //value-relevant, these two values are independent
          value={value}
          onChange={onChange}
          inputValue={inputValue}
          onInputChange={onInputChange}
          //popup-relevant
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          //loading-relevant
          loading={loading}
          loadingText={loadingText}
          //options-relevant
          options={options}
          groupBy={(option) => option.group}
          filterOptions={(x) => x}
          getOptionLabel={(option) => (option.name ? option.name : option)}
          //render-input-relevant
          renderInput={(params) => (
            <div className={classes.search} ref={params.InputProps.ref}>
              <div className={classes.searchIcon}>
                <SearchIcon className={classes.iconButton} />
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
