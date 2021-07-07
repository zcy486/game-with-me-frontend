import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  paperRow: {
    display: "flex",
  },
  paperColumn: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  comment: {
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(5),
  },
  commentContent: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  image: {
    width: 128,
    height: 128,
    padding: theme.spacing(1),
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  placeholder: {
    flexGrow: "1",
  },
}));

function CommentBox(props) {
  const classes = useStyles();
  return (
    <Grid>
      <Grid className={classes.paperRow}>
        <Grid className={classes.paperColumn}>{props.name}</Grid>
        <Grid className={classes.paperColumn}>{props.date}</Grid>
      </Grid>
      <Grid className={classes.paperRow}>
        <Grid className={classes.paperColumn}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="avatar" src={props.avatar} />
          </ButtonBase>
        </Grid>
        <Grid className={classes.paperColumn}>
          <Rating defaultValue={props.rating} precision={0.5} readOnly />
          <div className={classes.placeholder} />
          <p className={classes.commentContent}>{props.content}</p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentBox;
