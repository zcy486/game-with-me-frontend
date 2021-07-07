import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CommentBox from "./CommentsBox";
import MockAvatar from "../../images/avatar.svg";
import { connect, useSelector } from "react-redux";
import {
  getPost,
  getReviewByOrderId,
  getReviewWithLabels,
} from "../../redux/actions";

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
  const reviews = useSelector((state) => state.review.response);

  useEffect(() => {
    if (props.companionId) {
      props.dispatch(getReviewWithLabels(props.companionId));
    }
  }, [props.companionId]);

  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        <h1>Comments: {reviews && reviews.reviews.length}</h1>
      </div>
      <div className={classes.paperRow}>
        {reviews &&
          Array.isArray(reviews.labels) &&
          reviews.labels.map(function (label, i) {
            return (
              <Chip
                key={i}
                avatar={
                  <Avatar className={classes.chipAvatar}>{label[1]}</Avatar>
                }
                label={label[0]}
                className={classes.paperColumn + " " + classes.chip}
              />
            );
          })}
      </div>
      {reviews && reviews.reviews.length !== 0 ? (
        reviews.reviews.map((review) => {
          return (
            <Paper className={classes.paper} key={review.gamerName}>
              <CommentBox
                name={review.gamerName}
                avatarUrl={review.gamerAvatar ? review.gamerAvatar : MockAvatar}
                date={timestampFormatter(review.createdAt)}
                rating={review.star}
                content={review.reviewText}
              />
            </Paper>
          );
        })
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: "bolder", fontSize: "large" }}>No comments</p>
          <p style={{ fontWeight: "bold", fontSize: "medium" }}>
            Make an order and give your comments!
          </p>
        </div>
      )}
    </div>
  );
}

function timestampFormatter(timestamp) {
  let stringTime = timestamp.toString()
  let date = stringTime.substring(0, 10);
  return date;
}

export default connect()(Comments);
