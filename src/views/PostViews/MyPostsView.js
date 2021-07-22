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
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

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
  },
    fab: {
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(5),
    }
}));

function MyPostsView(props) {
  const classes = useStyles();
  let { match } = props;
  const [isCompanion, setIsCompanion] = React.useState(false);

  const user = useSelector((state) => state.user.user)

  const postsByCompanion = useSelector((state) => state.posts.companion);
  const ownedPosts = postsByCompanion ? postsByCompanion.posts : [];

  const onClickPost = (gameId, postId) => {
    const postRoute = "/games/" + gameId + "/detail/" + postId;
    props.history.push(postRoute);
  };

  const clickCreate = () => {
    props.history.push("/createpost");
  };

  const onClickEdit = (post) => {
      let route = "/editpost/" + post._id;
      props.history.push(route);
  };

  useEffect(() => {
    (async () => {
      let plusFields = await UserService.getCompanionProfile(
        match.params.companionId
      );
      if (Object.keys(plusFields).length > 0) {
        setIsCompanion(true);
        props.dispatch(getPostsByCompanion(match.params.companionId));
      } else {
        setIsCompanion(false);
      }
    })();
  }, [match.params]);


  useEffect(() => {
    if (!user) {
        props.history.push("/login");
    }
    if(match.params.userId != user._id) {
        props.history.push("/notfound")
    }

}, [user, props.history]);



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
                      <div key={i} style={{display: "flex"}}>
                        <GameBox
                          gameId={post.gameId}
                          gameName={post.gameName}
                          gamePic={post.gamePic}
                          price={post.price}
                          languages={post.language}
                          postId={post._id}
                          onClick={onClickPost}
                        />
                          <Fab color="secondary" aria-label="edit" className={classes.fab} onClick={() => onClickEdit(post)}>
                              <EditIcon />
                          </Fab>
                      </div>
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
