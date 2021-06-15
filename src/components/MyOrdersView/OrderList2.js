import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import logo from "../../images/logo.png";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import OrderGrid from "../MyOrdersView/OrderGrid";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 800,
        height: 'auto',
      },
 
  image: {
    width:300,
    height: 300,
  },
  img: {
    width: 700,
    height: 350,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function MyOrdersView(props) {
  const classes = useStyles();

  return (//from database get the information of orders
    <div className={classes.root}>
        <GridList cellHeight={20} className={classes.gridList}>
          <GridListTile key="Header" cols={2} style={{ height: 'auto' }}>
            
           
                    <OrderGrid />
                    --TODO--

          </GridListTile>
        </GridList>
    </div>

  )
  }
export default MyOrdersView;