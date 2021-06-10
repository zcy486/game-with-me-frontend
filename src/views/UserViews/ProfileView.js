import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import ScrollContainer from "../../components/ScrollContainer";
import ProfilePage from "../../components/UserRelevant/ProfilePage";
import { updateProfile } from "../../redux/actions";
import Loading from "../../components/Loading";
import backgroundPic from "../../images/bg_postlist.png";

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

  useEffect(() => {
    if (!user.user) {
      props.history.push("/login");
    }
  }, [user, props.history]);

  const onSave = (user) => {
    props.dispatch(updateProfile(user));
  };

  const clickCreate = () => {
    props.history.push("/createpost");
  }

  return user.user ? (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <ProfilePage user={user.user} onSave={onSave} clickCreate={clickCreate} />
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
