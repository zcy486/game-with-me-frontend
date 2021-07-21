import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {MenuItem, Select, InputLabel, FormControl} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { connect, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { getPostsWithFilters } from "../../redux/actions";
import GameService from "../../services/GameService";

import ScrollContainer from "../../components/ScrollContainer";
import GamesSelector from "../../components/PostListView/GamesSelector";
import PostBox from "../../components/PostListView/PostBox";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";
import noPostImage from "../../images/oops.png";

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
    width: 1000,
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
  },
  formControl: {
    width: 90,
    margin: theme.spacing(1),
  },
  placeHolder: {
    flexGrow: 1,
  },
  noPost: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  noPostImage: {
    marginTop: theme.spacing(5),
    maxWidth: "250px",
    maxHeight: "250px",
  },
  noPostTitle: {
    fontSize: "xx-large",
    fontFamily: "Helvetica",
    fontWeight: "bolder",
    color: "#8271DD",
    marginBottom: "0",
  },
}));

function PostListView(props) {
  const classes = useStyles();

  let { match } = props;

  const games = useSelector((state) => state.games.games);

  const [currentGame, setCurrentGame] = React.useState(null);

  const posts = useSelector((state) => state.posts.response);

  //all you need with filters is here!
  const allStatus = ["Online", "Offline", "Busy"];
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
  const allTypes = ["Carry", "Chill"];
  const allPrices = ["0-5", "6-10", "11-20", "20+"];
  const sortBy = ["orders", "ratings"];

  const [status, setStatus] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [server, setServer] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [sort, setSort] = React.useState("orders");
  const [page, setPage] = React.useState(1);

  const packFilters = () => {
    return {
      gameId: match.params.gameId,
      onlineStatus: status,
      language: language,
      postType: type,
      price: price,
      servers: server,
      platforms: platform,
      sortBy: sort,
      page: page,
    };
  };

  useEffect(() => {
    props.dispatch(getPostsWithFilters(packFilters()));
  }, [
    match.params,
    status,
    language,
    type,
    price,
    server,
    platform,
    sort,
    page,
  ]);

  //all you need with filters is on above!

  useEffect(() => {
    if (!games) {
      loadGames();
    }
  }, [games]);

  useEffect(() => {
    (async () => {
      let gameId = match.params.gameId;
      let current = await GameService.getGameInfoById(gameId);
      setCurrentGame(current);
    })();
  }, [match.params]);

  const loadGames = async () => {
    props.dispatch(getGames());
  };

  const onSelectGame = (gameId) => {
    props.history.push("/games/" + gameId);
  };

  const onClickPost = (postId) => {
    const postRoute = "/games/" + match.params.gameId + "/detail/" + postId;
    props.history.push(postRoute);
  };

  const onChangePage = (event, page) => {
    setPage(page);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  }

  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
    setPage(1);
  }

  const onChangeType = (e) => {
    setType(e.target.value);
    setPage(1);
  }

  const onChangePrice = (e) => {
    setPrice(e.target.value);
    setPage(1);
  }

  const onChangeServer = (e) => {
    setServer(e.target.value);
    setPage(1);
  }

  const onChangePlatform = (e) => {
    setPlatform(e.target.value);
    setPage(1);
  }

  const onChangeSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  }

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
          {currentGame && currentGame.numPosts}
          <h1 className={classes.gameTitle}>
            {currentGame && currentGame.name}
          </h1>
          <div className={classes.filtersRow}>
            <FormControl className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={onChangeStatus}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allStatus.map((status, i) => {
                  return (
                    <MenuItem key={i} value={status}>
                      {status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={onChangeLanguage}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allLanguages.map((language, i) => {
                  return (
                    <MenuItem key={i} value={language}>
                      {language}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={onChangeType}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allTypes.map((type, i) => {
                  return (
                    <MenuItem key={i} value={type}>
                      {type}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Price</InputLabel>
              <Select value={price} onChange={onChangePrice}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allPrices.map((price, i) => {
                  return (
                    <MenuItem key={i} value={price}>
                      {price}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Server</InputLabel>
              <Select
                value={server}
                onChange={onChangeServer}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {currentGame &&
                  currentGame.allServers.map((server, i) => {
                    return (
                      <MenuItem key={i} value={server}>
                        {server}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Platform</InputLabel>
              <Select
                value={platform}
                onChange={onChangePlatform}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {currentGame &&
                  currentGame.allPlatforms.map((platform, i) => {
                    return (
                      <MenuItem key={i} value={platform}>
                        {platform}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <div className={classes.placeHolder} />

            <FormControl className={classes.formControl}>
              <InputLabel>Sort by</InputLabel>
              <Select value={sort} onChange={onChangeSort}>
                {sortBy.map((sortType, i) => {
                  return (
                    <MenuItem key={i} value={sortType}>
                      {sortType}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          {posts &&
            posts.posts.map((post, i) => {
              return (
                <PostBox
                  key={i}
                  username={post.companionName}
                  price={post.price}
                  ratings={post.ratings}
                  reviewNumber={post.reviewNumber}
                  languages={post.language}
                  avatar={post.avatarUrl ? post.avatarUrl : MockAvatar}
                  onClick={onClickPost}
                  post={post}
                />
              );
            })}
          {posts && posts.count !== 0 ? (
            <Pagination
              count={Math.ceil(posts ? posts.count / 10 : 0)}
              shape="rounded"
              color="secondary"
              onChange={onChangePage}
            />
          ) : (
            <div className={classes.noPost}>
              <img
                src={noPostImage}
                className={classes.noPostImage}
                alt={noPostImage}
              />
              <p className={classes.noPostTitle}>No posts here yet</p>
            </div>
          )}
        </div>
      </ScrollContainer>
    </div>
  );
}

export default connect()(PostListView);
