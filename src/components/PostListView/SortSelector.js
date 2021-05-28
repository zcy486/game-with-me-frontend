import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SortSelector() {
  const classes = useStyles();
  const [sortType, setSortType] = React.useState("");

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select value={sortType} onChange={handleChange}>
          <MenuItem value={"order"}>order</MenuItem>
          <MenuItem value={"ratings"}>ratings</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default SortSelector;
