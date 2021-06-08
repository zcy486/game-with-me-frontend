import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import SignUpComponent from "../../components/UserRelevant/SignUpComponent";
import { register } from "../../redux/actions";
import backgroundPic from "../../images/bg_postlist.png";

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

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      props.history.push("/");
    }
  }, [user, props.history]);

  const onRegister = (username, password) => {
    props.dispatch(register(username, password));
  };

  const onCancel = () => {
    props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <SignUpComponent
        user={user}
        onRegister={onRegister}
        onCancel={onCancel}
      />
    </div>
  );
}

export default connect()(SignUpView);
