import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ScrollContainer from "../../components/ScrollContainer";
import CreatePostPage from "../../components/CreatePostPage";
import backgroundPic from "../../images/bg_postlist.png";
import { connect, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backgroundPic})`,
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  pageArea: {
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    paddingBottom: theme.spacing(10),
  },
}));

function CreatePostView(props) {
  const classes = useStyles();

  const onCancel = () => {
    props.history.push("/profile");
  };

  const user = useSelector((state) => state.user);



  return (
    <ScrollContainer>
      <div className={classes.root}>
      
        <div className={classes.pageArea}>
        <h1>Create Your Post</h1>
          <CreatePostPage user = {user.user} onCancel={onCancel}/>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default CreatePostView;
