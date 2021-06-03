import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import logo from "../../images/logo_gif.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  contentLeft: {
    width: "33.33%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
  textLeft: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    "&:last-child": {
      paddingBottom: theme.spacing(3),
    },
    "&:first-child": {
      paddingTop: theme.spacing(3),
    },
    fontSize: "40px",
    fontFamily: theme.typography.fontFamily.intro,
  },
  contentRight: {
    width: "33.33%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(4),
  },
  textRight: {
    fontSize: "55px",
    fontFamily: theme.typography.fontFamily.intro,
  },
  contentMiddle: {
    width: "33.33%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  logo: {
    height: "300px",
    width: "300px",
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));

function IntroBlock() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.contentLeft}>
        <Typography className={classes.textLeft}>WANNA RANK UP?</Typography>
        <Typography className={classes.textLeft}>
          STILL GAMING ALONE?
        </Typography>
        <Typography className={classes.textLeft}>
          SEEKING FOR SKILLED TEAMMATES?
        </Typography>
      </div>
      <div className={classes.contentMiddle}>
        <img className={classes.logo} src={logo} alt={"Logo"} />
        <Button
          className={classes.button}
          variant={"contained"}
          color={"secondary"}
          size={"large"}
        >
          Get started
        </Button>
      </div>
      <div className={classes.contentRight}>
        <Typography className={classes.textRight}>
          FIND YOUR GAMING COMPANION ON GAMEWITHME!
        </Typography>
      </div>
    </div>
  );
}

export default IntroBlock;
