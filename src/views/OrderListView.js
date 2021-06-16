import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import OrderGrid from "../components/MyOrdersView/OrderGrid";
import backgroundPic from "../images/bg_postlist.png";

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
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <OrderGrid/>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={800} width={570} itemSize={200} itemCount={200}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}