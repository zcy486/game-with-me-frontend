import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  outerCircle: {
    display: "flex",
    height: "24px",
    width: "24px",
    backgroundColor: "rgb(224,189,0)",
    borderRadius: "50%",
  },
  innerCircle: {
    display: "flex",
    height: "20px",
    width: "20px",
    backgroundColor: "gold",
    borderRadius: "50%",
  },
  text: {
    margin: "auto",
    color: theme.palette.secondary.main,
    fontSize: 15,
    fontFamily: "Audiowide",
  },
}));

function ECoin() {
  const classes = useStyles();
  return (
    <span className={classes.outerCircle}>
      <span className={classes.innerCircle}>
        <span className={classes.text}>E</span>
      </span>
    </span>
  );
}

export default ECoin;
