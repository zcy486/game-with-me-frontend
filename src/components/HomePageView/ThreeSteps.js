import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
} from "@material-ui/core";

import StepIcon from "./StepIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  text: {
    paddingTop: theme.spacing(4),
    fontSize: "40px",
  },
  textLabels: {
    fontSize: "20px",
  },
}));

const StepLine = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  completed: {
    "& $line": {
      backgroundImage: theme.palette.background.stepLine,
    },
  },
  line: {
    height: 3,
    border: 0,
    borderRadius: 1,
  },
}))(StepConnector);

function ThreeSteps() {
  const classes = useStyles();

  const steps = [
    "Choose your game",
    "Find your desired companion",
    "Chat and order",
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.text}>
        All you need is three steps!
      </Typography>
      <Stepper alternativeLabel connector={<StepLine />}>
        {steps.map((label) => (
          <Step completed={true}>
            <StepLabel StepIconComponent={StepIcon}>
              <div className={classes.textLabels}>{label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default ThreeSteps;
