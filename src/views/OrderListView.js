import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ScrollContainer from "../components/ScrollContainer";
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import OrderGrid from "../components/MyOrdersView/OrderGrid";
import backgroundPic from "../images/bg_postlist.png";
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

export default function OrderListView() {
  const classes = useStyles();

  
  return (
     <div className={classes.root}>     
        <div className={classes.content}>
         <h1 className={classes.yourOrders} >
            My Orders
          </h1>
         
          <OrderGrid/> 
        </div>      
    </div> 
  );
}
