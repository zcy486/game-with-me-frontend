import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Typography } from "@material-ui/core";

import logo from "../images/logo.png";

const useStyles = makeStyles((theme) => ({
  signUpRoot: {
    margin: "auto",
  },
  signUpPaper: {
    width: "550px",
    padding: theme.spacing(3),
  },
  signUpRow: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
    "&:first-child": {
      paddingTop: theme.spacing(1),
    },
  },
  signUpButtons: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(6),
  },
  signUpButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    textAlign: "center",
  },
  icon: {
    height: "120px",
    width: "120px",
  },
}));

function SignUpComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const [registerError, setRegisterError] = React.useState("");

  useEffect(() => {
    //TODO modify the condition (remove props.user)
    if (props.user && props.user.error) {
      setRegisterError(props.user.error);
    } else {
      setRegisterError("");
    }
  }, [props.user]);

  const onRegister = (event) => {
    event.preventDefault();
    props.onRegister(username, password);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setRegisterError("");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setRegisterError("");
  };

  const onChangePassword2 = (event) => {
    setPassword2(event.target.value);
    setRegisterError("");
  };

  const onBlurPassword = () => {
    if (password !== "" && password2 !== "") {
      if (password !== password2) {
        setRegisterError("Passwords do not match.");
      } else {
        setRegisterError("");
      }
    }
  };

  return (
    <div className={classes.signUpRoot}>
      <Paper className={classes.signUpPaper} component={"form"}>
        <div className={classes.logo}>
          <img className={classes.icon} src={logo} alt={"Logo"} />
        </div>
        <Typography variant={"h4"} align={"center"}>
          Sign Up
        </Typography>
        <div className={classes.signUpRow}>
          <TextField
            color={"secondary"}
            label={"Username"}
            fullWidth
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            color={"secondary"}
            label={"Password"}
            fullWidth
            value={password}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            error={registerError !== ""}
            type={"password"}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            color={"secondary"}
            label={"Repeat Password"}
            fullWidth
            value={password2}
            onChange={onChangePassword2}
            onBlur={onBlurPassword}
            error={registerError !== ""}
            type={"password"}
          />
        </div>
        {registerError !== "" ? (
          <div className={classes.signUpRow}>
            <Typography color="error">{registerError}</Typography>
          </div>
        ) : null}
        <div className={classes.signUpButtons}>
          <Button className={classes.signUpButton} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            className={classes.signUpButton}
            variant="contained"
            color="primary"
            onClick={onRegister}
            disabled={
              username === "" ||
              password === "" ||
              password2 === "" ||
              registerError !== "" ||
              password !== password2
            }
            type="submit"
          >
            Register
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpComponent;
