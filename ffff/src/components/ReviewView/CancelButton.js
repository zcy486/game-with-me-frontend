import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";


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

function Cancel(props) {
  const { classes } = props;
  const onCancel = () => {
    //props.onClose();
    props.history.push('/');
  };
  return(
    <Button className={classes.cancel} onClick={onCancel}>
      Cancel
    </Button>)
}
Cancel.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.element,
  open: PropTypes.bool.isRequired,
};



export default withRouter (withStyles(styles)(Cancel));