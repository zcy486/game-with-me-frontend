import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";

import ScrollContainer from "../../components/ScrollContainer";
import CreatePostPage from "../../components/PostOperations/CreatePostPage";
import backgroundPic from "../../images/bg_postlist.png";
import Loading from "../../components/Loading";
import { createPost } from "../../redux/actions";

import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

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
  alert: {
    fontFamily: "Helvetica",
    fontWeight: "bolder",
  },
}));

function CreatePostView(props) {
  const classes = useStyles();

  const games = useSelector((state) => state.games.games);

  const user = useSelector((state) => state.user);

  const existError = useSelector((state) => state.posts.error);

  const didSucceed = useSelector((state) => state.posts.success);

  const [openAlert, setOpenAlert] = React.useState(false);

  const onCancel = () => {
    props.history.push("/profile");
  };

  const onCreate = (post, files) => {
    props.dispatch(createPost(post, files));
  };

  const loadGames = async () => {
    props.dispatch(getGames());
  };

  useEffect(() => {
    if (existError) {
      //handle error
      setOpenAlert(true);
    }
  }, [existError]);

  useEffect(() => {
    if (didSucceed) {
      let route = "/posts/" + user.user._id;
      props.history.push(route);
    }
  }, [didSucceed]);

  useEffect(() => {
    if (!games) {
      loadGames();
    }
  }, [games]);

  return user && games ? (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <h1>Create Your Post</h1>
          <CreatePostPage
            user={user.user}
            onCancel={onCancel}
            onCreate={onCreate}
            games={games.all}
          />
          <Collapse in={openAlert}>
            <Alert className={classes.alert} severity="error">
              You already have a post of this game!
            </Alert>
          </Collapse>
        </div>
      </div>
    </ScrollContainer>
  ) : (
    <Loading />
  );
}

export default connect()(CreatePostView);
