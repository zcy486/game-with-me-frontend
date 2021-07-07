import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CommentBox from "./CommentsBox";
import MockAvatar from "../../images/avatar.svg";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
  },
  paper: {
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  paperRow: {
    display: "flex",
  },
  paperColumn: {
    margin: theme.spacing(2),
  },
  chip: {
    backgroundColor: "#ffc97d",
    fontFamily: "Helvetica",
  },
  chipAvatar: {
    backgroundColor: "#ffe3ba",
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
}));

function Comments(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        <h1>Comments: {props.numComments}</h1>
      </div>
      <div className={classes.paperRow}>
        {props.labels.map(function (label, i) {
          return (
            <Chip
              key={i}
              avatar={
                <Avatar className={classes.chipAvatar}>{label.num}</Avatar>
              }
              label={label.name}
              className={classes.paperColumn + " " + classes.chip}
            />
          );
        })}
      </div>
      <Paper className={classes.paper}>
        <CommentBox
          name={"UserA"}
          date={"3 days ago"}
          avatar={MockAvatar}
          rating={3.5}
          content={"He really carried in the game. An easy win!!!"}
        />
      </Paper>
      <Paper className={classes.paper}>
        <CommentBox
          name={"UserB"}
          date={"5 days ago"}
          avatar={MockAvatar}
          rating={5.0}
          content={"Super nice guy, really recommended!"}
        />
      </Paper>
    </div>
  );
}

export default Comments;
