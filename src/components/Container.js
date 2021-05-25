import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  scrollContainerRoot: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
}));

/**
 * For having an internal scroll container
 * @param {props} props
 */
function Container(props) {
  const classes = useStyles();

  return <div className={classes.scrollContainerRoot}>{props.children}</div>;
}

export default Container;
