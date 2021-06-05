import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  submit: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',

    border: 0,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
 
};

function UnstyledComponent(props) {
  const { classes } = props;
  return <Button className={classes.submit}>Submit</Button>;
     
  
}



export default withStyles(styles)(UnstyledComponent);