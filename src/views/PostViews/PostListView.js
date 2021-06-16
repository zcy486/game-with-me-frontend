import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { getPostsByGame } from "../../redux/actions";

import { makeStyles } from "@material-ui/core/styles";
import GamesSelector from "../../components/PostListView/GamesSelector";
import FilterBox from "../../components/PostListView/FilterBox";
import PostBox from "../../components/PostListView/PostBox";
import ScrollContainer from "../../components/ScrollContainer";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: `url(${backgroundPic})`,
    backgroundRepeat: "repeat",
  },
  gameSelector: {
    paddingRight: theme.spacing(4),
  },
  content: {
    textAlign: "right",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  gameTitle: {
    fontSize: "40px",
    fontFamily: "Helvetica",
  },
  filtersRow: {
    display: "flex",
    flexDirection: "row",
  },
  placeHolder: {
    flexGrow: 1,
  },
}));

function PostListView(props) {
  const classes = useStyles();

  const allStatus = ["None", "Online", "Offline", "Busy", "All-status"];
  const allLanguages = [
    "Deutsch",
    "English",
    "Español",
    "Français",
    "한국어",
    "Italiano",
    "日本語",
    "Português",
    "Svenska",
    "Türkçe",
    "Tiếng Việt",
    "中文",
  ];
  const allTypes = ["None", "Carry", "Chill", "All types"];
  const allPrices = ["None", "0-5", "6-10", "11-20", "20+"];
  const sortBy = ["order", "ratings"];

  let { match } = props;

  const games = useSelector((state) => state.games.games);

  const postsByGame = useSelector((state) => state.posts.response);

  useEffect(() => {
    if (!games) {
      loadGames();
    }
  }, [games]);

  useEffect(() => {
    let gameId = match.params.gameId;
    props.getPostsByGame(gameId);
  }, [match.params.gameId]);

  const loadGames = async () => {
    props.getGames();
  };

  const onSelectGame = (gameId) => {
    props.history.push("/games/" + gameId);
  };

  const onClickPost = (postId) => {
    const postRoute = "/games/" + match.params.gameId + "/detail/" + postId;
    props.history.push(postRoute);
  };

  //TODO add Loading with posts (useSelector) together
  return (
    <div className={classes.root}>
      <div className={classes.gameSelector}>
        <GamesSelector
          games={games}
          onSelectGame={onSelectGame}
          selectedId={match.params.gameId}
        />
      </div>
      <ScrollContainer>
        <div className={classes.content}>
          <h1 className={classes.gameTitle}>
            {postsByGame && postsByGame.name}
          </h1>
          <div className={classes.filtersRow}>
            <FilterBox choices={allStatus} helperText="Status" />
            <FilterBox choices={allLanguages} helperText="Language" />
            <FilterBox choices={allTypes} helperText="Type" />
            <FilterBox choices={allPrices} helperText="Price" />
            <FilterBox
              choices={
                postsByGame && Array.isArray(postsByGame.servers)
                  ? postsByGame.servers
                  : []
              }
              helperText="Server"
            />
            <FilterBox
              choices={
                postsByGame && Array.isArray(postsByGame.platforms)
                  ? postsByGame.platforms
                  : []
              }
              helperText="Platform"
            />
            <div className={classes.placeHolder} />
            <FilterBox choices={sortBy} helperText="Sort by:" />
          </div>
          {postsByGame &&
            postsByGame.posts.map((post) => {
              return (
                <PostBox
                  username="Tom" //TODO
                  price={post.price}
                  rating={2.85} //TODO
                  languages={post.language}
                  avatar={MockAvatar}
                  onClick={onClickPost}
                  post={post}
                />
              );
            })}
        </div>
      </ScrollContainer>
    </div>
  );
}

export default connect(null, { getGames, getPostsByGame })(PostListView);
