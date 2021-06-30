import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Divider, ButtonBase, Typography } from "@material-ui/core";
import MockAvatar from "../../images/avatar.svg";
import Ecoin from "../ECoin";

const useStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: "Helvetica",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(7),
    fontSize: 20,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function CompanionBox(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="avatar" src={props.avatar? props.avatar : MockAvatar} />
          </ButtonBase>
        </Grid>

        <Grid item xs container direction="column" spacing={2}>
          <Grid item> {props.username} </Grid>
          <Grid item> Age: {props.age} </Grid>
          <Grid item>
            {" "}
            Introduction:
            <Typography variant="subtitle1" gutterBottom>
              {props.introduction}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Divider />
        <Grid container spacing={2} direction="column">
          <Grid item>Details</Grid>

          <Grid item container flex="row">
            Price: {props.price} <span>&nbsp;</span>
            <Ecoin></Ecoin> <span>&nbsp;</span>/ Game{" "}
          </Grid>
          <Grid item>Server: {props.server}</Grid>
          <Grid item>Platform: {props.platform}</Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default CompanionBox;
