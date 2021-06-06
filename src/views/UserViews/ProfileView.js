import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import ScrollContainer from "../../components/ScrollContainer";
import ProfilePage from "../../components/UserRelevant/ProfilePage";
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

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          {user.user ? (
            <ProfilePage
              username={user.user.username}
              age={user.user.age}
              gender={user.user.gender}
            />
          ) : (
            <ProfilePage />
          )}
        </div>
      </div>
    </ScrollContainer>
  );
}

export default ProfileView;
