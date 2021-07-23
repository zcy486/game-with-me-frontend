/* import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const stars = {
    //0.5: 'Useless',
    1: 'Terrible',
    //1.5: 'Poor',
    2: 'Not bad',
    //2.5: 'Ok',
    3: 'Satisfied',
    //3.5: 'Good',
    4: 'Good',
    //4.5: 'Excellent',
    5: 'Perfect',
};
  
const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'left',
    },
});


function StarForRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <Rating
        name="simple-controlled"
        value={value}
        //precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{stars[hover !== -1 ? hover : value]}</Box>}
    </div>
    //To Do: save and send to backend; 
  );
  
}
export default StarForRating; */