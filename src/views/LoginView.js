import React from "react";
import LoginComponent from "../components/LoginComponent";

function LoginView(props) {
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
    <LoginComponent
      user={null}
      onCancel={onCancel}
      onLogin={onLogin}
      onSignUp={onSignUp}
    />
  );
}

export default LoginView;
