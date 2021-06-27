import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    //margin: 'auto',
    //maxWidth: 1000,
    width: 840,
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
   
  },
  image: {
    width: 180,
    height: 180,
  },
  img: {
    width:700,
    
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function OrderGrid(props) {
  const classes = useStyles();
  const onClick = (event) => {
    event.preventDefault();
    props.onClick(props.order_id);
  }
  return (
   
      <ButtonBase 
        onClick={onClick}
      >
      <Paper className={classes.paper}>
        <Grid container xs={500} spacing={2}>
          
            <Grid item className={classes.image} align ='center'>        
                <img className={classes.img}  alt="avatar" src={props.avatar} />         
            </Grid>
            <Grid item xs={12} sm container spacing={10} align = 'left'>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {props.companionId}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    game's name
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
              <Grid item  align='right'>
                <Typography variant="subtitle1">{props.orderPrice}</Typography>
              </Grid>
            </Grid>
        </Grid>
      </Paper>
      </ButtonBase>

  );
}
