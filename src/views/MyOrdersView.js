import { makeStyles } from "@material-ui/core/styles";
import OrderList2 from "../components/MyOrdersView/OrderList2";
import { FixedSizeList } from "react-window";
import backgroundPic from "../images/bg_postlist.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: `url(${backgroundPic})`,
    backgroundRepeat: "repeat",
  },
 
  content: {
    textAlign: "right",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  gameTitle: {
    fontSize: "40px",
    fontFamily: "Helvetica",
  },
  placeHolder: {
    flexGrow: 1,
  },
}));

function renderRow(props) {
  const { style } = props;

  return (
    <ListItem button style={style} >
      <OrderGrid />
    </ListItem>
  );
}
renderRow.propTypes = {
  //index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function OrderListView() {
  const classes = useStyles();

  
  return (
    <div className={classes.root}>

        <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
        <OrderList2/>
      </FixedSizeList>
    </div>
  );
}

export default OrderListView;


/*const MyOrdersView = ({ image, username, game, date}) => {
    
}*/