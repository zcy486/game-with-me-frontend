import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 55,
    //backgroundColor: fade("#EFB2DA", 1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  helperText: {
    fontFamily: "Helvetica",
    marginTop: 0,
    color: "black",
  },
}));

function FilterBox(props) {
  const classes = useStyles();
  const [sortType, setSortType] = React.useState("");

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div>
      <FormHelperText className={classes.helperText}>
        {props.helperText}
      </FormHelperText>
      <FormControl className={classes.formControl}>
        <Select value={sortType} onChange={handleChange}>
          {props.choices.map((choice) => (
            <MenuItem value={choice}>{choice}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default FilterBox;
