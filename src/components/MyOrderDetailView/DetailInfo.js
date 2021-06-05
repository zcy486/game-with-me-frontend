import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          align="center"
          color="textSecondary"
          gutterBottom
        >
          ----------GAME WITH ME----------
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Order-Number:
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Companion:
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Companion_ID:
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Game:
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Game amount:
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Total amount:
        </Typography>
        <Typography variant="h9" component="h2">
          {bull}Order Status:
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          The order will be confirmed by your companion in 15 minutes, otherwise
          the order would be canceled and the e-coins would be transferred back.
          <br />
          You can also cancel the order at yourside whenever during the 15mins.
        </Typography>
        <Typography variant="body2" component="p">
            You can also find your order information from your user profile. 
          <br />
          Hope you have a good time in your games!!!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="big" color ="primary">
          OK
        </Button>
      </CardActions>
    </Card>
  );
}
