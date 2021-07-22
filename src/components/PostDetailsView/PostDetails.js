import React, {useEffect} from "react";
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

function PostDetails(props) {
  const classes = useStyles();

  const clickOrder = () => {
    props.clickOrder();
  };

  const [rows,setRows] = React.useState([]);

  useEffect(() => {
    if (props.post) {
      const timeslots = props.post.availableTime;
      const _rows = [
        {
          time: "Monday", available: timeslots.includes("Monday"),
        },
        {
          time: "Tuesday", available: timeslots.includes("Tuesday"),
        },
        {
          time: "Wednesday", available: timeslots.includes("Wednesday"),
        },
        {
          time: "Thursday", available: timeslots.includes("Thursday"),
        },
        {
          time: "Friday", available: timeslots.includes("Friday"),
        },
        {
          time: "Saturday", available: timeslots.includes("Saturday"),
        },
        {
          time: "Sunday", available: timeslots.includes("Sunday"),
        }
      ];
      setRows(_rows);
    }
  }, [props.post]);

  const hasOrder = window.localStorage["order"];

  return (
    <div>
      <div className={classes.title}>
        <div className={classes.priceInfo}>
          <h1>Price: {props.post && props.post.price}</h1>
          <span>&nbsp;</span>
          <div className={classes.eCoinArea}>
            <ECoin />
          </div>
          <span>&nbsp;</span>
          <h1>/ Game</h1>
        </div>
        <h1>Game: {props.post && props.post.gameName}</h1>
      </div>
      <Paper className={classes.paper}>
        <Grid container direction={"column"}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="avatar"
                  src={props.post && props.post.avatarUrl ? props.post.avatarUrl : mockAvatar}
                />
              </ButtonBase>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item> {props.post && props.post.companionName} </Grid>
              <Grid item> Age: {props.post && props.post.companionAge} </Grid>
              <Grid item>
                {" "}
                Introduction:
                <Typography variant="subtitle1" gutterBottom>
                  {props.post && props.post.introduction}
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
              onClick={props.clickChat}
            >
              Chat
            </Button>
            <Tooltip title={
                            props.user
                                ?
                                hasOrder ?
                                    "You have a not-yet-confirmed order now, please wait for response."
                                    :
                                    props.myPost ?
                                        "You can not place order for yourself."
                                        : ""
                                :
                                "Please sign in / register to make order."

                        }>
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
                value={props.post && props.post.ratings ? props.post.ratings : 0}
                precision={0.1}
                readOnly
              />
              <span>&nbsp;</span>
              <Typography>{props.post && typeof (props.post.ratings) === "number" && (props.post.ratings).toFixed(1)} / 5.0</Typography>
            </div>
          </Box>
          <Box
            className={classes.box}
            component="fieldset"
            borderColor="transparent"
          >
            <Typography variant={"h6"}>Served:</Typography>
            <Typography>{props.post && props.post.orderNumber}</Typography>
          </Box>
          <Box
            className={classes.box}
            component="fieldset"
            borderColor="transparent"
          >
            <Typography variant={"h6"}>Type:</Typography>
            <Typography>{props.post && props.post.postType}</Typography>
          </Box>
        </Grid>
        <Divider />
        <div className={classes.detailBox}>
          <Grid container spacing={2} direction="column">
            <Grid item>Details</Grid>
            <Grid item container flex="row">
              Price: {props.post && props.post.price} <span>&nbsp;</span>
              <ECoin /> <span>&nbsp;</span>/ Game{" "}
            </Grid>
            <Grid item>
              Server: <span>&nbsp;&nbsp;</span>
              {props.post && Array.isArray(props.post.servers) && props.post.servers.join(", ")}
            </Grid>
            <Grid item>
              Platform: <span>&nbsp;&nbsp;</span>
              {props.post && Array.isArray(props.post.platforms) && props.post.platforms.join(", ")}
            </Grid>
            <Grid item>
              Language: <span>&nbsp;&nbsp;</span>
              {props.post && Array.isArray(props.post.language) && props.post.language.join(", ")}
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
