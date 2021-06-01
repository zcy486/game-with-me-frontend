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
      <div className={classes.paperContent}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="avatar" src={logo} />
          </ButtonBase>
        </Grid>
        <div className={classes.paperColumn}>
          <Typography>{props.username}</Typography>
          <div className={classes.priceInfo}>
            5<span>&nbsp;</span>
            <ECoin></ECoin>
            <span>&nbsp;</span>/ Game
          </div>
        </div>
        <div className={classes.placeHolder} />
        <div className={classes.paperColumn}>
          <div className={classes.ratingStars}>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </div>
          <Grid item>Language: Español, English</Grid>
        </div>
      </div>
    </Paper>
  );
}

export default PostBox;
