import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 0,
    minWidth: 150,
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  content: {
    fontSize: 18,
  },
}));

const Message = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.from}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
