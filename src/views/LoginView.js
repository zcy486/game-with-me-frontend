import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoginComponent from "../components/UserRelevant/LoginComponent";

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

  const onLogin = (username, password) => {
    //TODO
    //props.dispatch(login(username, password));
  };

  const onCancel = () => {
    props.history.push("/");
  };

  const onSignUp = () => {
    props.history.push("/register");
  };
  //TODO modify props.user
  return (
    <div className={classes.root}>
      <LoginComponent
        user={null}
        onCancel={onCancel}
        onLogin={onLogin}
        onSignUp={onSignUp}
      />
    </div>
  );
}

export default LoginView;
