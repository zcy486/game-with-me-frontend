import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Divider,
  ButtonBase,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

import MockAvatar from "../../images/avatar.svg";
import ECoin from "../ECoin";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  paper: {
    width: "800px",
    padding: theme.spacing(4),
    marginBottom: theme.spacing(5),
    fontSize: 16,
  },
  header: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(4),
  },
  headerInner: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  image: {
    width: 128,
    height: 128,
  },
  avatar: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  balanceArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  secondButton: {
    marginRight: theme.spacing(3),
  },
  centerArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  centerRow: {
    margin: theme.spacing(2),
  },
  inputBase: {
    padding: theme.spacing(0.3),
    color: "inherit !important",
  },
  input: {
    padding: theme.spacing(0),
    textAlign: "left",
  },
}));

function ProfilePage(props) {
  const classes = useStyles();

  const minAge = 0;
  const maxAge = 999;
  const [userAge, setUserAge] = React.useState("");
  const [userGender, setUserGender] = React.useState("");

  const [editMode, setEditMode] = React.useState(false);

  const extractUser = () => {
    if (!props.user) {
      return;
    }

    setUserAge(props.user.age);
    setUserGender(props.user.gender);
  };

  const packUser = () => {
    let back = {
      ...props.user,
    };

    back.age = userAge;
    back.gender = userGender;

    return back;
  };

  // triggers when the new parameter is changed
  useEffect(() => {
    extractUser();
  }, [props.user]);

  const onChangeUserAge = (event) => {
    const newAge = Math.round(
      Math.min(Math.max(event.target.value, minAge), maxAge)
    );
    setUserAge(String(newAge));
  };

  const onChangeUserGender = (event) => {
    
    setUserGender(event.target.value);
  };

  const onCancel = () => {
    setEditMode(false);
    extractUser();
  };

  const onSave = () => {
    setEditMode(false);
    props.onSave(packUser());
  };
  
  const clickCreate = () =>{
    props.clickCreate();
  };

  const onRecharge = () => {
      props.onRecharge();
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction={"column"}>
          <h2 className={classes.header}>User Profile</h2>
          <Grid container spacing={4}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.avatar} alt="avatar" src={MockAvatar} />
              </ButtonBase>
            </Grid>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item>Username: {props.user.username}</Grid>
              <Grid item>
                Age:{" "}
                <TextField
                  value={userAge}
                  type={"number"}
                  color={"secondary"}
                  onChange={onChangeUserAge}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "standard"}
                  InputProps={
                    editMode
                      ? {
                          className: classes.inputBase,
                        }
                      : {
                          className: classes.inputBase,
                          disableUnderline: true,
                        }
                  }
                  inputProps={{
                    className: classes.input,
                  }}
                />
              </Grid>
              <Grid item>
                Gender:{" "}
                {editMode
                  ? [
                      <Select
                        value={userGender}
                        color={"secondary"}
                        onChange={onChangeUserGender}
                      >
                        <MenuItem value={"male"}>male</MenuItem>
                        <MenuItem value={"female"}>female</MenuItem>
                        <MenuItem value={"other"}>other</MenuItem>
                        <MenuItem value={"not given"}>not given</MenuItem>
                      </Select>,
                    ]
                  : [`${userGender}`]}
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttons}>
            {editMode
              ? [
                  <Button
                    className={classes.secondButton}
                    onClick={onCancel}
                    variant={"outlined"}
                    size={"small"}
                  >
                    Cancel
                  </Button>,
                  <Button
                    onClick={onSave}
                    variant={"contained"}
                    color={"secondary"}
                    size={"small"}
                  >
                    Save
                  </Button>,
                ]
              : [
                  <Button
                    onClick={(e) => setEditMode(true)}
                    variant={"contained"}
                    color={"secondary"}
                    size={"small"}
                  >
                    Edit Profile
                  </Button>,
                ]}
          </Grid>
          <Divider />
          <h2 className={classes.headerInner}>My Wallet</h2>
          <Grid className={classes.balanceArea}>
            Balance: {props.user.balance}<ECoin />
          </Grid>
          <Grid className={classes.buttons}>
            <Button
              className={classes.secondButton}
              variant={"outlined"}
              size={"small"}
            >
              Withdraw
            </Button>
            <Button variant={"contained"} color={"secondary"} size={"small"} onClick={onRecharge}>
              Charge
            </Button>
          </Grid>
          <Divider />
          <h2 className={classes.headerInner}>Companion Profile</h2>
          {}
          <Grid className={classes.centerArea}>
            <Grid className={classes.centerRow}>
              Create your first post to become a companion!
            </Grid>
            <Grid className={classes.centerRow}>
              <Button variant={"contained"} color={"secondary"} size={"small"} onClick={clickCreate}>
                Create Post
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProfilePage;
