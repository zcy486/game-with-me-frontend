import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getOrder } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Order has been placed",
    "Waiting for your companion's confirmation",
    "Order is completed by your companion",
    "Complete by your order and give a review",
  ];
}

function OrderStatus({
  confirmStatus,
  history,
  handleFinish,
  match,
  dispatch,
}) {
  const classes = useStyles();
  const statusEnums = [
    "Created",
    "Confirmed",
    "CompletedByCompanion",
    "CompletedByGamer",
  ];
  const [activeStep, setActiveStep] = React.useState(
    statusEnums.findIndex((elem) => elem === confirmStatus)
  );
  const steps = getSteps();

  useEffect(() => {
    setActiveStep(statusEnums.findIndex((elem) => elem === confirmStatus));
  }, [confirmStatus]);

  /*   const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const  finishOrder= () => {
    history.push("/orderDetails/review");
  }; */

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={activeStep === 0 || activeStep === 1}
              onClick={() => {
                handleFinish("CompletedByGamer");
                dispatch(getOrder(match.params.orderId));
              }}
            >
              Finish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
OrderStatus.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.element,
  open: PropTypes.bool.isRequired,
};
export default connect()(withRouter(OrderStatus));
