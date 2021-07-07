import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 1000,
    height: 250,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function NoPosts() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant={"h6"}>This companion has currently no posts.</Typography>
    </Paper>
  );
}

export default NoPosts;
