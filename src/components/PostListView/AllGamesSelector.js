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

function AllGamesSelector(props) {
  const classes = useStyles();

  let data = props.games.reduce((r, e) => {
    let group = e.name[0];
    if (!r[group]) r[group] = { group, children: [e] };
    else r[group].children.push(e);
    return r;
  }, {});
  let result = Object.values(data);

  return (
    <List className={classes.root} subheader={<li />}>
      <li key={`section-A`} className={classes.listSection}>
        <ul className={classes.ul}>
          {result.map((section) => (
            <div>
              <ListSubheader>{section.group}</ListSubheader>
              {Array.isArray(section.children) ? (
                section.children.map((game) => (
                  <ListItemLink href={game._id}>
                    <ListItemText primary={game.name} />
                  </ListItemLink>
                ))
              ) : (
                <ListItemLink>
                  <ListItemText primary={"test"} />
                </ListItemLink>
              )}
            </div>
          ))}
        </ul>
      </li>
    </List>
  );
}

export default AllGamesSelector;
