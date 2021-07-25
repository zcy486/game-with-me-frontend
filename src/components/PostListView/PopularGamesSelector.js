import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    fontFamily: "Helvetica",
    paddingBottom: theme.spacing(6),
  },
  gamePic: {
    width: theme.spacing(4.8),
    height: theme.spacing(4.8),
  },
}));

function PopularGamesSelector(props) {
  const classes = useStyles();

  const handleListItemClick = (event, id) => {
    props.onSelectGame(id);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.games.map((game, i) => (
          <ListItem
            key={i}
            button
            selected={props.selectedId === game._id}
            onClick={(event) => handleListItemClick(event, game._id)}
          >
            <ListItemIcon>
              <Avatar src={game.gamePic} className={classes.gamePic} />
            </ListItemIcon>
            <ListItemText primary={game.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

PopularGamesSelector.propTypes = {
  games: PropTypes.array.isRequired,
};

export default PopularGamesSelector;
