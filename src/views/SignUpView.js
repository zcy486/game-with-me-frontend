import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SignUpComponent from "../components/UserRelevant/SignUpComponent";

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

function SignUpView(props) {
  const classes = useStyles();

  const onRegister = (username, password) => {
    //TODO
  };

  const onCancel = () => {
    props.history.push("/");
  };

  //TODO modify props.user
  return (
    <div className={classes.root}>
      <SignUpComponent
        user={null}
        onRegister={onRegister}
        onCancel={onCancel}
      />
    </div>
  );
}

export default SignUpView;
