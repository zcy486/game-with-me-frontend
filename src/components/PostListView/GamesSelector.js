import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import PopularGamesSelector from "./PopularGamesSelector";
import AllGamesSelector from "./AllGamesSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    minWidth: 270,
    backgroundColor: fade("#8271DD", 0.35),
    fontFamily: "Helvetica",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function GamesSelector(props) {
  const classes = useStyles();

  const onSelectGame = (gameId) => {
    props.onSelectGame(gameId)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="Popular Games" />
      </ListItem>

      <Collapse in={true} timeout="auto" unmountOnExit>
        <PopularGamesSelector
          games={props.games ? props.games.popular : []}
          onSelectGame={onSelectGame}
          selectedId = {props.selectedId}
        />
      </Collapse>

      <ListItem>
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="All Games" />
      </ListItem>

      <Collapse in={true} timeout="auto" unmountOnExit>
        <AllGamesSelector
            games={props.games ? props.games.all : []}
            onSelectGame={onSelectGame}
            selectedId = {props.selectedId}
        />
      </Collapse>
    </List>
  );
}

export default GamesSelector;
