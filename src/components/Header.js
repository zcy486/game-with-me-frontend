import {
  AppBar,
  fade,
  IconButton,
  InputBase,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "linear-gradient(to right, #8be3ff, #7908be)",
  },
  toolbar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  link: {
    color: "black",
    fontFamily: "Audiowide",
    fontSize: 20,
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
  whiteicon: {
    color: "white",
  },
  blackicon: {
    color: "black",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position={"sticky"} className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>
          <Link href="/" className={classes.link} underline={"none"}>
            GameWithMe
          </Link>
        </Typography>
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
        <IconButton className={classes.whiteicon}>
          <ChatIcon />
        </IconButton>
        <IconButton className={classes.whiteicon}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
