import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Select,
  TextField,
  InputLabel,
  Grid,
  Divider,
  ButtonBase,
  Button,
  MenuItem,
  Typography,
  IconButton,
  FormControl,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import MockAvatar from "../../images/avatar.svg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import ECoin from "../ECoin";
import UserService from "../../services/UserService";
import ListItemIcon from "@material-ui/core/ListItemIcon";

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
    maxWidth: "90%",
    maxHeight: "90%",
  },
  cameraIcon: {
    position: "absolute",
    bottom: "0",
    height: "32px",
    width: "32px",
    right: "0px",
    borderRadius: "50%",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  deleteIcon: {
    position: "absolute",
    bottom: "0",
    height: "32px",
    width: "32px",
    left: "0px",
    borderRadius: "50%",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
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
  companionRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  onlineStatus: {
    minWidth: 120,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
}));

function ProfilePage(props) {
  const classes = useStyles();

  const [editMode, setEditMode] = React.useState(false);

  const minAge = 0;
  const maxAge = 999;
  const [userAge, setUserAge] = React.useState("");
  const [userGender, setUserGender] = React.useState("");
  const [uploadImg, setUploadImg] = React.useState(false);
  const [deleteImg, setDeleteImg] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(MockAvatar);
  const [img, setImg] = React.useState("");
  const [status, setStatus] = React.useState("");

  const extractUser = () => {
    if (!props.user) {
      return;
    }
    setUserAge(props.user.age);
    setUserGender(props.user.gender);
    if (props.user.avatarUrl) {
      setImgSrc(props.user.avatarUrl);
    } else {
      setImgSrc(MockAvatar);
    }
    if (props.companion) {
      setStatus(props.companion.onlineStatus);
    }
  };

  const packUser = () => {
    let back = {
      ...props.user,
    };

    back.age = userAge;
    back.gender = userGender;
    if (deleteImg) {
      back.avatarUrl = null;
      setDeleteImg(false);
    }
    return back;
  };

  // triggers when the new parameter is changed
  useEffect(() => {
    extractUser();
  }, [props.user, props.companion]);

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
    //upload images
    if (uploadImg) {
      const formData = new FormData();
      formData.append("image", img);
      props.onUploadImg(formData);
      setUploadImg(false);
    }
  };

  const clickCreate = () => {
    props.clickCreate();
  };

  const onChangeImg = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setImg(file);
    setImgSrc(url);
    setUploadImg(true);
  };

  const onDeleteImg = () => {
    setImg("");
    if (props.user.avatarUrl) {
      if (imgSrc === props.user.avatarUrl || imgSrc === MockAvatar) {
        setImgSrc(MockAvatar);
        setDeleteImg(true);
        props.onDeleteImg();
      } else {
        setImgSrc(props.user.avatarUrl);
      }
    } else setImgSrc(MockAvatar);

    setUploadImg(false);
  };

  const onRecharge = () => {
    props.onRecharge();
  };

  const onWithdraw = () => {
    props.onWithdraw();
  };

  const onChangeStatus = async (event) => {
    if (props.companion) {
      const newStatus = event.target.value;
      setStatus(newStatus);
      await UserService.updateCompanionStatus(props.user._id, newStatus);
    }
  };

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const online = { backgroundColor: "#56d243" };
  const offline = { backgroundColor: "#bbbbbb" };
  const busy = { backgroundColor: "#fc7303" };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction={"column"}>
          <h2 className={classes.header}>User Profile</h2>
          <Grid container spacing={4}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.avatar} alt="avatar" src={imgSrc} />
                {editMode ? (
                  <div>
                    <input
                      accept="image/*"
                      className={classes.cameraIcon}
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      onChange={onChangeImg}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        className={classes.cameraIcon}
                        color="secondary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </label>
                    <IconButton
                      className={classes.deleteIcon}
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={onDeleteImg}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ) : null}
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
                {editMode ? (
                  <Select
                    value={userGender}
                    color={"secondary"}
                    onChange={onChangeUserGender}
                  >
                    <MenuItem value={"male"}>male</MenuItem>
                    <MenuItem value={"female"}>female</MenuItem>
                    <MenuItem value={"other"}>other</MenuItem>
                    <MenuItem value={"not given"}>not given</MenuItem>
                  </Select>
                ) : (
                  `${userGender}`
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttons}>
            {editMode
              ? [
                  <Button
                    key={"cancel"}
                    className={classes.secondButton}
                    onClick={onCancel}
                    variant={"outlined"}
                    size={"small"}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key={"save"}
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
                    key={"edit"}
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
            Balance: {props.user.balance}
            <span>&nbsp;&nbsp;</span>
            <ECoin />
          </Grid>
          <Grid className={classes.buttons}>
            <Button
              className={classes.secondButton}
              variant={"contained"}
              color={"primary"}
              size={"small"}
              onClick={onWithdraw}
            >
              Withdraw
            </Button>
            <Button
              variant={"contained"}
              color={"secondary"}
              size={"small"}
              onClick={onRecharge}
            >
              Charge
            </Button>
          </Grid>

          <Divider />
          <h2 className={classes.headerInner}>Companion Profile</h2>
          {props.companion ? (
            <Grid>
              <div className={classes.companionRow}>
                <FormControl
                  className={classes.onlineStatus}
                  variant="outlined"
                  color={"secondary"}
                >
                  <InputLabel id={"status-label"}>OnlineStatus</InputLabel>
                  <Select
                    value={status}
                    onChange={onChangeStatus}
                    labelId={"status-label"}
                    label={"OnlineStatus"}
                  >
                    <StyledMenuItem value={"Online"}>
                      Online<span>&nbsp;&nbsp;</span>
                      <ListItemIcon>
                        <span className={classes.circle} style={online} />
                      </ListItemIcon>
                    </StyledMenuItem>
                    <StyledMenuItem value={"Offline"}>
                      Offline<span>&nbsp;&nbsp;</span>
                      <ListItemIcon>
                        <span className={classes.circle} style={offline} />
                      </ListItemIcon>
                    </StyledMenuItem>
                    <StyledMenuItem value={"Busy"}>
                      Busy<span>&nbsp;&nbsp;</span>
                      <ListItemIcon>
                        <span className={classes.circle} style={busy} />
                      </ListItemIcon>
                    </StyledMenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.companionRow}>
                <Typography>Served: {props.companion.orderNumber}</Typography>
              </div>
              <div className={classes.companionRow}>
                <Typography>Ratings:</Typography>
                <Rating
                  value={props.companion.ratings ? props.companion.ratings : 0}
                  precision={0.1}
                  readOnly
                />
                <Typography>
                  {typeof props.companion.ratings === "number" &&
                    props.companion.ratings.toFixed(1)}{" "}
                  / 5.0
                </Typography>
              </div>
              <Grid className={classes.centerArea}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  size={"small"}
                  onClick={clickCreate}
                >
                  Create Post
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid className={classes.centerArea}>
              <Grid className={classes.centerRow}>
                Create your first post to become a companion!
              </Grid>
              <Grid className={classes.centerRow}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  size={"small"}
                  onClick={clickCreate}
                >
                  Create Post
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}

export default ProfilePage;
