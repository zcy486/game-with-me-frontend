import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper } from "@material-ui/core";

import MockAvatar from "../../images/avatar.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 1000,
    fontFamily: "Helvetica",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(7),
    fontSize: 20,
  },
  avatarAndInfo: {
    display: "flex",
  },
  img: {
    width: 128,
    height: 128,
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    marginRight: theme.spacing(3),
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
  },
}));

function CompanionInfo(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction={"column"}>
        <Grid className={classes.avatarAndInfo}>
          <Grid item>
            <img className={classes.img} alt="avatar" src={MockAvatar} />
          </Grid>
          <Grid className={classes.info}>
            <Grid item>{props.username}</Grid>
            <Grid item>Age: {props.age}</Grid>
            <Grid item>Gender: {props.gender}</Grid>
          </Grid>
        </Grid>
        <Grid className={classes.buttonRow}>
          <Button variant={"contained"} color={"primary"}>
            Chat
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CompanionInfo;
