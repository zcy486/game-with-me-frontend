import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    height: 260,
    backgroundColor: theme.palette.background.paper,
    fontFamily: "Helvetica",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function PopularGamesSelector(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.games.map((game) => (
          <ListItemLink href={game._id}>
            <ListItemText primary={game.name} />
          </ListItemLink>
        ))}
      </List>
    </div>
  );
}

PopularGamesSelector.propTypes = {
  games: PropTypes.array.isRequired,
};

export default PopularGamesSelector;
