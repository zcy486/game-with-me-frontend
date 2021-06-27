import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
}));

function OrderBox(props) {
  const classes = useStyles();

  //user selected quantities
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onConfirm = (event) => {
    event.preventDefault();
    props.onConfirm(totalAmount, props.user._id, props.post._id);
  };

  const onRecharge = (event) => {
    event.preventDefault();
    props.onRecharge();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var totalAmount = value * props.price;
  var insufficient = totalAmount > props.user.balance;
  var wrongAmount = totalAmount <= 0;
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item> Game: {props.gameName}</Grid>

        <Grid item container flex="row">
          Price: {props.price} <span>&nbsp;</span>
          <Ecoin/>
          <span>&nbsp;</span>/ Game
        </Grid>

        <Grid item container alignItems="center" flex="row">
          Amount:
          <span>&nbsp;</span>
          <TextField
            id="outlined-number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            error={value < 1}
            variant="outlined"
            defaultValue={1}
            required={true}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>
        <Grid item container flex="row">
          Total: {totalAmount}
          <span>&nbsp;</span>
          <Ecoin/>
          <span>&nbsp;</span>
        </Grid>
        <Grid item container flex="row">
          My wallet: {props.user.balance}
          <span>&nbsp;</span>
          <Ecoin/>
          <span>&nbsp;</span>
        </Grid>

        <Grid item>
          <div className={classes.Buttons}>
            {insufficient && !wrongAmount ? (
              <Button
                className={classes.Button}
                variant="contained"
                onClick={onRecharge}
                color="secondary"
                type="submit"
              >
                Recharge
              </Button>
            ) : null}
            <Tooltip
              title={
                insufficient
                  ? "You don't have enough ecoins, please recharge."
                  : wrongAmount
                  ? "Please choose a valid amount bigger than 1."
                  : ""
              }
            >
              <span>
                <Button
                  className={classes.Button}
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                  disabled={insufficient || wrongAmount}
                  type="submit"
                >
                  Confirm & Pay
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Please confirm your order"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      For this order you have to pay {totalAmount} ecoins to the
                      gaming companion.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      Your wallet balance after this order will be{" "}
                      {props.user.balance - totalAmount} ecoins.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={onConfirm} color="secondary" autoFocus>
                      Confirm & Pay
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
              </span>
            </Tooltip>
            <span>&nbsp;</span>
            <Button className={classes.Button} onClick={props.onCancel}>
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OrderBox;
