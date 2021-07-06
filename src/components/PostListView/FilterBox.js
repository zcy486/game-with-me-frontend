import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 55,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  helperText: {
    fontFamily: "Helvetica",
    marginTop: 0,
    color: "black",
  },
  items: {
    fontFamily: "Helvetica",
  }
}));

function FilterBox(props) {
  const classes = useStyles();
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };

  return (
    <div>
      <FormHelperText className={classes.helperText}>
        {props.helperText}
      </FormHelperText>
      <FormControl className={classes.formControl}>
        <Select value={props.value} onChange={handleChange}>
          <MenuItem value="" className={classes.items}>
            <em>None</em>
          </MenuItem>
          {props.choices && props.choices.map((choice) => (
            <MenuItem value={choice} className={classes.items}>{choice}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default FilterBox;
