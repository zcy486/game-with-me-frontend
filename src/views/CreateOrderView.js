import { makeStyles } from "@material-ui/core/styles";
import React ,{ useEffect }from "react";
import ScrollContainer from "../components/ScrollContainer";
import backgroundPic from "../images/bg_postlist.png";
import OrderBox from "../components/CreateOrderView/OrderBox";
import CompanionBox from "../components/CreateOrderView/CompanionBox";
import { createOrder } from "../redux/actions";
import { connect, useSelector } from "react-redux";


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
  },
}));

function CreateOrderView(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  

  const onConfirm = (price, companionId, gamerId) => {
    props.dispatch(createOrder(price, companionId, gamerId));
    //TODO: change that to my order page!
    props.history.push("/");
  };

  const onRecharge = () => {
    //TODO
  };
  const onCancel = () => {
    props.history.push(window.location.pathname.replace("/order",""));
  };


  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <h1>Order Details</h1>
          <OrderBox
            gameName="league of legends"
            order={order.order}
            user={user.user}
            price={5}
            balance={20}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onRecharge={onRecharge}
          />

          <h1>Information about Gaming Companion</h1>
          <CompanionBox
            username="u"
            age={20}
            price={5}
            server="EU"
            platform="PC"
          />
        </div>
      </div>
    </ScrollContainer>
  );
}

export default connect()(CreateOrderView);
