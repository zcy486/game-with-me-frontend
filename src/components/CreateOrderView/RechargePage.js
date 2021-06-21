import React, { useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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


//add the PayPal Button

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });



function RechargePage(props) {
    const classes = useStyles();

    const createPayPalOrder = (data, actions, err) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: payValue,
                    },
                },
            ],
        });
    };


    const onApprove = (data, actions) => {
        return actions.order.capture();
    };

    //user selected quantities
    const [value, setValue] = useState(1);


    const handleChange = (e) => {
        setValue(e.target.value);

    };

    const onConfirm = (event) => {
        event.preventDefault();


    };

    const onRecharge = (event) => {
        event.preventDefault();
        props.onRecharge();
    };


    const handleClose = () => {
        props.handleClose();
    };

    var payValue = Math.round((value * 1.1) * 100)/100;
    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            maxWidth={'lg'}
        >
            <DialogTitle id="dialog-title">
                {"Recharge Page"}
            </DialogTitle>
            <DialogContent dividers={true}>

                <DialogContentText id="dialog-description">
                    Please choose the amount of E-coins you want to charge:
                </DialogContentText>
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

                <DialogContentText id="dialog-description">
                    You will have to pay {payValue} EURO to get {value} ecoins.
                </DialogContentText>
                <Grid>
                    <PayPalButton createOrder={(data, actions) => createPayPalOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}></PayPalButton>
                </Grid>
            </DialogContent>
            <DialogActions>


                <Button onClick={onConfirm} color="Secondary" autoFocus>
                    Pay
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>

    );
}

export default RechargePage;