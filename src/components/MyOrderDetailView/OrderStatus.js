import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  return ['Order has been placed', 'Waiting for your companion\'s confirmation',
   'Order is completed by your companion','Complete by your order and give a review'];
}

/*function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Order has been placed';
    case 1:
      return 'Waiting for your companion\'s confirmation';
    case 2:
      return 'Order is completed by your companion';
    case 3:
      return 'Complete by your order and give a review';
    default:
      return 'Unknown stepIndex';
  }
}*/

export default function OrderStatus(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createView = () => {
    //props.onClose();
    props.history.push("/orderDetails/review");
  };

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
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button disabled={activeStep === 0 && activeStep === 1&&activeStep === 2}>
              Create review
            </Button>
          </div>
        ) : (
          <div>
            
              <Button
                disabled={
                  activeStep === 0 || activeStep === 1 || activeStep === 2}
                  
                onClick={createView}
                //className={classes.backButton}
              >
                Create Review2
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
