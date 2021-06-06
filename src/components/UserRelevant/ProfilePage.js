import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Divider, ButtonBase, Button } from "@material-ui/core";

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
  withdrawButton: {
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
}));

function ProfilePage(props) {
  const classes = useStyles();

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
              <Grid item> Username: {props.username} </Grid>
              <Grid item>
                {" "}
                Age: {props.age === -1 ? "not given" : props.age}{" "}
              </Grid>
              <Grid item> Gender: {props.gender} </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttons}>
            <Button variant={"contained"} color={"secondary"} size={"small"}>
              Edit Profile
            </Button>
          </Grid>
          <Divider />
          <h2 className={classes.headerInner}>My Wallet</h2>
          <Grid className={classes.balanceArea}>
            Balance: <ECoin />
          </Grid>
          <Grid className={classes.buttons}>
            <Button
              className={classes.withdrawButton}
              variant={"outlined"}
              size={"small"}
            >
              Withdraw
            </Button>
            <Button variant={"contained"} color={"secondary"} size={"small"}>
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
              <Button variant={"contained"} color={"secondary"} size={"small"}>
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
