import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  circle: {
    height: "25px",
    width: "25px",
    backgroundColor: "linear-gradient(to right, #8be3ff, #7908be)",
    borderRadius: "50%",
  },
}));

function ECoin() {
  const classes = useStyles();
  return <span class={classes.circle}>E</span>;
}

export default {ECoin}
