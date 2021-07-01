import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import ECoin from "../ECoin";
import mockAvatar from "../../images/avatar.svg";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import TableContainer from "@material-ui/core/TableContainer";
import check from "../../images/checked.png";
import cross from "../../images/cancel.png";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
  },
  priceInfo: {
    display: "flex",
    marginRight: theme.spacing(6),
  },
  eCoinArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    fontFamily: "Helvetica",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(1),
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(3),
  },
  chatButton: {
    marginRight: theme.spacing(5),
  },
  ratingRow: {
    display: "flex",
  },
  box: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
  icons: {
    maxWidth: "30px",
    maxHeight: "30px",
  },
  detailBox: {
    display: "flex",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#7908be",
    color: theme.palette.common.white,
    padding: theme.spacing(0.5),
  },
  body: {
    fontSize: 14,
    padding: theme.spacing(0.5),
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(time, available) {
  return { time, available };
}

function PostDetails(props) {
  const classes = useStyles();

  const clickOrder = () => {
    props.clickOrder();
  };

  const rows = [
    createData(
      "Monday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Monday")
        : false
    ),
    createData(
      "Tuesday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Tuesday")
        : false
    ),
    createData(
      "Wednesday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Wednesday")
        : false
    ),
    createData(
      "Thursday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Thursday")
        : false
    ),
    createData(
      "Friday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Friday")
        : false
    ),
    createData(
      "Saturday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Saturday")
        : false
    ),
    createData(
      "Sunday",
      Array.isArray(props.availableTime)
        ? props.availableTime.includes("Sunday")
        : false
    ),
  ];

  const hasOrder = window.localStorage["order"];

  return (
    <div>
      <div className={classes.title}>
        <div className={classes.priceInfo}>
          <h1>Price: {props.price}</h1>
          <span>&nbsp;</span>
          <div className={classes.eCoinArea}>
            <ECoin />
          </div>
          <span>&nbsp;</span>
          <h1>/ Game</h1>
        </div>
        <h1>Game: {props.gameName}</h1>
      </div>
      <Paper className={classes.paper}>
        <Grid container direction={"column"}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="avatar"
                  src={props.avatar ? props.avatar : mockAvatar}
                />
              </ButtonBase>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item> {props.username} </Grid>
              <Grid item> Age: {props.age} </Grid>
              <Grid item>
                {" "}
                Introduction:
                <Typography variant="subtitle1" gutterBottom>
                  {props.introduction}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttons}>
            <Button
              className={classes.chatButton}
              variant={"contained"}
              color={"primary"}
              size={"small"}
            >
              Chat
            </Button>
            <Tooltip
              title={
                !props.canOrder
                  ? hasOrder
                    ? "You have a not-yet-confirmed order now, please wait for response."
                    : props.user
                    ? "You can not place order for yourself."
                    : "Please sign in / register to make order."
                  : ""
              }
            >
              <span>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  size={"small"}
                  onClick={clickOrder}
                  disabled={!props.canOrder}
                >
                  Order
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
        <Divider />
        <Grid className={classes.ratingRow}>
          <Box
            className={classes.box}
            component="fieldset"
            borderColor="transparent"
          >
            <Typography variant={"h6"}>Rating score:</Typography>
            <div className={classes.rating}>
              <Rating
                value={props.ratings ? props.ratings : 0}
                precision={0.1}
                readOnly
              />
              <span>&nbsp;</span>
              <Typography>{props.ratings} / 5</Typography>
            </div>
          </Box>
          <Box
            className={classes.box}
            component="fieldset"
            borderColor="transparent"
          >
            <Typography variant={"h6"}>Served:</Typography>
            <Typography>{props.served}</Typography>
          </Box>
          <Box
            className={classes.box}
            component="fieldset"
            borderColor="transparent"
          >
            <Typography variant={"h6"}>Type:</Typography>
            <Typography>{props.companionType}</Typography>
          </Box>
        </Grid>
        <Divider />
        <div className={classes.detailBox}>
          <Grid container spacing={2} direction="column">
            <Grid item>Details</Grid>
            <Grid item container flex="row">
              Price: {props.price} <span>&nbsp;</span>
              <ECoin /> <span>&nbsp;</span>/ Game{" "}
            </Grid>
            <Grid item>
              Server: <span>&nbsp;&nbsp;</span>
              {Array.isArray(props.server) && props.server.join(", ")}
            </Grid>
            <Grid item>
              Platform: <span>&nbsp;&nbsp;</span>
              {Array.isArray(props.platform) && props.platform.join(", ")}
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Day</StyledTableCell>
                  <StyledTableCell align="left">Available</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.time}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.available ? (
                        <Avatar
                          src={check}
                          alt={"yes"}
                          className={classes.icons}
                        />
                      ) : (
                        <Avatar
                          src={cross}
                          alt={"no"}
                          className={classes.icons}
                        />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
}

export default PostDetails;
