import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, Box } from "@material-ui/core";
import Ecoin from "../ECoin";

const useStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: "Helvetica",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(7),
    fontSize: 20,
    minWidth: 500,
  },

  Buttons: {
    marginLeft: theme.spacing(20),
  },
  Button: {
    marginLeft: theme.spacing(2),
  },
  infoRow: {
    display: "flex",
  },
}));

function WithdrawPage(props) {
  const classes = useStyles();

  //user selected radio quantities
  const [value, setValue] = useState(1);

  //user inputed quantities
  const [inputValue, setInputValue] = useState(props.currentBalance);

  const [account, setAccount] = useState(null);

  const [conOpen, setConOpen] = useState(false);

  const invalidValue = value <= 0 || value > props.currentBalance;

  const [invalidAccount, setInvalidAcocunt] = useState(true);

  const handleInputChange = (e) => {
    const valid = e.target.value.replace(/[e\+\-\.]/, "");
    if (valid) {
      setInputValue(valid);
      setValue(valid);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAccountChange = (e) => {
    //regular expression for email validation
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(e.target.value)) {
      setInvalidAcocunt(false);
    }
    setAccount(e.target.value);
  };

  const handleClose = () => {
    props.handleClose();
  };

  const handleConClose = () => {
    setConOpen(false);
  };
  var outValue = Math.round(value * 0.9 * 100) / 100;

  const handleConfirm = () => {
    setConOpen(true);
  };

  const handleWithdraw = () => {
    const newBalance = props.currentBalance - Number(value);
    props.handleWithdraw(newBalance, Number(value), account);
    props.handleClose();
  };

  return props.currentBalance === 0 ? (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      maxWidth={"lg"}
    >
      <DialogTitle id="dialog-title">{"Withdraw Page"}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="dialog-description">
          You don't have any ecoins to withdraw!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={"contained"} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="dialog-title">{"Withdraw Page"}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="dialog-description">
            Please tell us your Paypal E-mail account:
          </DialogContentText>

          <TextField
            required
            id="standard-required"
            type="email"
            label="Paypal account"
            rows={1}
            variant="standard"
            value={account}
            error={invalidAccount}
            onChange={handleAccountChange}
          />

          <DialogContentText id="dialog-description">
            Please choose the amount of E-coins you want to withdraw:
          </DialogContentText>
          <FormControl>
            <FormLabel> Amount</FormLabel>
            <RadioGroup
              aria-label="amount"
              name="amount"
              value={value.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              {props.currentBalance > 2 ? (
                <FormControlLabel
                  value={Math.round(props.currentBalance / 2).toString()}
                  control={<Radio />}
                  label={Math.round(props.currentBalance / 2).toString()}
                />
              ) : null}
              <FormControlLabel
                value={inputValue.toString()}
                control={<Radio />}
                label={
                  <TextField
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={inputValue}
                    error={invalidValue}
                    required={true}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                }
              />
            </RadioGroup>
          </FormControl>

          {invalidValue || invalidAccount ? (
            <DialogContentText id="dialog-description">
              Please enter a valid information.
            </DialogContentText>
          ) : (
            <Grid>
              <DialogContentText id="dialog-description">
                You will get {outValue}€ to yout Paypal account: {account}
              </DialogContentText>
              <Grid />
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            variant={"contained"}
            color="secondary"
            disabled={invalidAccount || invalidValue}
          >
            Confirm
          </Button>

          <Button onClick={handleClose} variant={"outlined"}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={conOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="dialog-title">{"Confirmation Page"}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="dialog-description">
            <Typography>
              You will get <span>&nbsp;</span>
              <Box fontWeight="fontWeightMedium" display="inline" color="black">
                {outValue}€<span>&nbsp;</span>
              </Box>
              in 1-3 days to your Paypal account: <span>&nbsp;</span>
              <Box fontWeight="fontWeightMedium" color="black">
                {account}
                <span>&nbsp;</span>
              </Box>
            </Typography>
            <Typography className={classes.infoRow}>
              for withdrawing <span>&nbsp;</span>
              <Box fontWeight="fontWeightMedium" display="inline" color="black">
                {Number(value)}
              </Box>
              <Ecoin />
              <span>&nbsp;</span> on GameWithMe.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleWithdraw}
            variant={"contained"}
            color="secondary"
          >
            Confirm
          </Button>
          <Button onClick={handleConClose} variant={"outlined"}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WithdrawPage;
