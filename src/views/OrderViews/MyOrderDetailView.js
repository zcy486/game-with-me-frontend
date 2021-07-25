import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import backgroundPic from "../../images/bg_postlist.png";
import ThanksForYourOrder from "../../components/MyOrderDetailView/ThanksForYourOrder";
import DetailInfo from "../../components/MyOrderDetailView/DetailInfo";
import { connect, useSelector } from "react-redux";
import { getOrder, updateOrderStatus } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: `url(${backgroundPic})`,
    backgroundRepeat: "repeat",
    height: "100%",
  },
  content: {
    textAlign: "left",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
}));

function MyOrderDetailView(props) {
  const classes = useStyles();
  let { match } = props;

  const { order } = useSelector((state) => state.order);
  useEffect(() => {
    props.dispatch(getOrder(match.params.orderId));
  }, [match.params]);

  //update status every 3s
  useEffect(() => {
    const intervalId = setInterval(() => {
      props.dispatch(getOrder(match.params.orderId));
    },3000)
    return () => clearInterval(intervalId);
  }, [])

  const handleFinish = (status) => {
    props.dispatch(updateOrderStatus(match.params.orderId, status));
  };

  return !order ? null : (
    <div className={classes.root}>
      <div className={classes.content}>
        <ThanksForYourOrder />

        <DetailInfo
          orderId={order._id}
          companionName={order.companionName}
          companionId={order.companionId}
          gameName={order.gameName}
          gameNumber={order.gameNumber}
          price={order.orderPrice}
          status={order.orderStatus}
          handleFinish={handleFinish}
        />
      </div>
    </div>
  );
}

export default connect()(MyOrderDetailView);
