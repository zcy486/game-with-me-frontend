import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShortRecapBox from "../components/ReviewView/ShortRecapBox";
import StarForRating from "../components/ReviewView/StarForRating";
import ControllStar from "../components/ReviewView/ControllStar";
import Labels from "../components/ReviewView/Labels";
import CheckboxLabels from "../components/ReviewView/CheckboxForLabel";
import ReviewTextField from "../components/ReviewView/ReviewTextField";
import SubmitButton from "../components/ReviewView/SubmitButton";
import CancelButton from "../components/ReviewView/CancelButton";
import backgroundPic from "../images/bg_postlist.png";
import { ArrowRight } from "@material-ui/icons";

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
    
    spacing: 10,
  }

}));

function CreateReviewView() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
     
        <div className={classes.content}>
          <h2 className={classes.title}>Create Review For:</h2>
            <ShortRecapBox/>
          <h3 className={classes.subTitle}>Give an Overall Rating</h3>
            <StarForRating/>
          <h3 className={classes.subTitle}>Add Labels(Optional)</h3>
            
            <CheckboxLabels/>
          <h3 className={classes.subTitle}>Write a review(Optional)</h3>
            <ReviewTextField/>
          <div className={classes.buttomS}>
             <SubmitButton/> &nbsp; &nbsp; &nbsp; &nbsp;
             <CancelButton/>
          </div>
           
          
      
        </div>
        
      
  
    </div>
  );
}

export default CreateReviewView;