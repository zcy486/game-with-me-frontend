import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import ECoin from "../ECoin";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
  },
  priceInfo: {
    display: "flex",
    marginRight: theme.spacing(6),
  },
  eCoinArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(3),
  },
  chatButton: {
    marginRight: theme.spacing(5),
  },
  ratingRow: {
    display: "flex",
  },
  box: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
}));




function PostDetails(props) {
  const classes = useStyles();

const clickOrder = () => {
    props.clickOrder();
  };
  return (
    <div>
      <div className={classes.title}>
        <div className={classes.priceInfo}>
          <h1>Price: {props.price}</h1>
          <span>&nbsp;</span>
          <div className={classes.eCoinArea}>
            <ECoin />
          </div>
          <span>&nbsp;</span>
          <h1>/ Game</h1>
        </div>
        <h1>Game: {props.gameName}</h1>
      </div>
      <Paper className={classes.paper}>
        <Grid container direction={"column"}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="avatar" src={props.avatar} />
              </ButtonBase>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item> {props.username} </Grid>
              <Grid item> Age: {props.age} </Grid>
              <Grid item>
                {" "}
                Introduction:
                <Typography variant="subtitle1" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttons}>
            <Button
              className={classes.chatButton}
              variant={"contained"}
              color={"primary"}
              size={"small"}
            >
              Chat
            </Button>
            <Button variant={"contained"} color={"secondary"} size={"small"} onClick={clickOrder}>
              Order
            </Button>
          </Grid>
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
                name="read-only"
                value={props.ratings}
                precision={0.1}
                readOnly
              />
              <span>&nbsp;</span>
              <Typography>{props.ratings} / 5</Typography>
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
        <Divider />
        <Grid container spacing={2} direction="column">
          <Grid item>Details</Grid>
          <Grid item container flex="row">
            Price: {props.price} <span>&nbsp;</span>
            <ECoin /> <span>&nbsp;</span>/ Game{" "}
          </Grid>
          <Grid item>Server: {props.server}</Grid>
          <Grid item>Platform: {props.platform}</Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default PostDetails;
