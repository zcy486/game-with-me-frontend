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
    fontFamily: "Helvetica",
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
          <ListSubheader>{"F"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Fortnight" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Fifa" />
          </ListItemLink>
          <ListSubheader>{"G"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Grand Theft Auto" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Golf" />
          </ListItemLink>
          <ListSubheader>{"H"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Humans Fall Flat" />
          </ListItemLink>
          <ListSubheader>{"L"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="League of Legends" />
          </ListItemLink>
          <ListSubheader>{"M"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Minecraft" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Monster Hunter" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Monopoly" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Mario Kart" />
          </ListItemLink>
          <ListSubheader>{"O"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Overwatch" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Overcooked" />
          </ListItemLink>
          <ListSubheader>{"P"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Portal" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="PUBG" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Pokemon" />
          </ListItemLink>
          <ListSubheader>{"R"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Rainbow Six" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Risk of Rain" />
          </ListItemLink>
          <ListSubheader>{"S"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Stardew Valley" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Super Smash Bros" />
          </ListItemLink>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Splatoon" />
          </ListItemLink>
          <ListSubheader>{"U"}</ListSubheader>
          <ListItemLink href="#simple-list">
            <ListItemText primary="UNO" />
          </ListItemLink>
        </ul>
      </li>
    </List>
  );
}

export default AllGamesSelector;
