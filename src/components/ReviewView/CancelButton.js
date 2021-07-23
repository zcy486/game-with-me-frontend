import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const styles = {
  cancel: {
    background: "linear-gradient( 45deg, #ffffff 30%, #ffffff 90%)",
    borderRadius: 5,
    height: 40,
    padding: "0 30px",
  },
};

function Cancel(props) {
  const { classes } = props;
  const onCancel = () => {
    props.history.push("/");
  };
  return (
    <Button variant="outlined" className={classes.cancel} onClick={onCancel}>
      Cancel
    </Button>
  );
}
Cancel.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.element,
  open: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles)(Cancel));
