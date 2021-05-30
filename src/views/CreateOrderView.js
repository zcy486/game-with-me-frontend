
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ScrollContainer from "../components/ScrollContainer";
import backgroundPic from "../images/bg_homepage.png";
import OrderBox from "../components/CreateOrderView/OrderBox"
import CompanionBox from "../components/CreateOrderView/CompanionBox"
const useStyles = makeStyles((theme) => ({
    root: {
            backgroundImage: `url(${backgroundPic})`,
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
    },
    pageArea: {
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
        paddingBottom: theme.spacing(10),
    }
  }));
  
function CreateOrderView(props) {
    const classes = useStyles();
    const onConfirm = () => {
        //TODO
      };

      const onRecharge = () => {
        //TODO
      };
      const onCancel = () => {
        props.history.push("/");
      };
    return (
            <ScrollContainer>
            <div className={classes.root}>
                <div className={classes.pageArea}>
                <h1>Order Details</h1>
                <OrderBox gameName="league of legends"  price = {5} balance = {20} onConfirm={onConfirm} onCancel={onCancel} onRecharge={onRecharge}>
                </OrderBox>
                
                <h1>Information about Gaming Companion</h1>
                <CompanionBox username="Tom"  age = {20} price={5} server="EU" platform="PC" >
                </CompanionBox>
                </div>
                </div>
    
       </ScrollContainer>
    );
}

export default CreateOrderView;
