import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  menuItem: {
    display: "flex",
    minWidth: "200px",
  },
}));

function UserMenu(props) {
  const classes = useStyles();

  const onClickLogin = () => {
    props.onClose();
    props.history.push("/login");
  };

  const onClickSignUp = () => {
    props.onClose();
    props.history.push("/register");
  };

  /* TODO
  const onClickLogout = () => {
  };

  const onClickProfile = () => {
  };

  const onClickMyOrders = () => {
  };
  */

  return (
    <Menu
      open={props.open}
      anchorEl={props.anchor}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MenuItem className={classes.menuItem} onClick={onClickLogin}>
        Log In
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={onClickSignUp}>
        Sign Up
      </MenuItem>
    </Menu>
  );
}

//Type checking
UserMenu.protoTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.element,
  open: PropTypes.bool.isRequired,
};

export default withRouter(UserMenu);
