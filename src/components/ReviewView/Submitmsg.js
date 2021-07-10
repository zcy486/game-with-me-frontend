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
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
  //debugger;
  //deconstruct review based on Review Model
  const classes = useStyles();
  //construct basic review data based on Review Model
/*   const [_id, setId] = useState(review._id || ""); //review _id
  const [star, setStar] = useState(review.star || 0); //review star
  const [label, setLabel] = useState(review.label || []); //review label
  const [reviewText, setReviewText] = useState(review.reviewText || ""); //review reviewText */

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
  
  //TODO: uncomment if needed
  // const [orderId, setOrderId] = useState(orderId); //
  // const [companionId, setCompanionId] = useState(companionId); //
  // const [gamerId, setGamerId] = useState(gamerId); //
  //construct frontend logic controller states
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

//extract on gamer or companion or reviewId???
/*   const extractReview = () => {
    if (!props.review) {
      return;
    }

    setStar(props.review.star);
    setLabel(props.review.label);
    setText(props.review.reviewText);
  }; */
/* 
  const packReview = () => {
    let back = {
      ...props.review,
    };

    back.star = star;
    back.label = label;
    back.text = text;
    return back;
  }; */

  // triggers when the new parameter is changed
/*   useEffect(() => {
    extractReview();
  }, [props.review]); */


/*   const reviewSubmit = (event) => {
    event.preventDefault();
    props.onCreate(packReview());
  }; */
  const backToHomepage = () => {
    //props.onClose();
    history.push('/');
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
          {LABEL_ENUMS.map((labelText) => {
            const ifChecked = label.includes(labelText)
            return <FormControlLabel
              control={(labelText === "Rude")? <PurpleCheckbox icon={<SentimentDissatisfiedIcon />} checked={ifChecked} onChange={handleLabling} name={labelText} />:
              <BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={ifChecked} onChange={handleLabling} name={labelText} />}
              label={labelText}
            />
          })}
          {/* <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedA} onChange={handleLabling} name="checkedA" />}
            label="Humorous"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedB} onChange={handleLabling} name="checkedB" />}
            label="Carry in game"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedC} onChange={handleLabling} name="checkedC" />}
            label="Interactive"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedD} onChange={handleLabling} name="checkedD" />}
            label="Friendly"
          />
          <FormControlLabel
            control={<BlueCheckbox icon={<SentimentSatisfiedAltIcon />} checked={label.checkedE} onChange={handleLabling} name="checkedE" />}
            label="Patient"
          />
          <FormControlLabel
            control={<PurpleCheckbox icon={<SentimentDissatisfiedIcon />} checked={label.checkedF} onChange={handleLabling} name="checkedF" />}
            label="Rude"
          /> */}
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
        //disabled={
        // star === "" || label === ""         
        //}
          onClick={() => {
            if(_id === ""){
              debugger;
              //create new Review, o
              //const {orderId, companionId, gamerId} = order;
              handleSubmit(star, label, reviewText,  order.order.companionId, order.order.gamerId, order.order._id);
            }else{
              //update Review
              handleUpdate(_id, {reviewText, label, star});
            }
            handleClickOpen();
          }}>
          Submit
        </Button>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
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
              backToHomepage()
            }} color="primary">
            ok
          </Button>
          
        </DialogActions>
      </Dialog>
      
      </div>
  );
}
//TODO: uncomment if withStyles is needed
export default connect()(withRouter(/* withStyles(styles)( */SubmitReview));
