import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function PopularGamesSelector() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemLink href="#simple-list">
          <ListItemText primary="League of Legends" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Among us" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Animal Crossing: New Horizons" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Minecraft" />
        </ListItemLink>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Overwatch" />
        </ListItemLink>
      </List>
    </div>
  );
}
export default PopularGamesSelector;