import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Divider, ButtonBase, Typography, Box } from "@material-ui/core";
import MockAvatar from "../../images/avatar.svg";
import Ecoin from "../ECoin";
import Rating from "@material-ui/lab/Rating";

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
  box: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  ratingRow: {
    display: "flex",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
}));

function CompanionBox(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="avatar"
              src={props.avatar ? props.avatar : MockAvatar}
            />
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
            <Ecoin /> <span>&nbsp;</span>/ Game{" "}
          </Grid>
          <Grid item>Server: {props.server}</Grid>
          <Grid item>Platform: {props.platform}</Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} direction="column">
          <Grid className={classes.ratingRow}>
            <Box
              className={classes.box}
              component="fieldset"
              borderColor="transparent"
            >
              <Typography variant={"h6"}>Rating score:</Typography>
              <div className={classes.rating}>
                <Rating
                  value={props.ratings ? props.ratings : 0}
                  precision={0.1}
                  readOnly
                />
                <span>&nbsp;</span>
                <Typography>
                  {typeof props.ratings === "number" &&
                    props.ratings.toFixed(1)}{" "}
                  / 5.0
                </Typography>
              </div>
            </Box>

            <Box
              className={classes.box}
              component="fieldset"
              borderColor="transparent"
            >
              <Typography variant={"h6"}>Served:</Typography>
              <Typography>{props.served}</Typography>
            </Box>
            <Box
              className={classes.box}
              component="fieldset"
              borderColor="transparent"
            >
              <Typography variant={"h6"}>Type:</Typography>
              <Typography>{props.companionType}</Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default CompanionBox;
