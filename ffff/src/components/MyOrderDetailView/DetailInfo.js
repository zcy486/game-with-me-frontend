import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import OrderStatus from "../../components/MyOrderDetailView/OrderStatus";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function DetailInfo(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  const createView = () => {
    //props.onClose();
    props.history.push("/orderDetails/review/"+ props.companionId);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          align="center"
          color="textSecondary"
          gutterBottom
        >
          ----------GAME WITH ME----------
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Order-Number:&nbsp;{props.orderId}
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Companion:&nbsp;{props.companionName}
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Game:&nbsp;{props.gameName}
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Game amount:&nbsp;{props.gameNumber}
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Total price:&nbsp;{props.price}
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Order Status:&nbsp;{props.status}
          <OrderStatus
            handleFinish={props.handleFinish}
            confirmStatus = {props.status}
          />
        </Typography>
   {/*      <Typography className={classes.pos} color="textSecondary">
          The order will be confirmed by your companion in 15 minutes, otherwise
          the order would be canceled and the e-coins would be transferred back.
          <br />
          You can also cancel the order at yourside whenever during the 15mins.
        </Typography>
        <Typography variant="body2" component="p">
            You can also find your order information from your user profile. 
          <br />
          Hope you have a good time in your games!!!
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button
              variant={"contained"}
              color={"secondary"}
              size={"large"}
              
              disabled={
                  //status is finish
                  props.status !== "CompletedByGamer"
              }
              onClick={createView} size="big" color ="secondary">
          Create review
        </Button>
      </CardActions>
    </Card>
  );
}
DetailInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.element,
  open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(DetailInfo));