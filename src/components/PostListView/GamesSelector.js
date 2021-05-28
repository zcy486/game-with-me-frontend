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
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import PopularGamesSelector from "./PopularGamesSelector";
import AllGamesSelector from "./AllGamesSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: fade("#8271DD", 0.35),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function GamesSelector() {
  const classes = useStyles();

  const [openPopular, setOpenPopular] = React.useState(true);
  const [openAll, setOpenAll] = React.useState(true);

  const handleClickPopular = () => {
    setOpenPopular(!openPopular);
  };

  const handleClickAll = () => {
    setOpenAll(!openAll);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClickPopular}>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="Popular Games" />
        {openPopular ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openPopular} timeout="auto" unmountOnExit>
        <PopularGamesSelector />
      </Collapse>

      <ListItem button onClick={handleClickAll}>
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="All Games" />
        {openAll ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openAll} timeout="auto" unmountOnExit>
        <AllGamesSelector />
      </Collapse>
    </List>
  );
}

export default GamesSelector;