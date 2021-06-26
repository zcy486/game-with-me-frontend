import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { blue } from '@material-ui/core/colors';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import TextField from '@material-ui/core/TextField';
import CancelButton from "../../components/ReviewView/CancelButton";
import { withRouter } from 'react-router-dom';

/* const styles = {
    submit0: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
      border: 0,
      borderRadius: 20,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 40,
      padding: '0 30px',
    },
};*/
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

  
const useStyles = makeStyles((theme) => ({
    star: {
      width: 200,
      display: 'flex',
      alignItems: 'left',
    },
    textField: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '120ch',
      },
    },
    subTitle: {
      fontSize: "20px",
      fontFamily: "Helvetica",
    },
    submit: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
      border: 0,
      borderRadius: 20,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 40,
      padding: '0 30px',
    },
}));

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

const Textfield = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '120ch',
    },
  },
}));

function SubmitReview(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); //for dialog

  const [star, setStar] = React.useState(0); //star
  const [hover, setHover] = React.useState(-1); //star

  const [label, setLabel] = React.useState({}); //for label

  const [text, setText] = React.useState('Controlled'); //for review text

  const handleChange = (event) => {
    setLabel({ ...label, [event.target.name]: event.target.checked }); //for label
  };

  const handleTextChange = (event) => {
    setText(event.target.value); //review text
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




//extract on gamer or companion or reviewId???
  const extractReview = () => {
    if (!props.review) {
      return;
    }

    setStar(props.review.star);
    setLabel(props.review.label);
    setText(props.review.reviewText);
  };

  const packReview = () => {
    let back = {
      ...props.review,
    };

    back.star = star;
    back.label = label;
    back.text = text;
    return back;
  };

  // triggers when the new parameter is changed
  useEffect(() => {
    extractReview();
  }, [props.review]);










  const reviewSubmit = (event) => {
    event.preventDefault();
    props.onCreate(packReview());
  };
  const backToHomepage = () => {
    //props.onClose();
    props.history.push('/');
  };






//1.rating star; 2.label; 3.review text
  return (
    <div>
      
      <h3 className={classes.subTitle}>Give an Overall Rating</h3>
      <div className={classes.star}>
        <Rating
          name="simple-controlled"
          value={star}
          //precision={1}
          onChange={(event, newStar) => {
            setStar(newStar);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {star !== null && <Box ml={2}>{stars[hover !== -1 ? hover : star]}</Box>}
      </div>

      <h3 className={classes.subTitle}>Add Labels(Optional)</h3>
      <div>  
        <FormGroup row>
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedA} onChange={handleChange} name="checkedA" />}
            label="Humorous"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedB} onChange={handleChange} name="checkedB" />}
            label="Carry in game"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedC} onChange={handleChange} name="checkedC" />}
            label="Interactive"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedD} onChange={handleChange} name="checkedD" />}
            label="Friendly"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedE} onChange={handleChange} name="checkedE" />}
            label="Patient"
          />
          <FormControlLabel
            control={<PurpleCheckbox icon={<SentimentDissatisfiedIcon />} checked={label.checkedF} onChange={handleChange} name="checkedF" />}
            label="Rude"
          />
        </FormGroup>

      </div>
    
      <h3 className={classes.subTitle}>Write a review(Optional)</h3>  
      <div>
          <form className={classes.textField} noValidate autoComplete="off">
            <div>            
              <TextField
                id="filled-multiline-static"          
                multiline
                rows={10}
                placeholder="Max. 500 words."
                onChange={handleTextChange}
                variant="filled"
              />
            </div>    
          </form>
      </div>


      <div>
        <Button className={classes.submit} 
        //disabled={
        // star === "" || label === ""         
        //}
          onClick={handleClickOpen} onclick={reviewSubmit} >
          Submit
        </Button>
        <CancelButton/>
      </div>  
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit successful!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thanks for your review! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} onClick={backToHomepage} color="primary">
            ok
          </Button>
          
        </DialogActions>
      </Dialog>
      
      </div>
  );
}
export default withRouter(/* withStyles(styles)( */SubmitReview);
