import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function AllGamesSelector() {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <li key={`section-A`} className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>{"A"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Apex Legends" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Animal Crossing: New Horizons" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Arena of Valor" />
          </ListItemLink>
          <ListSubheader>{"B"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Borderlands 3" />
          </ListItemLink>
          <ListSubheader>{"C"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="CS:GO" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Call of Duty" />
          </ListItemLink>
          <ListSubheader>{"D"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Dota2" />
          </ListItemLink>
        </ul>
      </li>
    </List>
  );
}

export default AllGamesSelector;
