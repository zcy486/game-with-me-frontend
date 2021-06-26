import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import backgroundPic from "../images/bg_postlist.png";
import ThanksForYourOrder from "../components/MyOrderDetailView/ThanksForYourOrder";
import DetailInfo from "../components/MyOrderDetailView/DetailInfo";

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
  }
}));

function MyOrderDetailView() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
     
        <div className={classes.content}>
          <ThanksForYourOrder/>
          <DetailInfo/>

          
      
        </div>
       
  
    </div>
  );
}

export default MyOrderDetailView;



