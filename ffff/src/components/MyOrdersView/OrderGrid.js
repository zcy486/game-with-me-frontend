import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ECoin from "../ECoin";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 840,
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
   
  },
  paperContent: {
    display: "flex", },
  image: {
    width: 128,
    height: 128,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    padding: theme.spacing(1),
  },
  paperColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
},
placeHolder: {
    flexGrow: 1,
},
priceInfo: {
    display: "flex",
    alignItems: "center",
},
dateInfo: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "green",
},
}));

export default function OrderGrid(props) {
  const classes = useStyles();
  const onClick = (event) => {
    event.preventDefault();
    props.onClick(props.order._id);
  }
  return (
   
      <ButtonBase 
        onClick={onClick}
      >
      <Paper className={classes.paper}>
        <Grid container xs={500} spacing={2}>
          
            <Grid item className={classes.image} align ='center'>        
                <img className={classes.img}  alt="avatar" src={props.avatarUrl} />         
            </Grid>
            <Grid className={classes.paperColumn}>
                        <Typography>{props.companionName}</Typography>

                        <Grid className={classes.priceInfo}>
                            {props.gameName}
                            <span>&nbsp;</span>

                        </Grid>
                        <Grid className={classes.priceInfo}>
                            {props.orderPrice}
                            <span>&nbsp;</span>
                            <ECoin />
                            <span>&nbsp;</span> 
                        </Grid>
                    </Grid>
                    <Grid className={classes.placeHolder} />
                    <Grid className={classes.paperColumn}>
                        <Grid className={classes.dateInfo}>

                            <Typography>{props.createdAt}</Typography>
                        </Grid>
                       
                            <Grid item>
                           {props.orderStatus}
                           </Grid>
          </Grid>
 {/*            <Grid item xs={12} sm container spacing={10} align = 'left'>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item >
                  <Typography  variant="subtitle1">
                    {props.companionName}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {props.gameName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {props.createdAt}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant="subtitle1" style={{ cursor: 'pointer' }}>
                    {props.orderStatus}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="row" align='right'>
                
                  {props.orderPrice}<span>&nbsp;</span>
              <ECoin />
              </Grid>
           
            </Grid> */}
        </Grid>
      </Paper>
      </ButtonBase>

  );
}
