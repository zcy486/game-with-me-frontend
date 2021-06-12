import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostDetails from "../../components/PostDetailsView/PostDetails";
import ScrollContainer from "../../components/ScrollContainer";
import Comments from "../../components/PostDetailsView/Comments";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";

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


function PostDetailsView(props) {
  const classes = useStyles();

  const clickOrder = () => {
    props.history.push(window.location.pathname + "/order");
  };

  //TODO add Loading with post (useSelector) together
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
            avatar={MockAvatar}
            clickOrder={clickOrder}
          />
          <Comments
            numComments={10}
            labels={[
              { num: 10, name: "Carry in game" },
              { num: 5, name: "Humorous" },
              { num: 3, name: "Fast Response" },
              { num: 1, name: "Cooperative" },
            ]}
          />
        </div>
      </div>
    </ScrollContainer>
  );
}

export default PostDetailsView;
