import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  circle: {
    display:"flex",
    height: "25px",
    width: "25px",
    backgroundColor: "rgba(121, 8, 190)",
    borderRadius: "50%",
  },
  text:{
      margin:"auto",
      color: "white",
      fontSize: 16,
  },

}));

function ECoin() {
  const classes = useStyles();
  return <span class={classes.circle} color="secondary">
     <span class={classes.text}>
         E
     </span>
  </span>;
}

export default ECoin
