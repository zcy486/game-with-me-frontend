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
    Typography,
    IconButton,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import MockAvatar from "../../images/avatar.svg";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
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
        }
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
        }
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
}));

function ProfilePage(props) {
    const classes = useStyles();

    const minAge = 0;
    const maxAge = 999;
    const [userAge, setUserAge] = React.useState("");
    const [userGender, setUserGender] = React.useState("");

    const [editMode, setEditMode] = React.useState(false);

    const [uploadImg, setUploadImg] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(MockAvatar);
    const [img, setImg] = React.useState("");

    const extractUser = () => {
        if (!props.user) {
            return;
        }
        setUserAge(props.user.age);
        setUserGender(props.user.gender);
        if (props.user.avatarUrl) {
            setImgSrc(props.user.avatarUrl);
            console.log("extract");
            console.log(imgSrc);
        } else setImgSrc(MockAvatar);

       


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
        //upload images
        if (uploadImg) {
            const formData = new FormData();
            formData.append("image", img);
            props.onUploadImg(formData);
            setUploadImg(false);
        }

     //   

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
    }

    const onDeleteImg = () => {
        setImg("");
        if (props.user.avatarUrl) {
            setImgSrc(props.user.avatarUrl);
        } else setImgSrc(MockAvatar);

        setUploadImg(false);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction={"column"}>
                    <h2 className={classes.header}>User Profile</h2>
                    <Grid container spacing={4}>
                        <Grid item>

                            <ButtonBase className={classes.image}>
                                <img className={classes.avatar} alt="avatar" src={imgSrc} />
                                {editMode ?
                                    <div>
                                        <input accept="image/*" className={classes.cameraIcon} style={{ display: "none" }} id="icon-button-file" type="file" onChange={onChangeImg} />
                                        <label htmlFor="icon-button-file">
                                            <IconButton className={classes.cameraIcon} color="secondary" aria-label="upload picture" component="span">
                                                <PhotoCameraIcon />
                                            </IconButton>
                                        </label>
                                        <IconButton className={classes.deleteIcon} color="primary" aria-label="upload picture" component="span" onClick={onDeleteImg}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </div> : null
                                }
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
                        Balance: <span>&nbsp;&nbsp;</span>
                        {props.user.balance}
                        <span>&nbsp;&nbsp;</span>
                        <ECoin />
                    </Grid>
                    <Grid className={classes.buttons}>
                        <Button
                            className={classes.secondButton}
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
                    {props.companion ? (
                        <Grid>
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
                                <Typography>{props.companion.ratings} / 5</Typography>
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
