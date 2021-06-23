import React, { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Ecoin from "../ECoin";
import { updateBalance } from "../../redux/actions";

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

                    description: "RechargeEcoin",
                    amount: {
                        value: payValue,
                        breakdown: {
                            item_total: {
                                currency_code: "EUR",
                                value: payValue,
                            },

                            shipping: {
                                currency_code: "EUR",
                                value: "0",
                            },
                            tax_total: {
                                currency_code: "EUR",
                                value: "0",
                            },
                            discount: {
                                currency_code: "EUR",
                                value: "0",
                            },
                            handling: {
                                currency_code: "EUR",
                                value: "0",
                            }

                        },
                        insurance: {
                            currency_code: "EUR",
                            value: "0",
                        },
                        shipping_discount: {
                            currency_code: "EUR",
                            value: "0",
                        },

                    },
                    items: [
                        {


                            name: "Ecoin",
                            price: "1",

                            quantity: value,
                            unit_amount: {
                                currency_code: "EUR",
                                value: "1.1",
                            }
                        },


                    ],
                },



            ]
        });
    };



    const onCancel = (data) => {
        props.handleClose();
    };

    const onError = (err) => {
        console.log(err)
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            props.handleClose();
            const newBalance = props.currentBalance + Number(details.purchase_units[0].items[0].quantity);
            props.handleRecharge(newBalance);

        });



    };

    //user selected radio quantities
    const [value, setValue] = useState(10);

    //user inputed quantities
    const [inputValue, setInputValue] = useState(100);



    const invalidValue = (value <= 0);


    const handleInputChange = (e) => {

        setInputValue(e.target.value);
        setValue(e.target.value);

    };

    const handleChange = (e) => {
        setValue(e.target.value);

    };




    const handleClose = () => {

        //Test
        const newBalance = props.currentBalance + Number("20");
        props.handleRecharge(newBalance);

        props.handleClose();
    };

    var payValue = Math.round((value * 1.1) * 100) / 100;


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
                <FormControl>
                    <FormLabel> Amount</FormLabel>
                    <RadioGroup aria-label="amount" name="amount" value={value.toString()} onChange={handleChange}>
                        <FormControlLabel value="10" control={<Radio />} label="10" />
                        <FormControlLabel value="20" control={<Radio />} label="20" />
                        <FormControlLabel value="50" control={<Radio />} label="50" />
                        <FormControlLabel value={inputValue.toString()} control={<Radio />} label={<TextField
                            id="standard-number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={inputValue < 0}
                            variant="outlined"
                            defaultValue={100}
                            required={true}
                            onChange={handleInputChange}
                            InputProps={{ inputProps: { min: 1 } }}

                        />} >

                        </FormControlLabel>




                    </RadioGroup>
                </FormControl>

                {invalidValue ?
                    <DialogContentText id="dialog-description">
                        Please choose a valid amount.
                    </DialogContentText> : <Grid>
                        <DialogContentText id="dialog-description">
                            You will have to pay {payValue} EURO to get {Number(value)} ecoins.
                        </DialogContentText>

                        <Grid>
                            <PayPalButton createOrder={(data, actions) => createPayPalOrder(data, actions)}
                                onApprove={(data, actions) => onApprove(data, actions)} onCancel={(data) => onCancel(data)}
                                onError={(err) => onError(err)}></PayPalButton>
                        </Grid>
                    </Grid>}
            </DialogContent>
            <DialogActions>


                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>

    );
}

export default RechargePage;