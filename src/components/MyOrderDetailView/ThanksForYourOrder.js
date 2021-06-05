import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 800,
  },
});

function ThanksForYourOrder() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
      <Typography variant="h3" gutterBottom>
        Thanks for your Order!
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        Please wait patiently for your gaming companion to confirm the order. The following is your order information.
      </Typography>
      
    </div>
  );
}
export default ThanksForYourOrder;