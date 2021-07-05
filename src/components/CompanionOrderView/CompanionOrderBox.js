import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ECoin from "../ECoin";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    paper: {
        width: 840,
        fontFamily: "Helvetica",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paperContent: {
        display: "flex",
    },
    img: {
        width: 128,
        height: 128,
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        padding: theme.spacing(1),
    },
    paperColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
    },
    placeHolder: {
        flexGrow: 1,
    },
    priceInfo: {
        display: "flex",
        alignItems: "center",
    },
    dateInfo: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        color: "green",
    },
    button: {
        display: "table",

    },
}));





function CompanionOrderBox(props) {
    const classes = useStyles();

    const onClickConfirm = (event) => {
        event.preventDefault();
        props.onClickConfirm(props.order._id);
    };

    const onClickComplete = (event) => {
        event.preventDefault();
        props.onClickComplete(props.order._id);
    };

    const switchStatus = (status) => {
        switch(status) {
            case "Created":
                return (<Button variant={"contained"} color={"secondary"} onClick={onClickConfirm}>
                    Confirm
                </Button>);
            case "Confirmed":
                return(
                <Button variant={"contained"} color={"secondary"} onClick={onClickComplete}>
                    Complete
                </Button>);
            case "CompletedByCompanion":
                return(
                <Typography>Waiting for gamer to complete the order.</Typography>);
            case "CompletedByGamer":
                return(
               <Typography>Order is completed.</Typography>);
            default:
                return null;
        }
    }

    return (
 
            <Paper className={classes.paper}>
                <Grid className={classes.paperContent}>
                    <Grid item>
                        <img className={classes.img} alt="avatar" src={props.avatar} />
                    </Grid>
                    <Grid className={classes.paperColumn}>
                        <Typography>{props.gamerName}</Typography>

                        <Grid className={classes.priceInfo}>
                            {props.gameName}
                            <span>&nbsp;</span>

                        </Grid>
                        <Grid className={classes.priceInfo}>
                            {props.price}
                            <span>&nbsp;</span>
                            <ECoin />
                            <span>&nbsp;</span>
                            
                            for {props.gameNumber} Game
                        </Grid>
                        
                    </Grid>
                    <Grid className={classes.placeHolder} />
                    <Grid className={classes.paperColumn}>
                        <Grid className={classes.dateInfo}>

                            <Typography>{props.dateTime}</Typography>
                        </Grid>
                       
                            <Grid item>
                           {switchStatus(props.status)

                           }
                           </Grid>
          </Grid>
                </Grid>
            </Paper>
   
    );
}

export default CompanionOrderBox;
