import React, { useState } from "react";
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



function WithdrawPage(props) {
    const classes = useStyles();

    const onCancel = () => {
        props.handleClose();
    };

    const onError = (err) => {
        console.log(err)
    }

    //user selected radio quantities
    const [value, setValue] = useState(10);

    //user inputed quantities
    const [inputValue, setInputValue] = useState(100);


    const [account, setAccount] = useState(null)

    const invalidValue = (value <= 0);


    const invalidAccount = (account === null);

    const handleInputChange = (e) => {

        setInputValue(e.target.value);
        setValue(e.target.value);

    };

    const handleChange = (e) => {
        setValue(e.target.value);

    };

    const handleAccountChange = (e) => {
        setAccount(e.target.value)
    }


    const handleClose = () => {
        props.handleClose();
    };

    var outValue = Math.round((value * 0.9) * 100) / 100;


    const handleWithdraw = () => {
        const newBalance = props.currentBalance - Number(value);
        props.handleWithdraw(newBalance, Number(value), account);
        props.handleClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            maxWidth={'lg'}
        >
            <DialogTitle id="dialog-title">
                {"Withdraw Page"}
            </DialogTitle>
            <DialogContent dividers={true}>

                <DialogContentText id="dialog-description">
                    Please tell us your Paypal account:
                </DialogContentText>


                <TextField
                    required
                    id="standard-required"
                    type="text"
                    label="Paypal account"
                    rows={1}
                    error={account == null}
                    variant="standard"
                    onChange={handleAccountChange}
                />

                <DialogContentText id="dialog-description">
                    Please choose the amount of E-coins you want to withdraw:
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

                {invalidValue || invalidAccount ?
                    <DialogContentText id="dialog-description">
                        Please enter a valid information.
                    </DialogContentText> : <Grid>
                        <DialogContentText id="dialog-description">
                            You will get {outValue} EURO to yout Paypal account: {account} for withdrawing {Number(value)} ecoins.
                        </DialogContentText>
                        <Grid>
                        </Grid>
                    </Grid>}
            </DialogContent>
            <DialogActions>

                <Button onClick={handleWithdraw}>Confirm</Button>

                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>

    );
}

export default WithdrawPage;