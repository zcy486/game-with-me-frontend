//did not used in ShortRecapBox.js
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function StarShowRating(props) {
  //const [value, setValue] = React.useState(2);
  //value={value}
    return (
      <div> 
        <Box component="fieldset" mb={3} borderColor="transparent">   
          <Rating name="disabled" value={props.ratings} disabled /> 
          
        </Box>
      </div>
    );
}

export default StarShowRating;