import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  fontStyle: {
    fontSize: 24,
  },
}));

function EmptyPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.fontStyle}>
        Select a user to start the chat!
      </Typography>
    </div>
  );
}

export default EmptyPage;
