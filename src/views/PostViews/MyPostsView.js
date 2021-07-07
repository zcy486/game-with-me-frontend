import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import backgroundPic from "../../images/bg_postlist.png";
import UserService from "../../services/UserService";
import ScrollContainer from "../../components/ScrollContainer";
import { connect, useSelector } from "react-redux";
import { getPostsByCompanion } from "../../redux/actions";
import NoPosts from "../../components/CompanionPostView/NoPosts";
import GameBox from "../../components/CompanionPostView/GameBox";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${backgroundPic})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      //backgroundSize: "cover",
        //backgroundAttachment: "scroll",
    },
    pageArea: {
        paddingTop: theme.spacing(12),
        paddingLeft: theme.spacing(25),
        paddingRight: theme.spacing(25),
        paddingBottom: theme.spacing(10),
    },
    title: {
        display: "flex",
    },
    button: {
        maxHeight: "30px",
        margin: "25px",
    },
    noPosts: {
        marginBottom: "500px",
    },
    multiplePosts: {
        marginBottom: "200px",
    }
}));

function MyPostsView(props) {
  const classes = useStyles();
  let { match } = props;
  const [isCompanion, setIsCompanion] = React.useState(false);

  const postsByCompanion = useSelector((state) => state.posts.companion);
  const ownedPosts = postsByCompanion ? postsByCompanion.posts : [];

  const onClickPost = (gameId, postId) => {
    const postRoute = "/games/" + gameId + "/detail/" + postId;
    props.history.push(postRoute);
  };

  const clickCreate = () => {
    props.history.push("/createpost");
  };

  useEffect(() => {
    (async () => {
      let plusFields = await UserService.getCompanionProfile(
        match.params.userId
      );
      if (Object.keys(plusFields).length > 0) {
        setIsCompanion(true);
        props.dispatch(getPostsByCompanion(match.params.userId));
      } else {
        setIsCompanion(false);
      }
    })();
  }, [match.params]);

  return (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <div className={classes.title}>
            <h1>My posts</h1>
            <Button
              variant={"contained"}
              color={"secondary"}
              size={"small"}
              onClick={clickCreate}
              className={classes.button}
            >
              Create Post
            </Button>
          </div>
          <div>
            {isCompanion ? (
              <div className={classes.multiplePosts}>
                {ownedPosts.length === 0 ? (
                  <NoPosts myself={true} />
                ) : (
                  ownedPosts.map((post, i) => {
                    return (
                      <GameBox
                        key={i}
                        gameId={post.gameId}
                        gameName={post.gameName}
                        gamePic={post.gamePic}
                        price={post.price}
                        languages={post.language}
                        postId={post._id}
                        onClick={onClickPost}
                      />
                    );
                  })
                )}
              </div>
            ) : (
              <div className={classes.noPosts}>
                <h1>
                  You're not a companion yet. Create a post to become a
                  companion!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default connect()(MyPostsView);
