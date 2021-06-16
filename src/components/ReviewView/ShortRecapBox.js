import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarShowRating from '../../components/StarShowRating';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: theme.spacing(150),
    height: theme.spacing(30),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    width: 128,
    height: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
 //   <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={10}>
          <Grid item>
              <img className={classes.img} alt="avatar" src="logo" />
          </Grid>
          <Grid item xs={12} sm container direction ="row"  spacing={10}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography>
                  Tom
                </Typography>           
              </Grid>
              <Grid item xs>
                <Typography >
                  ID:123
                </Typography>            
              </Grid>             
            </Grid>
            <Grid item >
              <StarShowRating/>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
//    </div>
  );
}
