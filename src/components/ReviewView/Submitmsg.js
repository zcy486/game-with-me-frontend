import React, { useEffect, useState } from 'react';
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
import { connect } from 'react-redux';


const stars = {
    
    1: 'Terrible',
    
    2: 'Not bad',
    
    3: 'Satisfied',
    
    4: 'Good',
    
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
      background: 'linear-gradient(45deg, #7908be 30%, #7908be 90%)', 
      border: 0,
      borderRadius: 5,   
      color: 'white',
      height: 40,
      padding: '0 30px',
      marginLeft: "630px",
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

function SubmitReview({review, handleSubmit,handleUpdate, history , order}) {
  //deconstruct review based on Review Model
  const classes = useStyles();


  const [_id, setId] = useState(""); //review _id
  const [star, setStar] = useState(0); //review star
  const [label, setLabel] = useState([]); //review label
  const [reviewText, setReviewText] = useState(""); //review reviewText
  useEffect(() => {
    if(review.review && Object.keys(review.review).length !== 0){
      setId(review.review._id)
      setStar(review.review.star)
      setLabel(review.review.label)
      setReviewText(review.review.reviewText)
    }
  },[review]);

  const [open, setOpen] = React.useState(false); //for dialog
  const [hover, setHover] = React.useState(-1); //star

  const LABEL_ENUMS = ["Humorous", "Carry in game", "Interactive", "Friendly", "Patient", "Rude"];

  //declare callback functions for frontend logics
  const handleLabling = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const labelObject = label.reduce((acc, curr) => {
      if(acc[curr] === undefined){
        acc[curr] = true;
        return acc;
      }
    },{})
    labelObject[event.target.name] = event.target.checked;
    const newLabels = Object.keys(labelObject).reduce((acc, key) => {
      if(labelObject[key]){
        acc.push(key)
      }
      return acc;
    }, [])
    setLabel(newLabels); //for label
  };
  const handleTextChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const backToList = () => {
    history.push("/myOrders/gamerId/"+ order.order.gamerId);
  };

//1.rating star; 2.label; 3.review text
  return (
    <div>
      <h3 className={classes.subTitle}>Give an Overall Rating</h3>
      <div className={classes.star}>
        <Rating
          name="simple-controlled"
          value={star}
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
          {LABEL_ENUMS.map((labelText) => {
            const ifChecked = label.includes(labelText)
            return <FormControlLabel
              control={(labelText === "Rude")? <PurpleCheckbox icon={<SentimentDissatisfiedIcon />} checked={ifChecked} onChange={handleLabling} name={labelText} />:
              <BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={ifChecked} onChange={handleLabling} name={labelText} />}
              label={labelText}
            />
          })}

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
                value={reviewText}
                placeholder="Max. 200 words."
                onChange={handleTextChange}
                variant="filled"
              />
            </div>    
          </form>
      </div>


      <div >
        <Button  className={classes.submit}
          onClick={() => {
            if(_id === ""){
              handleSubmit(star, label, reviewText,  order.order.companionId, order.order.gamerId, order.order._id);
            }else{
              //update Review
              handleUpdate(_id, {reviewText, label, star});
            }
            handleClickOpen();
          }}>
          Submit
        </Button>&nbsp;&nbsp; &nbsp;&nbsp;
        <CancelButton />
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
          <Button onClick={
            () => {
              handleClose()
              backToList()
            }} color="primary">
            ok
          </Button>
          
        </DialogActions>
      </Dialog>
      
      </div>
  );
}

export default connect()(withRouter(SubmitReview));
