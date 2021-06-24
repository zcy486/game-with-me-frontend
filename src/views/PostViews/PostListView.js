import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import GameService from "../../services/GameService";

import ScrollContainer from "../../components/ScrollContainer";
import GamesSelector from "../../components/PostListView/GamesSelector";
import PostBox from "../../components/PostListView/PostBox";
import backgroundPic from "../../images/bg_postlist.png";
import MockAvatar from "../../images/avatar.svg";

import {getPostsWithFilters} from "../../redux/actions";

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
}));

function PostListView(props) {
  const classes = useStyles();

  let { match } = props;

  const games = useSelector((state) => state.games.games);

  const [currentGame, setCurrentGame] = React.useState(null);

  const posts = useSelector((state) => state.posts.response);

  //all you need with filters is here!
  const allStatus = ["Online", "Offline", "Busy", "All-status"];
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
  const [sort, setSort] = React.useState("orders")

  const packFilters = () => {
    return {
      gameId: match.params.gameId,
      language: language,
      postType: type,
      price: price,
      servers: server,
      platforms: platform,
      sortBy: sort,
    };
  }

  useEffect(() => {
    props.dispatch(getPostsWithFilters(packFilters()));
  }, [match.params, status, language, type, price, server, platform, sort]);

  //all you need with filters is on above!

  useEffect(() => {
    if (!games) {
      loadGames();
    }
  }, [games]);

  useEffect(async () => {
    let gameId = match.params.gameId;
    let current = await GameService.getGameInfoById(gameId);
    setCurrentGame(current);
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
            {currentGame && currentGame.name}
          </h1>
          <div className={classes.filtersRow}>

            <FormControl className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allStatus.map((status) => {
                  return <MenuItem value={status}>{status}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Language</InputLabel>
              <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allLanguages.map((language) => {
                  return <MenuItem value={language}>{language}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allTypes.map((type) => {
                  return <MenuItem value={type}>{type}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Price</InputLabel>
              <Select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allPrices.map((price) => {
                  return <MenuItem value={price}>{price}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Server</InputLabel>
              <Select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {currentGame && currentGame.allServers.map((server) => {
                  return <MenuItem value={server}>{server}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Platform</InputLabel>
              <Select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {currentGame && currentGame.allPlatforms.map((platform) => {
                  return <MenuItem value={platform}>{platform}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <div className={classes.placeHolder} />

            <FormControl className={classes.formControl}>
              <InputLabel>Sort by</InputLabel>
              <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
              >
                {sortBy.map((sortType) => {
                  return <MenuItem value={sortType}>{sortType}</MenuItem>;
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

export default connect()(PostListView);
