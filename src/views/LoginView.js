import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import LoginComponent from "../components/UserRelevant/LoginComponent";
import { login } from "../redux/actions";
import backgroundPic from "../images/bg_postlist.png";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${backgroundPic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function LoginView(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      props.history.push("/");
    }
  }, [user, props.history]);

  const onLogin = (username, password) => {
    props.dispatch(login(username, password));
  };

  const onCancel = () => {
    props.history.push("/");
  };

  const onSignUp = () => {
    props.history.push("/register");
  };

  return (
    <div className={classes.root}>
      <LoginComponent
        user={user}
        onCancel={onCancel}
        onLogin={onLogin}
        onSignUp={onSignUp}
      />
    </div>
  );
}

export default connect()(LoginView);
