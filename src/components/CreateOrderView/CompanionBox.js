import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Divider, ButtonBase, Typography} from "@material-ui/core";
import logo from "../../images/logo.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        fontFamily: "Helvetica",
        padding: theme.spacing(5),
        marginBottom: theme.spacing(7),
        fontSize: 20,
    },
        image: {
            width: 128,
            height: 128,
          },
          img: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
          },
      
         
          

}));



function CompanionBox(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="avatar"
              src={logo}
            />        
            
          </ButtonBase>
          
          </Grid>

          <Grid item xs container direction="column" spacing={2} >
            <Grid item> {props.username} </Grid>
            <Grid item> Age: {props.age} </Grid>
            <Grid item> Introduction:
            <Typography variant="subtitle1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography></Grid>
            
           </Grid>
      
      </Grid>
                <div>
                    <Divider />
                    Details
                <Grid item>Price: {props.price}  / Game</Grid>
                <Grid item>Server: {props.server}</Grid>
                <Grid item>Platform: {props.platform}</Grid>
                </div>

            
        </Paper>
    );
}

export default CompanionBox;