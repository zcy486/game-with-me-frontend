import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import FaceIcon from "@material-ui/icons/Face";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: theme.palette.background.stepIcon,
    zIndex: 1,
    //color of the images
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function StepIcon(props) {
  const classes = useStyles();

  const icons = {
    1: <SportsEsportsIcon />,
    2: <FaceIcon />,
    3: <ChatIcon />,
  };

  return (
    <div className={classes.root}>
      {icons[String(props.icon)]}
    </div>
  );
}

export default StepIcon;
