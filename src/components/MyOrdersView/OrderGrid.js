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
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
   
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

export default function ComplexGrid() {
  const classes = useStyles();

  return (
   
      <ButtonBase >
      <Paper className={classes.paper}>
        <Grid container xs={500} spacing={2}>
          
            <Grid item className={classes.image} align ='center'>        
                <img className={classes.img}  src="/static/images/grid/complex.jpg" />         
            </Grid>
            <Grid item xs={12} sm container spacing={10} align = 'left'>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    CompanionUsername
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Name of Game
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant="subtitle1" style={{ cursor: 'pointer' }}>
                    status
                  </Typography>
                </Grid>
              </Grid>
              <Grid item  align='right'>
                <Typography variant="subtitle1">$price</Typography>
              </Grid>
            </Grid>

          
          
          
        </Grid>
      </Paper>
      </ButtonBase>

  );
}
