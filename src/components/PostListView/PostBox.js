import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import logo from "../../images/logo.png";
import ECoin from "../ECoin";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  paperContent: {
    display: "flex",
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
  paperColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
  },
  placeHolder: {
    flexGrow: 1,
  },
  priceInfo: {
    display: "flex",
  },
  ratingStars: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function PostBox(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid className={classes.paperContent}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="avatar" src={logo} />
          </ButtonBase>
        </Grid>
        <Grid className={classes.paperColumn}>
          <Typography>{props.username}</Typography>
          <Grid className={classes.priceInfo}>
            5<span>&nbsp;</span>
            <ECoin></ECoin>
            <span>&nbsp;</span>/ Game
          </Grid>
        </Grid>
        <Grid className={classes.placeHolder} />
        <Grid className={classes.paperColumn}>
          <Grid className={classes.ratingStars}>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item>Language: Español, English</Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostBox;
