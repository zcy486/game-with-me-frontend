import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";
import PostDetails from "../../components/PostDetailsView/PostDetails";
import ScrollContainer from "../../components/ScrollContainer";
import Comments from "../../components/PostDetailsView/Comments";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";
import {getPost} from "../../redux/actions";

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

  let { match } = props;

  const post = useSelector((state) => state.posts.post)

  useEffect(() => {
    props.dispatch(getPost(match.params.postId));
  }, [match.params]);

  const clickOrder = () => {
    props.history.push(window.location.pathname + "/order");
  };

  //TODO add Loading with post (useSelector) together
  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <PostDetails
            price={post && post.price}
            gameName={post && post.gameName}
            username={post && post.companionName}
            age={post && post.companionAge}
            introduction={post && post.introduction}
            ratings={0} //TODO
            served={0} //TODO
            companionType={post && post.postType}
            server={post && post.servers}
            platform={post && post.platforms}
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

export default connect()(PostDetailsView);
