import React, { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import OrderGrid from "../../components/MyOrdersView/OrderGrid";
import backgroundPic from "../../images/bg_postlist.png";
import { connect, useSelector } from "react-redux";
import { getOrderByGamerId } from "../../redux/actions";
import MockAvatar from "../../images/avatar.svg";
import noOrderImage from "../../images/oops.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: `url(${backgroundPic})`,
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
  },
  content: {
    width: 1500,
    textAlign: "left",
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    paddingBottom: theme.spacing(10),  
  },
  yourOrders: {
    fontSize: "40px",
    fontFamily: "Helvetica",
    paddingBottom: theme.spacing(8),
  },
  noOrder: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
},
noOrderImage: {
  marginTop: theme.spacing(5),
  maxWidth: "250px",
  maxHeight: "250px",
},
panination: {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(10),
},
  noOrderTitle: {
    fontSize: "xx-large",
    fontFamily: "Helvetica",
    fontWeight: "bolder",
    color: "#8271DD",
    marginBottom: theme.spacing(1),
  },
}));

function OrderListView(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [page, setPage] = React.useState(1);

  const {orderlist} = useSelector((state) => state.order);
  
  let { match } = props;

  useEffect(() => {
    if(!user){
      props.history.push("/login");
    }
    if(match.params.gamerId != user.user._id) {
        props.history.push("/notfound")
    }
    //getOrderList();
    const gamerId = user.user._id.toString();
    props.dispatch(getOrderByGamerId(gamerId));
  }, [user]);

  const onClickOrder = (orderId) => {
    const orderRoute = "/myOrders/gamerId/" + match.params.gamerId +"/details/" + orderId;
    props.history.push(orderRoute);
  };
  const onChangePage = (event, page) => {
    setPage(page);
};
const onClickRefresh = () =>{
  window.location.reload();
}
  return (
     <div className={classes.root}>     
        <div className={classes.content}>
         <div className={classes.yourOrders}>
            My Orders
          </div>
          {orderlist && 
            orderlist.sort((a, b) => true ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                        ?
                        orderlist.slice((page - 1) * 3, page * 3).map((order,k) => {
                          
              return (
                <OrderGrid key={k}
                  avatarUrl={order.avatar? order.avatar : MockAvatar}
                  companionName={order.companionName}
                  gameName={order.gameName}
                  createdAt={order.createdAt}
                  orderStatus={order.orderStatus}
                  orderPrice={order.orderPrice} 
                  onClick={onClickOrder}

                  order={order}
                />
             
                
              )
            }) : null}
            {orderlist && orderlist.length !== 0 ? (
                <Pagination className={classes.panination}
                    count={Math.ceil(orderlist ? orderlist.length / 3 : 0)}
                    shape="rounded"
                    color="secondary"
                    onChange={onChangePage}
                />
            ) : (
                <div className={classes.noOrder}>
                    <img
                        src={noOrderImage}
                        className={classes.noOrderImage}
                    />
                    <div className={classes.noOrderTitle}>No orders here yet</div>
                    <Button variant={"contained"} color={"secondary"} onClick={onClickRefresh}> Refresh page</Button>
                </div>
            )}
         
        </div>      
    </div> 
  );
}

export default connect(/* null, {getOrderByGamerId} */)(OrderListView);