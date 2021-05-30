import React ,{useState }from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';

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
    Button:{
        marginLeft: theme.spacing(2),
    }
}));




function OrderBox(props) {
    const classes = useStyles();

    const [value, setValue] = useState(1) 
    const handleChange = e =>{
        setValue(e.target.value);
    }
    const onConfirm = (event) => {
        event.preventDefault();
        props.onConfirm();
    };

    const onRecharge = (event) => {
        event.preventDefault();
        props.onRecharge();
    };

    var totalAmount = value * props.price;
    var insufficient = (totalAmount > props.balance);
    return (
        <Paper className={classes.paper}>
            <Grid>
                <Grid item> Game: {props.gameName}</Grid>
                <Grid item>Price: {props.price}  / Game</Grid>
                <Grid item>Amount:

          
                
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          defaultValue={1}
          onChange={handleChange} 
          InputProps={{ inputProps: { min: 1} }}
         
        />
                 </Grid>
                <Grid item>Total: {totalAmount}
                </Grid>
                <Grid item>My wallet: {props.balance}</Grid>

           
<div className = {classes.Buttons}>
    {insufficient? <Button className={classes.Button} variant="contained" onClick={onRecharge} color="secondary"  type="submit">
                       Recharge
            </Button> : null}

                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="secondary"
                        onClick={onConfirm}
                        disabled={insufficient}
                        type="submit"
                        
                    >
                        Confirm & Pay
            </Button>
                    <Button className={classes.Button}  onClick={props.onCancel}>
                        Cancel
            </Button>
                </div>

            </Grid>
        </Paper>
    );
}

export default OrderBox;