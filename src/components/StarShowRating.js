import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function StarShowRating() {
    const [value, setValue] = React.useState(2);
  
    return (
      <div> 
        <Box component="fieldset" mb={3} borderColor="transparent">   
          <Rating name="disabled" value={value} disabled />
        </Box>
      </div>
    );
}

export default StarShowRating;