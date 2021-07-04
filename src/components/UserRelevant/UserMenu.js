import React,{ useEffect }from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import UserService from "../../services/UserService";
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

    const [companion, setCompanion] = React.useState(null);

    useEffect(() => {
        (async () => {
            if (user.user) {
                let plusFields = await UserService.getCompanionProfile(user.user._id);
                if (Object.keys(plusFields).length > 0) {
                    setCompanion(plusFields);
                }
            }
        })();
    }, [props.history]);

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

    /*
    const onClickMyOrders = () => {
    };
    */

    const onClickCompanionOrder = () => {
        props.onClose();
        props.history.push("/companionorder/" + user.user._id);
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
                ? <div>
                    <MenuItem key={"profile"} className={classes.menuItem} onClick={onClickProfile}>
                        Profile of: {user.user.username}
                    </MenuItem>
                    <MenuItem key={"myorders"} className={classes.menuItem}>My Orders</MenuItem>
                {companion 
                ?
                    <MenuItem key={"companionOrders"} className={classes.menuItem} onClick={onClickCompanionOrder}>
                        My companion orders
                    </MenuItem>
                    
                :  null }

                    <MenuItem key={"logout"} className={classes.menuItem} onClick={onClickLogout}>
                        Logout
                    </MenuItem>
                    </div>
        
            : <div>
            <MenuItem key={"login"} className={classes.menuItem} onClick={onClickLogin}>
                Log In
            </MenuItem>
            <MenuItem key={"signup"} className={classes.menuItem} onClick={onClickSignUp}>
                Sign Up
            </MenuItem>
            </div>}
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
