import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { connect, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: 840,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    width: 128,
    height: 128,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function ShortRecapBox(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={10}>
        <Grid item>
          <img className={classes.img} alt="avatar" src={props.avatarUrl} />
        </Grid>
        <Grid item xs={12} sm container direction="row" spacing={10}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h5">{props.companionName}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="disabled" value={props.ratings} disabled />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default connect()(ShortRecapBox);
