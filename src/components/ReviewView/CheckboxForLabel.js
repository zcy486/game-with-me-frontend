import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const BlueCheckbox = withStyles({
  root: {
    color: blue[300],
   
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const PurpleCheckbox = withStyles({
  root: {
    color: purple[400],
    '&$checked': {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Humorous"
      />
      <FormControlLabel
        control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="Carry in game"
      />
      <FormControlLabel
        control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={state.checkedC} onChange={handleChange} name="checkedC" />}
        label="Interactive"
      />
      <FormControlLabel
        control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={state.checkedD} onChange={handleChange} name="checkedD" />}
        label="Friendly"
      />
      <FormControlLabel
        control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={state.checkedE} onChange={handleChange} name="checkedE" />}
        label="Patient"
      />
      <FormControlLabel
        control={<PurpleCheckbox icon={<SentimentDissatisfiedIcon />} checked={state.checkedF} onChange={handleChange} name="checkedF" />}
        label="Rude"
      />
      
      
    </FormGroup>
  );
}
