import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import logo from "../../images/logo.png";


const useStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
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

function MyOrdersView(props) {
  const classes = useStyles();

  return (//from database get the information of orders
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
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography>
                {props.username}
              </Typography>
            </Grid>
            <Grid item>
              5
            </Grid>
            <Grid item>
              / Game
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MyOrdersView;