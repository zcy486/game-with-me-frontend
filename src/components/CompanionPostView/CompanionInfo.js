import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button, Grid, Paper, Divider, Typography, Box} from "@material-ui/core";

import MockAvatar from "../../images/avatar.svg";
import Rating from "@material-ui/lab/Rating";

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
    marginBottom: theme.spacing(3),
  },
  ratingRow: {
    display: "flex",
  },
  box: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  rating: {
    display: "flex",
    alignItems: "center",
  }
}));

function CompanionInfo(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction={"column"}>
        <Grid className={classes.avatarAndInfo}>
          <Grid item>
            <img className={classes.img} alt="avatar" src={props.avatarUrl ? props.avatarUrl : MockAvatar} />
          </Grid>
          <Grid className={classes.info}>
            <Grid item>{props.username}</Grid>
            <Grid item>Age: {props.age}</Grid>
            <Grid item>Gender: {props.gender}</Grid>
          </Grid>
        </Grid>
        <Grid className={classes.buttonRow}>
          <Button variant={"contained"} color={"primary"} onClick={props.clickChat}>
            Chat
          </Button>
        </Grid>
        <Divider />
        <Grid className={classes.ratingRow}>
          <Box
              className={classes.box}
              component="fieldset"
              borderColor="transparent"
          >
            <Typography variant={"h6"}>Rating score:</Typography>
            <div className={classes.rating}>
              <Rating
                  value={props.ratings? props.ratings : 0}
                  precision={0.1}
                  readOnly
              />
              <Typography>({props.reviewNumber})</Typography>
            </div>
            <Typography>{typeof (props.ratings) == "number" && (props.ratings).toFixed(1)} / 5.0</Typography>
          </Box>
          <Box
              className={classes.box}
              component="fieldset"
              borderColor="transparent"
          >
            <Typography variant={"h6"}>Served:</Typography>
            <Typography>{props.orderNumber}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CompanionInfo;
