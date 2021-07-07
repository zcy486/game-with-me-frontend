import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  
  
}));



export default function Chips() {
  const classes = useStyles();

//  const handleChange = (event) => {
//    setState({ ...state, [event.target.name]: event.target.checked });
//  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  //const [label, setLabel] = React.useState("");
  //const onLabel = (event) => {
    //setLabel(event.target.value);
    //setLabelError("");
  //};
  return (
    <div className={classes.root}> 
      <Chip
        icon={<SentimentSatisfiedAltIcon />} 
        label="Humorous" 
        color="primary"
        onClick={handleClick}
        //value={label} 
        //onChange={onLabel}  
      />
      <Chip
        icon={<SentimentSatisfiedAltIcon />}
        label="Carry in game"
        color="primary"
        onClick={handleClick}
        //onChange={onLabel}  

      />
      <Chip
        icon={<SentimentSatisfiedAltIcon />}
        label="Interactive"
        color="primary"
        onClick={handleClick} 
      />
      <Chip icon={<SentimentSatisfiedAltIcon />}
        label="Friendly"
        color="primary"
        onClick={handleClick} 
      />
      <Chip
        icon={<SentimentSatisfiedAltIcon />}
        label="Patient"
        color="primary"
        onClick={handleClick} 
      />
      <Chip
        icon={<SentimentVeryDissatisfiedIcon />}
        label="Rude"
        color="secondary"
        onClick={handleClick} 
      />     
    </div>
  );
}
