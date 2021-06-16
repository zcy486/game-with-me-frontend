import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  cancel: {
    background: 'linear-gradient( 45deg, #FE6B8B 30%, #FF8E53 90%)',
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
  return <Button className={classes.cancel}>Cancel</Button>;
}



export default withStyles(styles)(UnstyledComponent);