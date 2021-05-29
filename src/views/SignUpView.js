import React from "react";
import SignUpComponent from "../components/SignUpComponent";

/* TODO add background
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
 */

function SignUpView(props) {
  const onRegister = (username, password) => {
    //TODO
  };

  const onCancel = () => {
    props.history.push("/");
  };

  //TODO modify props.user
  return (
    <SignUpComponent user={null} onRegister={onRegister} onCancel={onCancel} />
  );
}

export default SignUpView;
