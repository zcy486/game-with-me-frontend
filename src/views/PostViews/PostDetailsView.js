import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostDetails from "../../components/PostDetailsView/PostDetails";
import ScrollContainer from "../../components/ScrollContainer";

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

function PostDetailsView() {
  const classes = useStyles();

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <PostDetails
            price={5}
            gameName={"League of Legends"}
            username={"Tom"}
            age={20}
            ratings={3.5}
            served={40}
            companionType={"Carry"}
            server="EU"
            platform="PC"
          />
        </div>
      </div>
    </ScrollContainer>
  );
}

export default PostDetailsView;
