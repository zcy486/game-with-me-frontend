import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShortRecapBox from "../components/ReviewView/ShortRecapBox";
import StarForRating from "../components/ReviewView/StarForRating";
import ControllStar from "../components/ReviewView/ControllStar";
import Labels from "../components/ReviewView/Labels";
import CheckboxLabels from "../components/ReviewView/CheckboxForLabel";
import ReviewTextField from "../components/ReviewView/ReviewTextField";
import Submitmsg from "../components/ReviewView/Submitmsg";
import CancelButton from "../components/ReviewView/CancelButton";
import backgroundPic from "../images/bg_postlist.png";
import { ArrowRight } from "@material-ui/icons";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MockAvatar from "../images/avatar.svg";
import {createReview,getReviewByOrderId} from "../redux/actions/reviewAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: `url(${backgroundPic})`,
    backgroundRepeat: "repeat",
  },

  content: {
    textAlign: "left",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  title: {
    fontSize: "30px",
    fontFamily: "Helvetica",
  },
  subTitle: {
    fontSize: "20px",
    fontFamily: "Helvetica",
  },
  placeHolder: {
    flexGrow: 1,
  },
  buttomS: {
    display: "flex",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  }

}));

function CreateReviewView(props) {
  const classes = useStyles();
  //short recap
  let { match } = props;
  //deconstruct from redux state.review
  const {review} = useSelector((state) => state.review);
  // console.log(match.params.orderId);

  const handleSubmit = (_id, star, label, reviewText, orderId, companionId, gamerId) => {
    props.dispatch(createReview(_id, star, label, reviewText, orderId, companionId, gamerId));
  }

  useEffect(() => {
    props.dispatch(getReviewByOrderId(match.params.orderId));
  }, [review]);

  const clickOrder = () => {
    props.history.push(window.location.pathname + "/order");
  };

  return (
    !review? null:
    <div className={classes.root}>
     
        <div className={classes.content}>
          <h2 className={classes.title}>Create Review For:</h2>
          {/* TODO */}
        {/*     <ShortRecapBox
              avatarUrl={review.avatar? review.avatar : MockAvatar}
              companionName={review.companionName}
              ratings={review.ratings}
              /> */}
          {/* <h3 className={classes.subTitle}>Give an Overall Rating</h3>
            <StarForRating/>
          <h3 className={classes.subTitle}>Add Labels(Optional)</h3>
            
            <CheckboxLabels/>
          <h3 className={classes.subTitle}>Write a review(Optional)</h3>
            <ReviewTextField/> */}
         
          <div className={classes.buttomS}>
            
          <Submitmsg review={review} handleSubmit={handleSubmit}/> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
{/*             <CancelButton/>
 */}           </div> 
      
        </div>

    </div>
  );
}

export default connect() (withRouter(CreateReviewView));