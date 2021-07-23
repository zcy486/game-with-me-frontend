import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import ButtonBase from "@material-ui/core/ButtonBase";
import theme from "../../theming/themes";

const useStyles = makeStyles((theme) => ({
  paperRow: {
    display: "flex",
  },
  paperColumn: {
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(1.5),
  },
  comment: {
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(5),
  },
  commentContent: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
    maxWidth: theme.spacing(65),
  },
  image: {
    width: 128,
    height: 128,
    padding: theme.spacing(1),
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  placeholder: {
    flexGrow: "1",
  },
}));

function CommentBox(props) {
  const classes = useStyles();
  return (
    <Grid>
      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: theme.spacing(2.5),
          }}
        >
          <p
            style={{
              fontWeight: "bolder",
              color: "#7908be",
              fontSize: "large",
            }}
          >
            {props.name}
          </p>
        </Grid>
        <Grid className={classes.paperColumn}>
          <p
            style={{
              marginLeft: theme.spacing(1),
              marginBottom: theme.spacing(0.5),
              marginTop: theme.spacing(0.5),
            }}
          >
            {props.date}
          </p>
          <Rating defaultValue={props.rating} precision={0.5} readOnly />
        </Grid>
      </Grid>
      <Grid className={classes.paperRow}>
        <Grid className={classes.paperColumn}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="avatar" src={props.avatarUrl} />
          </ButtonBase>
        </Grid>
        <Grid className={classes.paperColumn}>
          <p className={classes.commentContent}>{props.content}</p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentBox;
