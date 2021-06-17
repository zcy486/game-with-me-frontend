import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";

import ScrollContainer from "../../components/ScrollContainer";
import CreatePostPage from "../../components/CreatePostPage";
import backgroundPic from "../../images/bg_postlist.png";
import Loading from "../../components/Loading";
import {createPost} from "../../redux/actions/postActions";

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

  const games = useSelector((state) => state.games.games);

  const user = useSelector((state) => state.user);

  const onCancel = () => {
    props.history.push("/profile");
  };

  const onCreate = (post) => {
    props.dispatch(createPost(post));
    props.history.push("/profile");
  };

  const loadGames = async () => {
    props.dispatch(getGames());
  };

  useEffect(() => {
    if (!games) {
      loadGames();
    }
  }, [games]);


  return (user && games) ? (
    <ScrollContainer>
      <div className={classes.root}>
        <div className={classes.pageArea}>
          <h1>Create Your Post</h1>
          <CreatePostPage user={user.user} onCancel={onCancel} onCreate={onCreate} games={games.all} />
        </div>
      </div>
    </ScrollContainer>
  ) : (
    <Loading />
  );
}

export default connect()(CreatePostView);
