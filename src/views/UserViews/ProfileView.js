import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import ScrollContainer from "../../components/ScrollContainer";
import ProfilePage from "../../components/UserRelevant/ProfilePage";
import { updateProfile, uploadImage, deleteImage, updateBalance } from "../../redux/actions";
import Loading from "../../components/Loading";
import backgroundPic from "../../images/bg_postlist.png";
import RechargePage from "../../components/CreateOrderView/RechargePage";
import UserService from "../../services/UserService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backgroundPic})`,
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
  },
  pageArea: {
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    paddingBottom: theme.spacing(10),
  },
}));

function ProfileView(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const [companion, setCompanion] = React.useState(null);

  useEffect(() => {
    if (!user.user) {
      props.history.push("/login");
    }
  }, [user, props.history]);

  useEffect(async () => {
    if (user.user) {
      let plusFields = await UserService.getCompanionProfile(user.user._id);
      if (Object.keys(plusFields).length > 0) {
        setCompanion(plusFields);
      }
    }
  }, [props.history]);

  const onSave = (user) => {
    props.dispatch(updateProfile(user));
  };

  const onUploadImg = (file) => {
      props.dispatch(uploadImage(user.user, file));
  }

  const onDeleteImg = () => {
    props.dispatch(deleteImage(user.user));
}


  const clickCreate = () => {
    props.history.push("/createpost");
  };



// MEthods for Recharge Pop-Up
  const onRecharge = () => {
    handleClickOpen();
}
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


const handleRecharge = (amount) => {
    props.dispatch(updateBalance(user._id, amount));
};


  return user.user ? (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>

          <ProfilePage
            user={user.user}
            companion={companion}
            onSave={onSave}
            onUploadImg={onUploadImg}
            onDeleteImg={onDeleteImg}
            clickCreate={clickCreate}
            onRecharge={onRecharge}

          />

{open ? (<RechargePage
                        open={open}
                        handleClose={handleClose}
                        currentBalance={user.user.balance}
                        user={user.user}
                        handleRecharge= {handleRecharge}
                    ></RechargePage>) : null}


        </div>
      </div>
    </ScrollContainer>
  ) : (
    <ScrollContainer>
      <Loading />
    </ScrollContainer>
  );
}

export default connect()(ProfileView);
