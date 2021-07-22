import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShortRecapBox from "../components/ReviewView/ShortRecapBox";
import Submitmsg from "../components/ReviewView/Submitmsg";
import backgroundPic from "../images/bg_postlist.png";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MockAvatar from "../images/avatar.svg";
import {createReview,getReviewByOrderId,updateReview,getReviewByCompanionId} from "../redux/actions/reviewAction";
import {getOrder} from "../redux/actions/orderActions";

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
  const review = useSelector((state) => state.review);
  // console.log(match.params.orderId);
  const reviewlist = useSelector((state) => state.review.reviewlist);

  const handleSubmit = (star, label, reviewText, companionId, gamerId, orderId) => {
    props.dispatch(createReview(star, label, reviewText, companionId, gamerId, orderId));
  }
  const handleUpdate = (_id, updateObj) => {
    props.dispatch(updateReview(_id, updateObj));
  }

  useEffect(() => {
    props.dispatch(getReviewByOrderId(match.params.orderId));
  }, []);
  useEffect(() => {
    props.dispatch(getReviewByCompanionId(match.params.companionId));
  }, []);

  //fetch Order info for orderId/gamerId/companionId
  const order = useSelector((state) => state.order);
  console.log(review)
  useEffect(() => {
      props.dispatch(getOrder(match.params.orderId));
    }, []); 

  const clickOrder = () => {
    props.history.push(window.location.pathname + "/order");
  };

  return (
    <div className={classes.root}>
        <div className={classes.content}>
          <h2 className={classes.title}>Create Review For:</h2>
          
          {reviewlist && <ShortRecapBox
              avatarUrl={reviewlist.avatarUrl? reviewlist.avatarUrl : MockAvatar}
              companionName={reviewlist.username}
              ratings={reviewlist.ratings}
              /> }
         
          <div className={classes.buttomS}>
            
          <Submitmsg order={order} review={review} handleUpdate={handleUpdate} handleSubmit={handleSubmit}/>
           </div> 
      
        </div>

    </div>
  );
}

export default connect() (withRouter(CreateReviewView));