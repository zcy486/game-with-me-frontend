import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Typography } from "@material-ui/core";

import logo from "../../images/logo.png";

const useStyles = makeStyles((theme) => ({
  loginRoot: {
    margin: "auto",
  },
  loginPaper: {
    width: "550px",
    padding: theme.spacing(3),
  },
  loginRow: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
    "&:first-child": {
      paddingTop: theme.spacing(1),
    },
  },
  loginButtons: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(6),
  },
  loginButton: {
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

function LoginComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginError, setLoginError] = React.useState("");

  useEffect(() => {
    if (props.user.error) {
      setLoginError(props.user.error);
    } else {
      setLoginError("");
    }
  }, [props.user]);

  const onLogin = (event) => {
    event.preventDefault();
    props.onLogin(username, password);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setLoginError("");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setLoginError("");
  };

  return (
    <div className={classes.loginRoot}>
      <Paper className={classes.loginPaper} component="form">
        <div className={classes.logo}>
          <img className={classes.icon} src={logo} alt={"Logo"} />
        </div>
        <Typography variant={"h4"} align={"center"}>
          Log In
        </Typography>
        <div className={classes.loginRow}>
          <TextField
            color="secondary"
            label="Username"
            fullWidth
            value={username}
            onChange={onChangeUsername}
            error={loginError !== ""}
          />
        </div>
        <div className={classes.loginRow}>
          <TextField
            color="secondary"
            label="Password"
            fullWidth
            value={password}
            onChange={onChangePassword}
            error={loginError !== ""}
            type="password"
          />
        </div>
        {loginError !== "" ? (
          <div className={classes.loginRow}>
            <Typography color="error">{loginError}</Typography>
          </div>
        ) : null}
        <div className={classes.loginButtons}>
          <Button
            onClick={props.onSignUp}
            variant={"contained"}
            color={"secondary"}
          >
            Not Registered yet?
          </Button>
          <div>
            <Button className={classes.loginButton} onClick={props.onCancel}>
              Cancel
            </Button>
            <Button
              className={classes.loginButton}
              variant="contained"
              color="primary"
              onClick={onLogin}
              disabled={username === "" || password === ""}
              type="submit"
            >
              Login
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default LoginComponent;
