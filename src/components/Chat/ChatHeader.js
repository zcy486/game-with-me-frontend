import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import MockAvatar from "../../images/avatar.svg";
import ECoin from "../ECoin";

const useStyles = makeStyles((theme) => ({
  chatHeader: {
    maxHeight: 112,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    fontSize: 18,
  },
  target: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(2),
  },
  postLink: {
    minWidth: 400,
    display: "flex",
    justifyContent: "space-between",
  },
  priceRow: {
    display: "flex",
  },
  buttonArea: {
    padding: "16px",
  },
}));

function ChatHeader(props) {
  const classes = useStyles();

  const onClickOrder = (event) => {
    event.preventDefault();
    props.history.push(
      `/games/${props.postLink.gameId}/detail/${props.postLink.postId}/order`
    );
  };

  return (
    <div className={classes.chatHeader}>
      {props.selectedUser ? (
        <div className={classes.target}>
          <Avatar className={classes.avatar} src={MockAvatar} />
          <Typography>{props.selectedUser.username}</Typography>
        </div>
      ) : (
        <div />
      )}
      {props.selectedUser &&
      props.postLink &&
      props.selectedUser.userID === props.postLink.targetId ? (
        <Card className={classes.postLink}>
          <CardContent>
            <Typography>{props.postLink.gameName}</Typography>
            <div className={classes.priceRow}>
              <Typography>Price: {props.postLink.price}</Typography>
              <ECoin />
              <span>&nbsp;</span>
              <Typography>/ Game</Typography>
            </div>
          </CardContent>
          <CardActions className={classes.buttonArea}>
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={onClickOrder}
            >
              Order
            </Button>
          </CardActions>
        </Card>
      ) : (
        <div />
      )}
    </div>
  );
}

export default withRouter(ChatHeader);
