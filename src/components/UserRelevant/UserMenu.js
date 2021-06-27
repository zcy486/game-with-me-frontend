import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";

import { logout } from "../../redux/actions";

const useStyles = makeStyles(() => ({
  menuItem: {
    display: "flex",
    minWidth: "200px",
  },
}));

function UserMenu(props) {
  const classes = useStyles();

  const user = useSelector((state) => {
    // return the currnetly logged in user from redux store
    return state.user;
  });
  
  const onClickLogin = () => {
    props.onClose();
    props.history.push("/login");
  };

  const onClickSignUp = () => {
    props.onClose();
    props.history.push("/register");
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());
    // close this menu
    props.onClose();
    // navigate to the home page
    props.history.push("/");
  };

  const onClickProfile = () => {
    props.onClose();
    props.history.push("/profile");
  };

 
  const onClickMyOrders = () => {
    props.onClose();
    props.history.push(`/myOrders/${user["_id"]}`);
  };
 

  return (
    <Menu
      open={props.open}
      anchorEl={props.anchor}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {user.user
        ? [
            <MenuItem key={"profile"} className={classes.menuItem} onClick={onClickProfile}>
              Profile of: {user.user.username}
            </MenuItem>,
            <MenuItem key={"myorders"} className={classes.menuItem} onClick={onClickMyOrders}>My Orders</MenuItem>,
            <MenuItem key={"logout"} className={classes.menuItem} onClick={onClickLogout}>
              Logout
            </MenuItem>,
          ]
        : [
            <MenuItem key={"login"} className={classes.menuItem} onClick={onClickLogin}>
              Log In
            </MenuItem>,
            <MenuItem key={"signup"} className={classes.menuItem} onClick={onClickSignUp}>
              Sign Up
            </MenuItem>,
          ]}
    </Menu>
  );
}

//Type checking
UserMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(UserMenu));
