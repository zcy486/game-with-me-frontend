/* import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
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

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className={classes.root}> 
      <Chip
        icon={<SentimentSatisfiedAltIcon />} 
        label="Humorous" 
        color="primary"
        onClick={handleClick}
      />
      <Chip
        icon={<SentimentSatisfiedAltIcon />}
        label="Carry in game"
        color="primary"
        onClick={handleClick}

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
 */