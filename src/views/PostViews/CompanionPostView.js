import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import ScrollContainer from "../../components/ScrollContainer";
import CompanionInfo from "../../components/CompanionPostView/CompanionInfo";
import GameBox from "../../components/CompanionPostView/GameBox";
import NoPosts from "../../components/CompanionPostView/NoPosts";
import backgroundPic from "../../images/bg_postlist.png";
import { getPostsByCompanion } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backgroundPic})`,
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
  },
  pageArea: {
    width: 1000,
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(30),
    marginRight: theme.spacing(30),
    marginBottom: theme.spacing(10),
  },
}));

function CompanionPostView(props) {
  const classes = useStyles();

  let { match } = props;

  const me = useSelector((state) => state.user.user);
  const postsByCompanion = useSelector((state) => state.posts.companion);
  const ownedPosts = postsByCompanion ? postsByCompanion.posts : [];

  useEffect(() => {
    props.dispatch(getPostsByCompanion(match.params.companionId));
  }, [match.params]);

  const onClickPost = (gameId, postId) => {
    const postRoute = "/games/" + gameId + "/detail/" + postId;
    props.history.push(postRoute);
  };

  const onClickChat = (event) => {
    event.preventDefault();
    if (!me) {
      props.history.push("/login");
    } else {
      const targetID = match.params.companionId;
      const targetName = postsByCompanion && postsByCompanion.username;
      if (me._id === targetID) {
        window.alert("You cannot chat to yourself!");
      } else {
        props.history.push("/chat/" + targetID + "/" + targetName);
      }
    }
  };

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <h1>Companion Information</h1>
          <CompanionInfo
            username={postsByCompanion && postsByCompanion.username}
            age={postsByCompanion && postsByCompanion.age}
            gender={postsByCompanion && postsByCompanion.gender}
            ratings={postsByCompanion && postsByCompanion.ratings}
            reviewNumber={postsByCompanion && postsByCompanion.reviewNumber}
            orderNumber={postsByCompanion && postsByCompanion.orderNumber}
            avatarUrl={postsByCompanion && postsByCompanion.avatarUrl}
            clickChat={onClickChat}
          />
          <h1>Published Games</h1>
          {ownedPosts.length === 0 ? (
            <NoPosts myself={false} />
          ) : (
            ownedPosts.map((post, i) => {
              return (
                <GameBox
                  key={i}
                  gameId={post.gameId}
                  gameName={post.game[0].name}
                  gamePic={post.game[0].gamePic}
                  price={post.price}
                  languages={post.language}
                  postId={post._id}
                  onClick={onClickPost}
                />
              );
            })
          )}
        </div>
      </div>
    </ScrollContainer>
  );
}

export default connect()(CompanionPostView);
