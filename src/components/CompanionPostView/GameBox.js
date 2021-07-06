import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import ECoin from "../ECoin";

import GameAvatar from "../../images/game_avatar.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 1000,
    fontFamily: "Helvetica",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  paperContent: {
    display: "flex",
  },
  img: {
    width: 128,
    height: 128,
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  titleAndPrice: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
  },
  priceInfo: {
    display: "flex",
    alignItems: "center",
  },
  placeHolder: {
    flexGrow: 1,
  },
  language: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  languageRow: {
    display: "table",
  },
  languageColumn: {
    display: "table-cell",
  },
}));

function GameBox(props) {
  const classes = useStyles();

  const onClick = (event) => {
    event.preventDefault();
    props.onClick(props.gameId, props.postId);
  };

  return (
    <ButtonBase onClick={onClick}>
      <Paper className={classes.paper}>
        <Grid container direction={"row"}>
          <Grid item>
            <img className={classes.img} alt="avatar" src={props.gamePic} />
          </Grid>
          <Grid className={classes.titleAndPrice}>
            <Typography>{props.gameName}</Typography>
            <Grid className={classes.priceInfo}>
              {props.price}
              <span>&nbsp;</span>
              <ECoin />
              <span>&nbsp;</span>/ Game
            </Grid>
          </Grid>
          <Grid className={classes.placeHolder} />
          <Grid className={classes.language}>
            <div className={classes.languageRow}>
              Language:
              {props.languages &&
                props.languages.map((language, i) => {
                  return (
                    <div key={i} className={classes.languageColumn}>
                      {i > 0 ? "," : ""}
                      <span>&nbsp;</span>
                      {language}
                    </div>
                  );
                })}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
}

export default GameBox;
