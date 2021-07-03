import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ScrollContainer from "../components/ScrollContainer";
import ListItemText from '@material-ui/core/ListItemText';
import OrderGrid from "../components/MyOrdersView/OrderGrid";
import backgroundPic from "../images/bg_postlist.png";
import { connect, useSelector } from "react-redux";
import { getOrderByGamerId } from "../redux/actions";
import MockAvatar from "../images/avatar.svg";

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row", 
    //width: 2000,
    //height: 1000,
    //maxWidth: 3000,
    background: `url(${backgroundPic})`,
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
  },
  content: {
    width: 1000,
    textAlign: "right",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),  
  },
  yourOrders: {
    fontSize: "40px",
    fontFamily: "Helvetica",
  },
}));

/*function OrderListView(props) {
  const { index, style } = props;
  let { match } = props;
  
  useEffect(() => {
    let id = match.params.id;
    props.getOrder(id);
  }, [match.params.id]);

  const onClickOrder = (id) => {
    const orderRoute = "/myorders/" + match.params.orderId + "/orderDetails/" + id;
    props.history.push(orderRoute);
  };

  return (
    <ListItem button style={style} key={index}>
      <OrderGrid onClick={onClickOrder}/>
    </ListItem>
  );
}*/

function OrderListView(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

/*   const getOrderList = () =>{
    props.dispatch(getOrderByGamerId());
  }; */
  const {orderlist} = useSelector((state) => state.order);
  let { match } = props;

  useEffect(() => {
    if(!user){
      props.history.push("/login");
    }
    //getOrderList();
    const gamerId = user.user._id.toString();
    props.dispatch(getOrderByGamerId(gamerId));
  }, [user]);

/*   useEffect(() =>{
    console.log(order.orderlist);
  },[order] ); */
  const onClickOrder = (orderId) => {
    const orderRoute = "/myOrders" + "/details/" + orderId;
    props.history.push(orderRoute);
  };
  return (
     <div className={classes.root}>     
        <div className={classes.content}>
         <h1 className={classes.yourOrders} >
            My Orders
          </h1>
          {orderlist && orderlist.map((order,k) => {
              return (
                <OrderGrid key={k}
                  avatar={MockAvatar}
                  companionId={order.companionName}
/*                   gameName={order.name}
 */                  createdAt={order.createdAt}
                  orderStatus={order.orderStatus}
                  orderPrice={order.orderPrice} 
                  onClick={onClickOrder}

                  order_id={order._id}
                />
             
                
              );
            })}
         
        </div>      
    </div> 
  );
}

export default connect(/* null, {getOrderByGamerId} */)(OrderListView);