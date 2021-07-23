import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import ECoin from "../ECoin";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 840,
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  paperContent: {
    display: "flex",
  },
  img: {
    width: 128,
    height: 128,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    padding: theme.spacing(1),
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
    alignItems: "center",
  },
  ratingStars: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  languageRow: {
    display: "table",
  },
  languageColumn: {
    display: "table-cell",
  },
}));

function PostBox(props) {
  const classes = useStyles();

  const onClick = (event) => {
    event.preventDefault();
    props.onClick(props.postId);
  };

  return (
    <ButtonBase onClick={onClick}>
      <Paper className={classes.paper}>
        <Grid className={classes.paperContent}>
          <Grid item>
            <img className={classes.img} alt="avatar" src={props.avatar} />
          </Grid>
          <Grid className={classes.paperColumn}>
            <Typography>{props.username}</Typography>
            <Grid className={classes.priceInfo}>
              {props.price}
              <span>&nbsp;</span>
              <ECoin />
              <span>&nbsp;</span>/ Game
            </Grid>
          </Grid>
          <Grid className={classes.placeHolder} />
          <Grid className={classes.paperColumn}>
            <Grid className={classes.ratingStars}>
              <Rating
                value={props.ratings ? props.ratings : 0}
                precision={0.1}
                readOnly
              />
              <Typography>({props.reviewNumber})</Typography>
            </Grid>
            <Grid item>
              <div className={classes.languageRow}>
                Language:
                {props.languages.map((language, i) => {
                  return (
                    <div key={i} className={classes.languageColumn}>
                      {i > 0 ? "," : ""}
                      <span>&nbsp;</span>
                      {language}
                    </div>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
}

export default PostBox;
